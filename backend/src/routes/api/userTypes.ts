import { Router } from 'express';
import * as Logger from '../../utils/logger';

const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/user-types', async (req, res) => {
    const {
      name,
      description,
    }: {
      name: string,
      description: string
    } = req.body;
    if (
      (typeof description !== 'string')
      || (typeof name !== 'string')
    ) {
      return res.status(400).send('Wrong type of data or missing fields');
    }
    log.info('inserting new user type with fields: ', req.body);
    try {
      await routesContext.db.insertUserType(name, description);
      return res.status(200).send('User Type inserted succesfully');
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.get('/user-types', async (req, res) => {
    try {
      const categories = await routesContext.db.getUserTypes();
      return res.status(200).send(categories);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.get('/user-types/:userTypeId', async (req, res) => {
    const { userTypeId } = req.params;
    if (typeof userTypeId !== 'string') {
      return res.status(400).send('Wrong type of data');
    }
    try {
      const userType = await routesContext.db.getUserType(userTypeId);
      return res.status(200).send(userType);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });
};
