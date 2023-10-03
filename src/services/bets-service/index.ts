import betsRepository from '../../repositories/bets-repository';
import { CreateBetInput, BadRequestError } from '../../protocols';

async function createBet(data: CreateBetInput) {
  const gameFinished = await betsRepository.isGameFinished(data.gameId);
  if (gameFinished) {
    throw new BadRequestError('Cannot bet on a finished game.');
  }

  const participantBalance = await betsRepository.getParticipantBalance(
    data.participantId,
  );
  if (participantBalance < data.amountBet) {
    throw new BadRequestError('Insufficient funds for this bet.');
  }

  await betsRepository.deductBalance(data.participantId, data.amountBet);

  return betsRepository.createBet(data);
}

const betsService = {
  createBet,
};

export default betsService;
