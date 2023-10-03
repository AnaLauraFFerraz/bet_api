import request from 'supertest';
import app, { init } from '../../src/app';
import { cleanDb } from '../helpers';
import { generateGame } from '../factories/game-factory';

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe('Games Routes', () => {
  it('should create a new game', async () => {
    const gameData = generateGame();

    const response = await request(app).post('/games').send(gameData);

    expect(response.status).toBe(201);
    expect(response.body.homeTeamName).toBe(gameData.homeTeamName);
    expect(response.body.awayTeamName).toBe(gameData.awayTeamName);
    expect(response.body.homeTeamScore).toBe(0);
    expect(response.body.awayTeamScore).toBe(0);
    expect(response.body.isFinished).toBe(false);
  });

  it('should fetch all games', async () => {
    const responseBefore = await request(app).get('/games');
    const initialGamesCount = responseBefore.body.length;

    await request(app).post('/games').send(generateGame());
    await request(app).post('/games').send(generateGame());

    const responseAfter = await request(app).get('/games');

    expect(responseAfter.status).toBe(200);
    expect(responseAfter.body.length).toBe(initialGamesCount + 2);
  });

  it('should fetch a specific game by ID', async () => {
    const gameData = generateGame();
    const createdResponse = await request(app).post('/games').send(gameData);
    const gameId = createdResponse.body.id;

    const response = await request(app).get(`/games/${gameId}`);

    expect(response.status).toBe(200);
    expect(response.body.homeTeamName).toBe(gameData.homeTeamName);
    expect(response.body.awayTeamName).toBe(gameData.awayTeamName);
  });
});
