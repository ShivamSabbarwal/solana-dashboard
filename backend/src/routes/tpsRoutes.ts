import { Router } from 'express';
import { getTransactionsPerSecond } from '../controllers/tpsController';

const router = Router();

router.get('/transactions-per-second', getTransactionsPerSecond);

export default router;
