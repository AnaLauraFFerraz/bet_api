import { faker } from '@faker-js/faker';

export function generateParticipant() {
  return {
    name: faker.person.firstName(),
    balance: faker.number.int({ min: 1000, max: 100000 }),
  };
}
