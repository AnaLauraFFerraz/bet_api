import betService from '../../src/services/bets-service';
import { generateGame } from '../factories/game-factory';
import { generateParticipant } from '../factories/participants-factory';
import { generateBet } from '../factories/bet-factory';
import gameService from '../../src/services/games-service';
import participantsService from '../../src/services/paticipants-service';
import { cleanDb } from '../helpers';
import { init } from 'app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe('Bets Service', () => {
  it('should create a new bet', async () => {
    const gameData = generateGame();
    const createdGame = await gameService.createGame(gameData);

    const participantData = generateParticipant();
    const createdParticipant = await participantsService.createParticipant(
      participantData.name,
      participantData.balance,
    );

    const betData = generateBet(createdGame.id, createdParticipant.id);

    const bet = await betService.createBet(betData);

    expect(bet.homeTeamScore).toBe(betData.homeTeamScore);
    expect(bet.awayTeamScore).toBe(betData.awayTeamScore);
    expect(bet.amountBet).toBe(betData.amountBet);
    expect(bet.gameId).toBe(betData.gameId);
    expect(bet.participantId).toBe(betData.participantId);
  });
});
