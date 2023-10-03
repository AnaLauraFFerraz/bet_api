import participantsRepository from '../repositories/participants-repository';
import { ParticipantOutput } from '../protocols';
import { Participant } from '@prisma/client';
import httpStatus from 'http-status';

async function createParticipant(
  name: string,
  balance: number,
): Promise<Participant> {
  const participant = await participantsRepository.createParticipant({
    name,
    balance,
  });
  if (!participant) throw httpStatus.NOT_FOUND;

  return participant;
}

async function getAllParticipants(): Promise<ParticipantOutput> {
  const participants = await participantsRepository.findAllParticipants();
  if (!participants) throw httpStatus.NOT_FOUND;
  return participants;
}

const participantsService = {
  createParticipant,
  getAllParticipants,
};

export default participantsService;
