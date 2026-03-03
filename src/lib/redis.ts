import { createClient } from 'redis';
import 'server-only';
import { env } from './env';

const globalForRedis = globalThis as unknown as { redis: ReturnType<typeof createClient> };

const redis =
  globalForRedis.redis ??
  createClient({
    socket: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
    },
  });

if (env.NODE_ENV !== 'production') globalForRedis.redis = redis;

if (!redis.isOpen) redis.connect();

export { redis };
