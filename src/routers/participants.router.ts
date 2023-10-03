import { Router } from 'express';
import { createParticipant, getAllParticipants } from '../controllers';

const participantsRouter = Router();

participantsRouter.post('/', createParticipant);
participantsRouter.get('/', getAllParticipants);

export { participantsRouter };
