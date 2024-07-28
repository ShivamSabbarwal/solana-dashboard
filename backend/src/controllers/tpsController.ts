// Libraries
import { Request, Response, NextFunction } from 'express';

// Services
import { Hours, getTPSData } from '../services/tpsService';

export const getTransactionsPerSecond = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { hours = 1 } = req.query;

    const data = await getTPSData(req.url, hours as Hours);
    res.json(data);
  } catch (error) {
    res.status(500).send((error as Error).message);
    next(error);
  }
};
