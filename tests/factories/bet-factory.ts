import { faker } from '@faker-js/faker';

export function generateBet(gameId: number, participantId: number) {
  return {
    homeTeamScore: faker.number.int({ min: 0, max: 5 }),
    awayTeamScore: faker.number.int({ min: 0, max: 5 }),
    amountBet: faker.number.int({ min: 1000, max: 10000 }),
    gameId,
    participantId,
  };
}
