import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const client = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchMarketCap = async () => {
  const { data } = await client.get(`market-cap`);
  return data;
};

export const fetchTransactionsPerSecond = async (hours: number) => {
  const { data } = await client.get(`/transactions-per-second`, {
    params: { hours },
  });
  return data;
};

export const fetchWalletBalances = async () => {
  const { data } = await client.get(`/wallet-balances`);
  return data;
};
