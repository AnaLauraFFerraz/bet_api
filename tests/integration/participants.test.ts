import request from 'supertest';
import app from '../../src/app';
import { cleanDb } from '../helpers';
import { generateParticipant } from '../factories/participants-factory';

beforeEach(async () => {
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
    const participantData1 = generateParticipant();
    const participantData2 = generateParticipant();

    await request(app).post('/participants').send(participantData1);
    await request(app).post('/participants').send(participantData2);

    const response = await request(app).get('/participants');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
