import dotenv from 'dotenv';

dotenv.config();

export namespace Database {
  export const schema = 'api';
  export const database = process.env.DATABASE_NAME;
  export const user = process.env.DATABASE_USERNAME;
  export const password = process.env.DATABASE_PASSWORD;
  export const host = process.env.DATABASE_HOSTNAME;
  export const port = process.env.DATABASE_PORT;
  export const poolMin = Number(process.env.DATABASE_POOL_MIN || '0');
  export const poolMax = Number(process.env.DATABASE_POOL_MAX || '10');
  export const poolIdle = Number(process.env.DATABASE_POOL_IDLE || '10000');
}

export namespace Server {
  export const port = Number(process.env.PORT || '8000');
  export const bodyLimit = '100kb';
  export const corsHeaders = ['Link'];
  export const isDev = process.env.NODE_ENV === 'development';
}

export namespace Knex {
  export const config = {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOSTNAME || Database.host,
      database: process.env.DATABASE_NAME || Database.database,
      user: process.env.DATABASE_USERNAME || Database.user,
      password: process.env.DATABASE_PASSWORD || Database.password,
      port: process.env.DATABASE_PORT || Database.port,
    },
    pool: {
      min: process.env.DATABASE_POOL_MIN,
      max: process.env.DATABASE_POOL_MAX,
      idle: process.env.DATABASE_POOL_IDLE,
    },
    migrations: {
      tableName: 'KnexMigrations',
    },
  };
}

export default {
  Database, Server, Knex,
};
