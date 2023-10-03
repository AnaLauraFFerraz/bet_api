import { prisma } from '../../config';

async function createGame(data: {
  homeTeamName: string;
  awayTeamName: string;
}) {
  return prisma.game.create({
    data: {
      homeTeamName: data.homeTeamName,
      awayTeamName: data.awayTeamName,
      homeTeamScore: 0,
      awayTeamScore: 0,
      isFinished: false,
    },
  });
}

async function findAllGames() {
  return prisma.game.findMany();
}

async function findGameById(id: number) {
  return prisma.game.findUnique({
    where: { id },
    include: { bets: true },
  });
}

async function finishGame(
  id: number,
  homeTeamScore: number,
  awayTeamScore: number,
) {
  return prisma.game.update({
    where: { id },
    data: {
      homeTeamScore,
      awayTeamScore,
      isFinished: true,
    },
  });
}

const gamesRepository = {
  createGame,
  findAllGames,
  findGameById,
  finishGame,
};

export default gamesRepository;
