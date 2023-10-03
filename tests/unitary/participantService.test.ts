import participantsService from '../../src/services/paticipants-service';
import { generateParticipant } from '../factories/participants-factory';
import { cleanDb } from '../helpers';
import { init } from 'app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe('Participants Service', () => {
  it('should create a new participant', async () => {
    const { name, balance } = generateParticipant();

    const participant = await participantsService.createParticipant(
      name,
      balance,
    );

    expect(participant.name).toBe(name);
    expect(participant.balance).toBe(balance);
  });

  it('should not create a participant with balance less than 1000', async () => {
    const { name } = generateParticipant();

    await expect(
      participantsService.createParticipant(name, 500),
    ).rejects.toThrow('Initial balance must be at least R$ 10,00');
  });

  it('should fetch all participants', async () => {
    const participant1 = await participantsService.createParticipant(
      generateParticipant().name,
      generateParticipant().balance,
    );
    const participant2 = await participantsService.createParticipant(
      generateParticipant().name,
      generateParticipant().balance,
    );

    const participants = await participantsService.getAllParticipants();

    expect(participants.length).toBe(2);
    expect(participants).toEqual(
      expect.arrayContaining([participant1, participant2]),
    );
  });
});
