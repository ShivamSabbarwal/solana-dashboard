// Libraries
import axios from 'axios';
import { PublicKey } from '@solana/web3.js';

// Services
import { getRPCClient } from './solanaRPCService';
import { fetchCachedData } from './cacheService';

// Constants
const COIN_GECKO_API_URL = 'https://api.coingecko.com/api/v3';

// Type Definitions
export type Token = {
  id: string;
  symbol: string;
  name: string;
  address: string;
};

export type Currency = 'usd' | 'cad' | 'eur';

// Wrapper function to fetch market cap data with caching
export const getMarketCapData = async (cacheKey: string, tokens: Token[], currency: Currency) => {
  const data = await fetchCachedData(cacheKey, async () => await fetchMarketCapData(tokens, currency));
  return data;
};

// Fetch market cap data for a list of tokens
const fetchMarketCapData = async (tokens: Token[], currency: Currency) => {
  const rpcClient = getRPCClient();

  const prices = await getTokenPrices(tokens, currency);

  const marketCaps = await Promise.all(
    tokens.map(async ({ id, symbol, name, address }) => {
      const addressKey = new PublicKey(address);
      const supply = await rpcClient.getTokenSupply(addressKey);

      const supplyAmount = supply.value.uiAmount || 0;
      const price = prices[id]?.[currency] || 0;

      return {
        id,
        symbol,
        name,
        price,
        currency,
        supply: supplyAmount,
        marketCap: supplyAmount * price,
      };
    })
  );

  return marketCaps;
};

// Fetch Token Prices
export const getTokenPrices = async (tokens: Token[], currency: Currency = 'usd') => {
  const tokenIds = tokens.map((token: Token) => token.id).join(',');
  const prices = await axios.get(`/simple/price`, {
    baseURL: COIN_GECKO_API_URL,
    params: { ids: tokenIds, vs_currencies: currency },
  });

  return prices.data;
};
