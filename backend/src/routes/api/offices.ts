import { Router } from 'express';
import * as Logger from '../../utils/logger';

const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/offices', async (req, res) => {
    const {
      name,
      state,
    }: {
      name: string,
      state: string
    } = req.body;
    if (
      (typeof state !== 'string')
      || (typeof name !== 'string')
    ) {
      return res.status(400).send('Wrong type of data or missing fields');
    }
    log.info('inserting new office with fields: ', req.body);
    try {
      await routesContext.db.insertOffice(name, state);
      return res.status(200).send('Office inserted succesfully');
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.get('/offices', async (req, res) => {
    try {
      const offices = await routesContext.db.getOffices();
      return res.status(200).send(offices);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.get('/offices/:OfficeId', async (req, res) => {
    const { OfficeId } = req.params;
    if (typeof OfficeId !== 'string') {
      return res.status(400).send('Wrong type of data');
    }
    try {
      const office = await routesContext.db.getOffice(OfficeId);
      return res.status(200).send(office);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });
};
