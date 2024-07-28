import { Router } from 'express';
import { getWalletBalances } from '../controllers/walletBalanceController';

const router = Router();

router.get('/wallet-balances', getWalletBalances);

export default router;
