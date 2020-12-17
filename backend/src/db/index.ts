import config from './config';
// import db from './db');
import server from './server';
import logger from './lib/logger';

async function init() {
  logger.create();

  // await db.connect(config.mongo);
  await server.start(config.http);
}

init();
