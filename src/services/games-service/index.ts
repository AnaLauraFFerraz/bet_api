import httpStatus from 'http-status';
import { CreateGameInput } from '../../protocols';
import gamesRepository from '../../repositories/games-repository';
import { Game, Bet } from '@prisma/client';
import { prisma } from '../../config';

async function createGame(data: CreateGameInput): Promise<Game> {
  return await gamesRepository.createGame(data);
}

async function getAllGames(): Promise<Game[]> {
  return await gamesRepository.findAllGames();
}

async function getGameById(id: number): Promise<Game & { bets: Bet[] }> {
  const game = await gamesRepository.findGameById(id);
  if (!game) throw httpStatus.NOT_FOUND;
  return game;
}

async function finishGame(
  id: number,
  homeTeamScore: number,
  awayTeamScore: number,
): Promise<Game> {
  const game = await gamesRepository.findGameById(id);
  if (!game) throw new Error('Game not found');
  if (game.isFinished) throw new Error('Game already finished');

  const updatedGame = await gamesRepository.finishGame(
    id,
    homeTeamScore,
    awayTeamScore,
  );

  const betsForThisGame = await prisma.bet.findMany({
    where: { gameId: id },
  });

  const winningBets = betsForThisGame.filter(
    (bet) =>
      bet.homeTeamScore === homeTeamScore &&
      bet.awayTeamScore === awayTeamScore,
  );

  const totalBetAmountForThisGame = betsForThisGame.reduce(
    (sum, bet) => sum + bet.amountBet,
    0,
  );
  const totalWinningBetsAmount = winningBets.reduce(
    (sum, bet) => sum + bet.amountBet,
    0,
  );

  for (const bet of betsForThisGame) {
    if (winningBets.includes(bet)) {
      const amountWon = Math.floor(
        (bet.amountBet / totalWinningBetsAmount) *
          totalBetAmountForThisGame *
          0.7,
      );
      await prisma.bet.update({
        where: { id: bet.id },
        data: {
          status: 'WON',
          amountWon,
        },
      });
      await prisma.participant.update({
        where: { id: bet.participantId },
        data: {
          balance: {
            increment: amountWon,
          },
        },
      });
    } else {
      await prisma.bet.update({
        where: { id: bet.id },
        data: {
          status: 'LOST',
          amountWon: 0,
        },
      });
    }
  }

  return updatedGame;
}

const gamesService = {
  createGame,
  getAllGames,
  getGameById,
  finishGame,
};

export default gamesService;
