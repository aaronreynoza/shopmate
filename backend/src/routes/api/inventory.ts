import { Router } from 'express';
import * as Logger from '../../utils/logger';

const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/inventario', async (req, res) => {
    const {
      quantity,
      idProduct,
      idOffice,
    }: {
      quantity: string,
      idProduct: string
      idOffice: string,
    } = req.body;
    if (
      (typeof idProduct !== 'string')
      || (typeof quantity !== 'string')
      || (typeof idOffice !== 'string')
    ) {
      return res.status(400).send('Wrong type of data or missing fields');
    }
    log.info('inserting new inventory with fields: ', req.body);
    try {
      await routesContext.db.insertInventory(quantity, idProduct, idOffice);
      return res.status(200).send('Category inserted succesfully');
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.get('/inventories', async (req, res) => {
    try {
      const inventories = await routesContext.db.getInventories();
      return res.status(200).send(inventories);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.get('/inventory/:idProduct', async (req, res) => {
    const { idProduct } = req.params;
    if (typeof idProduct !== 'string') {
      return res.status(400).send('Wrong type of data');
    }
    try {
      const category = await routesContext.db.getInventory(idProduct);
      return res.status(200).send(category);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });
};
