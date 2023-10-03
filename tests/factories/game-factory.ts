import { faker } from '@faker-js/faker';

export function generateGame() {
  return {
    homeTeamName: faker.company.name(),
    awayTeamName: faker.company.name(),
  };
}
