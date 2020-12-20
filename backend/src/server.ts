import bodyParser from 'body-parser';
import bunyanMiddleware from 'bunyan-middleware';
import express, { Express } from 'express';
import nocache from 'nocache';
import cors from 'cors';

import * as Logger from './utils/logger';
import Database from './db';
import routesInstance from './routes';
import { ConfigType, ConnectionType } from './utils/types';

const initDb = (config: ConnectionType) => {
  // try open a db connection pool
  const database = new Database(config);
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
}

async function start(config: ConfigType) {
  const log = Logger.getInstance();
  const instance = express();
  const database = await initDb(config.database.connection);
  mountMiddlewares(instance);
  mountRoutes(instance, database);

  instance.listen(config.http.PORT);

  log.info(`Server running and listening at port ${config.http.PORT}`);

  return instance;
}

export default start;
