// Librairies
import { Request, Response, NextFunction } from 'express';

// Services
import { getWalletBalanceData } from '../services/walletBalanceService';

export const getWalletBalances = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Hardcoded wallets for assessment purposes
    const wallets = [
      '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
      '61aq585V8cR2sZBeawJFt2NPqmN7zDi1sws4KLs5xHXV',
      'EXJHiMkj6NRFDfhWBMKccHNwdSpCT7tdvQeRf87yHm6T',
      '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
      'Q6XprfkF8RQQKoQVG33xT88H7wi8Uk1B1CC7YAs69Gi',
      '5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9',
      '9uyDy9VDBw4K7xoSkhmCAm8NAFCwu4pkF6JeHUCtVKcX',
      '9DrvZvyWh1HuAoZxvYWMvkf2XCzryCpGgHqrMjyDWpmo',
      '3EpUYHv8NzoD5EzqB74JTYUtva2c1wj3Wq3oR5gaLfGt',
      'AVzP2GeRmqGphJsMxWoqjpUifPpCret7LqWhD8NWQK49',
    ];

    const data = await getWalletBalanceData(req.url, wallets);
    res.json(data);
  } catch (error) {
    res.status(500).send((error as Error).message);
    next(error);
  }
};
