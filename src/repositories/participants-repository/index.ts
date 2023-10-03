import { prisma } from '../../config';
import { CreateParticipantInput } from '../../protocols';

async function createParticipant({ name, balance }: CreateParticipantInput) {
  return prisma.participant.create({
    data: {
      name,
      balance,
    },
  });
}

async function findAllParticipants() {
  return prisma.participant.findMany();
}

const participantsRepository = {
  createParticipant,
  findAllParticipants,
};

export default participantsRepository;
