import { Request, Response } from 'express';
import httpStatus from 'http-status';
import betsService from '../services/bets-service';
import { BadRequestError } from '../protocols';

export async function createBet(req: Request, res: Response) {
  try {
    const data = req.body;
    const bet = await betsService.createBet(data);
    return res.status(httpStatus.CREATED).json(bet);
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
}
