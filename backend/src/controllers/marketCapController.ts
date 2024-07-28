// Libraries
import { Request, Response, NextFunction } from 'express';

// Services
import { Token, Currency, getMarketCapData } from '../services/marketCapService';

// Get market cap data Controller
export const getMarketCap = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Hardcoded tokens for assessment purposes
    const tokens = [
      { id: 'serum', symbol: 'srm', name: 'Serum', address: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt' },
      { id: 'raydium', symbol: 'ray', name: 'Raydium', address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R' },
      { id: 'mango-markets', symbol: 'mngo', name: 'Mango', address: 'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac' },
      { id: 'orca', symbol: 'orca', name: 'Orca', address: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE' },
      { id: 'solanium', symbol: 'slim', name: 'Solanium', address: 'xxxxa1sKNGwFtw2kFn8XauW9xq8hBZ5kVtcSesTT9fW' },
    ];

    const { currency = 'usd' } = req.query;

    const data = await getMarketCapData(req.url, tokens as Token[], currency as Currency);
    res.json(data);
  } catch (error) {
    res.status(500).send((error as Error).message);
    next(error);
  }
};
