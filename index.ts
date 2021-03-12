import bodyParser from 'body-parser';
import bunyanMiddleware from 'bunyan-middleware';
import express, { Express } from 'express';
import nocache from 'nocache';
import cors from 'cors';
import path from 'path';
import config from './src/config';

import * as Logger from './src/utils/logger';
import Database from './src/db';
import routesInstance from './src/routes';
import { ConfigType, ConnectionType } from './src/utils/types';

Logger.create();

const initDb = (configuration: ConnectionType) => {
  // try open a db connection pool
  const database = new Database(configuration);
  return database.connect();
};

function mountMiddlewares(serverInstance: Express) {
  serverInstance.use(bodyParser.json());
  serverInstance.use(cors({ origin: '*' }));
  serverInstance.use(bunyanMiddleware({ logger: Logger.getInstance() }));

  serverInstance.use(nocache());
}

function mountRoutes(serverInstance: Express, database: Database) {
  const router = express.Router();

  routesInstance(router, database);
  serverInstance.use('/api/v1', router);

  if (process.env.NODE_ENV === 'production') {
    // Set static folder
    serverInstance.use(express.static('./frontend/dist/shopmate'));

    serverInstance.get('*', (req, res) => {
      res.sendFile(path.resolve('frontend', 'dist', 'shopmate', 'index.html'));
    });
  }
}

async function start(configuration: ConfigType) {
  const log = Logger.getInstance();
  const instance = express();
  const database = await initDb(configuration.database.connection);
  mountMiddlewares(instance);
  mountRoutes(instance, database);

  instance.listen(config.http.PORT);

  log.info(`Server running and listening at port ${config.http.PORT}`);

  return instance;
}

start(config);
