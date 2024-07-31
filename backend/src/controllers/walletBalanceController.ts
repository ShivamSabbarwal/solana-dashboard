// Librairies
import { Request, Response, NextFunction } from 'express';

// Services
import { getWalletBalanceData } from '../services/walletBalanceService';

export const getWalletBalances = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Hardcoded wallets for assessment purposes
    const wallets = [
      '7mhcgF1DVsj5iv4CxZDgp51H6MBBwqamsH1KnqXhSRc5',
      'FWznbcNXWQuHTawe9RxvQ2LdCENssh12dsznf4RiouN5',
      '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
      '5VCwKtCXgCJ6kit5FybXjvriW3xELsFDhYrPSqtJNmcD',
      '6FEVkH17P9y8Q9aCkDdPcMDjvj7SVxrTETaYEm8f51Jy',
      '42brAgAVNzMBP7aaktPvAmBSPEkehnFQejiZc53EpJFd',
      '3yFwqXBfZY4jBVUafQ1YEXw189y2dN3V5KQq9uzBDy1E',
      '9VWD3xbXWtC2aGN1mQcVFwZMRPSjJfknNYq4DqGQ7B8B',
      '5MfwpEF6XPBDaBBGsiEviNe8sMeF7DZCdQeC5mdrP1pt',
      'bazxfWH6Vu2FncaSKc3kkgvyCuPwyFpx4ryZPcNiG7x',
    ];

    const data = await getWalletBalanceData(req.url, wallets);
    res.json(data);
  } catch (error) {
    res.status(500).send((error as Error).message);
    next(error);
  }
};
