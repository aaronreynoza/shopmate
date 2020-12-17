import config from './config';
import db from './db';
import server from './server';
import { createLogger } from './utils/logger';

async function init() {
  createLogger();

  await db.connect(config.mysql);
  await server(config.http);
}

init();
