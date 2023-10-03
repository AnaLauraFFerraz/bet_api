import { Request, Response } from 'express';
import httpStatus from 'http-status';
import participantsService from '../services';

export async function createParticipant(req: Request, res: Response) {
  try {
    const { name, balance } = req.body;

    if (!name || !balance || balance < 1000) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send('Initial balance must be at least R$ 10,00');
    }

    const participant = await participantsService.createParticipant(
      name,
      balance,
    );
    return res.status(httpStatus.CREATED).send(participant);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getAllParticipants(req: Request, res: Response) {
  try {
    const participants = await participantsService.getAllParticipants();
    return res.status(httpStatus.OK).json(participants);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: errorMessage });
  }
}
