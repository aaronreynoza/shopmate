import bodyParser from 'body-parser';
import bunyanMiddleware from 'bunyan-middleware';
import express, { Express } from 'express';
import nocache from 'nocache';
// import Database from './data/cachedDatabase';
// import Handlers from './handlers';

import * as logger from './utils/logger';
import routesInstance from './routes';
import { ConfigType } from './utils/types';

function mountMiddlewares(serverInstance: Express) {
  serverInstance.use(bunyanMiddleware({ logger: logger.getInstance() }));
  serverInstance.use(bodyParser.json());

  serverInstance.use(nocache());

  // serverInstance.use((err: any, req, res: any) => {
  //   // eslint-disable-next-line no-param-reassign
  //   delete err.stack;

  //   res.status(err.status || statusCodes.INTERNAL_SERVER_ERROR).json(err);
  // });
}

function mountRoutes(serverInstance: Express) {
  const router = express.Router();

  routesInstance(router);
  serverInstance.use('/api/v1', router);
}

async function start(config: ConfigType) {
  const log = logger.getInstance();
  const instance = express();

  mountMiddlewares(instance);
  mountRoutes(instance);

  instance.listen(config.http.PORT);

  log.info(`Server running and listening at port ${config.http.PORT}`);

  return instance;
}

export default start;
