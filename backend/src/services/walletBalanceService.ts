// Libriaries
import { PublicKey } from '@solana/web3.js';

// Services
import { fetchCachedData } from './cacheService';
import { getRPCClient } from './solanaRPCService';

// Wrapper function to fetch wallet balance data with caching
export const getWalletBalanceData = async (cacheKey: string, wallets: string[]) => {
  const data = await fetchCachedData(cacheKey, async () => await fetchWalletBalanceData(wallets));
  return data;
};

// Fetch wallet balances for a list of wallets
const fetchWalletBalanceData = async (wallets: string[]) => {
  const rpcClient = getRPCClient();

  const walletPromises = wallets.map(async (wallet) => {
    const walletKey = new PublicKey(wallet);
    const lamports = await rpcClient.getBalance(walletKey);

    return { address: wallet, lamports, sol: lamports / 1e9 }; // Convert from lamports to SOL
  });

  const balances = await Promise.all(walletPromises);

  return { labels: wallets, series: balances };
};
