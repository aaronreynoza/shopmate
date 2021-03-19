/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { IResponse } from '../../utils/types';
import * as Logger from '../../utils/logger';

const log = Logger.getInstance();

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');
const azureStorage = require('azure-storage');

const blobService = azureStorage.createBlobService();
const containerName = 'imagen-producto';

const getStream = require('into-stream');

function getBlobName(originalName:string, name:string) {
  const identifier = Math.random().toString().replace(/0\./, '');
  const extension = path.extname(originalName);
  const name1 = name.replace(/\s+/g, '');
  return `${identifier}${name1}${extension}`;
}

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/products', uploadStrategy, async (req, res) => {
    const {
      productName,
      price,
      specifications,
      category,
      provider,
    }: {
      productName: string,
      price: string,
      specifications: string,
      category: string,
      provider: string,
    } = req.body;
    const priceVar:number = parseFloat(price);
    const idCat:number = parseInt(category, 10);
    const IdProv:number = parseInt(provider, 10);
    if (
      (typeof productName !== 'string')
      || (typeof priceVar !== 'number')
      || (typeof specifications !== 'string')
      || (typeof idCat !== 'number')
      || (typeof IdProv !== 'number')
    ) {
      const respObject:IResponse = {
        status: 401,
        data: [],
        message: 'Something went wrong',
      };
      return res.status(400).json(respObject);
    }
    try {
      if (req.file.originalname === undefined || req.file.originalname === null || req.file.originalname === '') {
        const respObject:IResponse = {
          status: 400,
          data: [],
          message: 'Please, send a image',
        };
        return res.status(400).json(respObject);
      }
      const blobName:string = getBlobName(req.file.originalname, productName);
      const stream = getStream(req.file.buffer);
      const streamLength = req.file.buffer.length;
      log.info('inserting new product with fields: ', req.body);
      await routesContext.db.insertProduct(
        productName,
        priceVar,
        specifications,
        blobName,
        category,
        provider,
      );
      await blobService.createBlockBlobFromStream(
        containerName,
        blobName,
        stream,
        streamLength,
        (e:any) => {
          if (e) {
            throw e;
          }
        },
      );
      const respObject:IResponse = {
        status: 200,
        data: req.body,
        message: 'Product inserted correctly',
      };
      return res.status(200).json(respObject);
    } catch (e) {
      log.error(e);
      const respObject:IResponse = {
        status: 500,
        data: [],
        message: 'Something went wrong',
      };
      return res.status(500).json(respObject);
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
      return product && product.length > 0 && product[0].length > 0
        ? res.status(200).send(product[0][0])
        : res.status(400).send('Product not found');
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });
};
