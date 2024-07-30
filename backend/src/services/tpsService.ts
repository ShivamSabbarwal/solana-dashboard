// Services
import { fetchCachedData } from './cacheService';
import { getRPCClient } from './solanaRPCService';

export type Hours = 1 | 3 | 6 | 12;

// Wrapper function to fetch TPS data with caching
export const getTPSData = async (cacheKey: string, hours: Hours) => {
  const data = await fetchCachedData(cacheKey, async () => await fetchTPSData(hours));
  return data;
};

// Fetch TPS data
const fetchTPSData = async (hours: Hours = 1) => {
  const rpcClient = getRPCClient();

  // Fetch performance samples
  const numSamples = 60 * hours; // 1 sample = 60 seconds
  const performanceSamples = await rpcClient.getRecentPerformanceSamples(numSamples);

  // Map the performance samples to a timeseries dataset
  const tpsData = performanceSamples.map((sample, index) => {
    const timeStamp = Date.now() - (numSamples - index) * 60 * 1000;
    const tps: number = parseFloat((sample.numTransactions / sample.samplePeriodSecs).toFixed(2));

    return [timeStamp, tps];
  });

  return { hours: [1, 3, 6, 12], series: tpsData };
};
