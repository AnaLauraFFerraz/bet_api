import { Request, Response } from 'express';
import httpStatus from 'http-status';
import gamesService from '../services/games-service';

export async function createGame(req: Request, res: Response) {
  try {
    const { homeTeamName, awayTeamName } = req.body;
    const game = await gamesService.createGame({ homeTeamName, awayTeamName });
    return res.status(httpStatus.CREATED).send(game);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getAllGames(req: Request, res: Response) {
  try {
    const games = await gamesService.getAllGames();
    return res.status(httpStatus.OK).json(games);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getGameById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const game = await gamesService.getGameById(Number(id));
    if (!game)
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'Game not found' });
    return res.status(httpStatus.OK).json(game);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function finishGame(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { homeTeamScore, awayTeamScore } = req.body;
    const game = await gamesService.finishGame(
      Number(id),
      homeTeamScore,
      awayTeamScore,
    );
    return res.status(httpStatus.OK).json(game);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
