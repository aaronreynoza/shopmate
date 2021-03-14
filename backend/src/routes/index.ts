/* eslint-disable global-require */
import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import Database from '../db';

const routes = async (router: Router, database: Database) => {
  const apiRoutesPath = path.resolve(__dirname, 'api');
  const files = await fs.promises.readdir(apiRoutesPath);
  const routesContext = { db: database };
  files.forEach((fileName) => {
    // eslint-disable-next-line import/no-dynamic-require
    const { handler } = require(path.resolve(apiRoutesPath, fileName));
    handler(...[router, routesContext]);
  });
};

export default routes;
