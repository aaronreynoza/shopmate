/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from 'express';
import * as Logger from '../../utils/logger';
import { renamedProduct } from '../../utils/dataChanges';

const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/products', async (req, res) => {
    const {
      name,
      price,
      product_image,
      product_discount,
      stock_available,
      category,
      description,
      providerName,
    }: {
      name: string,
      price: string,
      product_image: string,
      product_discount: number,
      stock_available: number,
      category: string,
      description: string,
      providerName: string,
    } = req.body;
    if (
      (typeof name !== 'string')
      || (typeof price !== 'number')
      || (typeof product_image !== 'string')
      || (typeof product_discount !== 'number')
      || (typeof stock_available !== 'number')
      || (typeof category !== 'string')
      || (typeof description !== 'string')
      || (typeof providerName !== 'string')
    ) {
      return res.status(400).send('Wrong type of data or missing fields');
    }
    log.info('inserting new product with fields: ', req.body);
    try {
      await routesContext.db.insertProduct(
        name,
        price,
        description,
        product_image,
        stock_available,
        category,
        providerName,
      );
      return res.status(200).send('Product inserted succesfully');
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.get('/products', async (req, res) => {
    const products = await routesContext.db.getProducts();
    res.status(200).send(products);
  });

  router.get('/product/:productName', async (req, res) => {
    const { productName } = req.params;
    if (typeof productName !== 'string') {
      return res.status(400).send('Wrong type of data');
    }
    try {
      const product = await routesContext.db.getProduct(productName);
      return res.status(200).send(product);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });
};
