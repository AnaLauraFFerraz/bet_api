import { prisma } from '../../config';
import { CreateBetInput } from '../../protocols';

async function createBet(data: CreateBetInput) {
  return prisma.bet.create({
    data: {
      ...data,
      status: 'PENDING',
      amountWon: null,
    },
  });
}

async function isGameFinished(gameId: number) {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });
  return game?.isFinished || false;
}

async function getParticipantBalance(participantId: number) {
  const participant = await prisma.participant.findUnique({
    where: { id: participantId },
  });
  return participant?.balance || 0;
}

async function deductBalance(participantId: number, amount: number) {
  return prisma.participant.update({
    where: { id: participantId },
    data: { balance: { decrement: amount } },
  });
}

const betsRepository = {
  createBet,
  isGameFinished,
  getParticipantBalance,
  deductBalance,
};

export default betsRepository;
