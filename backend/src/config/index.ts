import { config as dotenv } from 'dotenv';
import path from 'path';
import { ConfigType } from '../utils/types';

dotenv({
  path: path.resolve(__dirname, '../../.env'),
});

const config: ConfigType = {
  http: {
    HOST: process.env.HTTP_HOST || '127.0.0.1',
    PORT: parseInt(process.env.HTTP_PORT!, 10) || 3000,
  },
  database: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST!,
      port: parseInt(process.env.DATABASE_PORT!, 10),
      user: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_SCHEMA!,
    },
    pool: {
      min: parseInt(process.env.POOL_MIN_SIZE!, 10) || 10,
      max: parseInt(process.env.POOL_MAX_SIZE!, 10) || 10,
      acquireTimeoutMillis: parseInt(process.env.ACQUIRE_TIMEOUT_MILLIS!, 10) || 30000,
      createTimeoutMillis: parseInt(process.env.CREATE_TIMEOUT_MILLIS!, 10) || 30000,
      destroyTimeoutMillis: parseInt(process.env.DESTROY_TIMEOUT_MILLIS!, 10) || 5000,
      idleTimeoutMillis: parseInt(process.env.IDLE_TIMEOUT_MILLIS!, 10) || 30000,
      reapIntervalMillis: parseInt(process.env.REAP_INTERVAL_MILLIS!, 10) || 1000,
      createRetryIntervalMillis: parseInt(process.env.CREATE_RETRY_INTERVAL_MILLIS!, 10) || 200,
    },
    debug: false,
  },
  jwtSeed:process.env.SECRET_KEY_FOR_JWT!,
  algorithm:process.env.ALGORITHM_FOR_JWT!,
};

export default config;
