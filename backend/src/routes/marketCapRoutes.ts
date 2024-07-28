import { Router } from 'express';
import { getMarketCap } from '../controllers/marketCapController';

const router = Router();

router.get('/market-cap', getMarketCap);

export default router;
