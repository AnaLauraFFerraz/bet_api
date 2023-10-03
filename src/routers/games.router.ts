import { Router } from 'express';
import {
  createGame,
  finishGame,
  getAllGames,
  getGameById,
} from '../controllers/games.controller';

const gamesRouter = Router();

gamesRouter.post('/', createGame);
gamesRouter.get('/', getAllGames);
gamesRouter.get('/:id', getGameById);
gamesRouter.post('/:id/finish', finishGame);

export { gamesRouter };
