import request from 'supertest';
import app, { init } from '../../src/app';
import { cleanDb } from '../helpers';
import { generateParticipant } from '../factories/participants-factory';

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe('Participants Routes', () => {
  it('should create a new participant', async () => {
    const participantData = generateParticipant();

    const response = await request(app)
      .post('/participants')
      .send(participantData);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(participantData.name);
    expect(response.body.balance).toBe(participantData.balance);
  });

  it('should not create a participant with balance less than 1000', async () => {
    const participantData = {
      ...generateParticipant(),
      balance: 500, // Invalid balance
    };

    const response = await request(app)
      .post('/participants')
      .send(participantData);

    expect(response.status).toBe(400);
  });

  it('should fetch all participants', async () => {
    const responseBefore = await request(app).get('/participants');
    const initialParticipantsCount = responseBefore.body.length;

    await request(app).post('/participants').send(generateParticipant());
    await request(app).post('/participants').send(generateParticipant());

    const responseAfter = await request(app).get('/participants');

    expect(responseAfter.status).toBe(200);
    expect(responseAfter.body.length).toBe(initialParticipantsCount + 2);
  });
});
