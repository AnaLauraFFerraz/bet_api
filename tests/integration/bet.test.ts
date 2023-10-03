import request from 'supertest';
import app from '../../src/app';
import { cleanDb } from '../helpers';
import { generateGame } from '../factories/game-factory';
import { generateParticipant } from '../factories/participants-factory';
import { generateBet } from '../factories/bet-factory';

beforeEach(async () => {
  await cleanDb();
});

describe('Bets Routes', () => {
  it('should create a new bet', async () => {
    const gameData = generateGame();
    const createdGame = await request(app).post('/games').send(gameData);

    const participantData = generateParticipant();
    const createdParticipant = await request(app)
      .post('/participants')
      .send(participantData);

    const betData = generateBet(
      createdGame.body.id,
      createdParticipant.body.id,
    );

    const response = await request(app).post('/bets').send(betData);

    expect(response.status).toBe(201);
    expect(response.body.homeTeamScore).toBe(betData.homeTeamScore);
    expect(response.body.awayTeamScore).toBe(betData.awayTeamScore);
    expect(response.body.amountBet).toBe(betData.amountBet);
    expect(response.body.gameId).toBe(betData.gameId);
    expect(response.body.participantId).toBe(betData.participantId);
  });
});
