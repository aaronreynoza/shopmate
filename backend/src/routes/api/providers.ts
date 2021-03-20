import { Router } from 'express';
import * as Logger from '../../utils/logger';

const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/providers', async (req, res) => {
    const {
      providerName,
      phone,
      email,
    }: {
      providerName: string,
      phone: string
      email: string,
    } = req.body;
    if (
      (typeof providerName !== 'string')
      || (typeof phone !== 'string')
      || (typeof email !== 'string')
    ) {
      return res.status(400).send('Wrong type of data or missing fields');
    }
    log.info('inserting new Provider with fields: ', req.body);
    try {
      await routesContext.db.insertProvider(providerName, phone, email);
      return res.status(200).send('Provider inserted succesfully');
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.get('/providers', async (req, res) => {
    try {
      const providers = await routesContext.db.getProviders();
      return res.status(200).send(providers);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.get('/provider/:providerName', async (req, res) => {
    const { providerName } = req.params;
    if (typeof providerName !== 'string') {
      return res.status(400).send('Wrong type of data');
    }
    try {
      const provider = await routesContext.db.getProvider(providerName);
      return res.status(200).send(provider);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.put('/providers', async (req, res) => {
    const {
      providerId,
      providerName,
      phone,
      email,
    }: {
      providerName: string,
      providerId: number,
      phone: string
      email: string,
    } = req.body;
    if (
      (typeof providerName !== 'string')
      || (typeof providerId !== 'number')
      || (typeof phone !== 'string')
      || (typeof email !== 'string')
    ) {
      return res.status(400).send('Wrong type of data or missing fields');
    }
    log.info('updating Provider with fields: ', req.body);
    try {
      await routesContext.db.updateProvider(providerId, providerName, phone, email);
      return res.status(200).send('Provider updated succesfully');
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });
};
