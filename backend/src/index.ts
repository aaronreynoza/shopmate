import config from './config';
import server from './server';
import * as logger from './utils/logger';

async function init() {
  logger.create();
  await server(config);
}

init();
