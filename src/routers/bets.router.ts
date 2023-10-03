import { Router } from 'express';
import { createBet } from '../controllers';

const betsRouter = Router();

betsRouter.post('/', createBet);

export { betsRouter };
