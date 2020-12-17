import { config as dotenv } from 'dotenv';
import path from 'path';
import { ConfigType } from '../utils/types';

dotenv({
  path: path.resolve(__dirname, '../.env'),
});

const config: ConfigType = {
  http: {
    HOST: process.env.HTTP_HOST || '127.0.0.1',
    PORT: parseInt(process.env.HTTP_PORT!, 10) || 3000,
  },
  DATABASE: {
    DIALECT: 'mysql',
    HOST: process.env.DATABASE_HOST!,
    PORT: parseInt(process.env.DATABASE_PORT!, 10),
    USER: process.env.DATABASE_USER!,
    PASSWORD: process.env.DATABASE_PASSWORD!,
    SCHEMA: process.env.DATABASE_SCHEMA!,
    POOL_MIN_SIZE: parseInt(process.env.POOL_MIN_SIZE!, 10) || 10,
    POOL_MAX_SIZE: parseInt(process.env.POOL_MAX_SIZE!, 10) || 10,
    ACQUIRE_TIMEOUT_MILLIS: parseInt(process.env.ACQUIRE_TIMEOUT_MILLIS!, 10) || 30000,
    CREATE_TIMEOUT_MILLIS: parseInt(process.env.CREATE_TIMEOUT_MILLIS!, 10) || 30000,
    DESTROY_TIMEOUT_MILLIS: parseInt(process.env.DESTROY_TIMEOUT_MILLIS!, 10) || 5000,
    IDLE_TIMEOUT_MILLIS: parseInt(process.env.IDLE_TIMEOUT_MILLIS!, 10) || 30000,
    REAP_INTERVAL_MILLIS: parseInt(process.env.REAP_INTERVAL_MILLIS!, 10) || 1000,
    CREATE_RETRY_INTERVAL_MILLIS: parseInt(process.env.CREATE_RETRY_INTERVAL_MILLIS!, 10) || 200,
    DEBUG: false,
  },
};

export default config;
