import gameService from '../../src/services/games-service';
import { generateGame } from '../factories/game-factory';
import { cleanDb } from '../helpers';
import { init } from 'app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe('Games Service', () => {
  it('should create a new game', async () => {
    const gameData = generateGame();

    const game = await gameService.createGame(gameData);

    expect(game.homeTeamName).toBe(gameData.homeTeamName);
    expect(game.awayTeamName).toBe(gameData.awayTeamName);
    expect(game.homeTeamScore).toBe(0);
    expect(game.awayTeamScore).toBe(0);
    expect(game.isFinished).toBe(false);
  });

  it('should fetch all games', async () => {
    const gameData1 = generateGame();
    const gameData2 = generateGame();

    await gameService.createGame(gameData1);
    await gameService.createGame(gameData2);

    const games = await gameService.getAllGames();

    expect(games.length).toBe(2);
  });

  it('should fetch a specific game by ID', async () => {
    const gameData = generateGame();
    const createdGame = await gameService.createGame(gameData);

    const game = await gameService.getGameById(createdGame.id);

    expect(game.homeTeamName).toBe(gameData.homeTeamName);
    expect(game.awayTeamName).toBe(gameData.awayTeamName);
  });
});
