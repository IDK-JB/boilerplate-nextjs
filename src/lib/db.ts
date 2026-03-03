import * as schema from '@/db/schema';
import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'server-only';
import { env } from './env';

function createDb() {
  switch (env.DB_DRIVER) {
    case 'neon':
      return drizzleNeon(neon(env.DATABASE_URL), { schema });
    case 'postgres': {
      return drizzlePg(new Pool({ connectionString: env.DATABASE_URL }), { schema });
    }
    default:
      throw new Error(`Unsupported DB_DRIVER: ${env.DB_DRIVER}`);
  }
}

const globalForDb = globalThis as unknown as { db: ReturnType<typeof createDb> };

export const db = globalForDb.db ?? createDb();

if (env.NODE_ENV !== 'production') globalForDb.db = db;
