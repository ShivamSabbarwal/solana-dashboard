// Libraries
import Redis from 'ioredis';

const CACHE_EXPIRATION = 60 * 2; // Cache expiration time in seconds (2 minutes)

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
});

// Helper functions
const cacheData = async (key: string, data: any, expiration: number = CACHE_EXPIRATION) => {
  return await redis.set(key, JSON.stringify(data), 'EX', expiration);
};

const getCachedData = async (key: string) => {
  const cachedData = await redis.get(key);

  if (!cachedData) return null;

  return JSON.parse(cachedData);
};

// Caching function that fetches data if not cached
export const fetchCachedData = async (cacheKey: string, fetchFunction: () => Promise<any>, expiration: number = CACHE_EXPIRATION) => {
  const cachedData = await getCachedData(cacheKey);
  if (cachedData) return cachedData;

  const data = await fetchFunction();
  await cacheData(cacheKey, data, expiration);
  return data;
};

export const clearCache = async (key: string) => {
  await redis.del(key);
};
