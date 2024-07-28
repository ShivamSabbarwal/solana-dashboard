// Libraries
import 'dotenv/config';
import { Connection } from '@solana/web3.js';

// Get Solana RPC Client
export const getRPCClient = () => {
  const solanaRpcUrl = `https://solana-mainnet.rpc.extrnode.com/${process.env.SOLANA_RPC_TOKEN}`;
  const solanaRpcClient = new Connection(solanaRpcUrl);
  return solanaRpcClient;
};
