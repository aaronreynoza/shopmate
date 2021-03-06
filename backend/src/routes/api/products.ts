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
      quantity,
    }: {
      productName: string,
      price: string,
      specifications: string,
      category: string,
      provider: string,
      quantity: string
    } = req.body;
    const priceVar:number = parseFloat(price);
    const idCat:number = parseInt(category, 10);
    const IdProv:number = parseInt(provider, 10);
    const productQuantity:number = parseInt(quantity, 10);
    if (
      (typeof productName !== 'string')
      || (typeof priceVar !== 'number')
      || (typeof specifications !== 'string')
      || (typeof idCat !== 'number')
      || (typeof IdProv !== 'number')
      || (typeof quantity !== 'string')
    ) {
      const respObject:IResponse = {
        status: 401,
        data: [],
        message: 'Bad request. Please fix your params',
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
      const productResult = await routesContext.db.insertProduct(
        productName,
        priceVar,
        specifications,
        blobName,
        category,
        provider,
      );
      const productId = productResult[0];
      await routesContext.db.insertInventory(productQuantity, productId, 1);
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
    res.status(200).send(products[0]);
  });

  router.get('/product/:productName', async (req, res) => {
    const { productName } = req.params;
    if (typeof productName !== 'string') {
      return res.status(400).send('Wrong type of data');
    }
    try {
      const product = await routesContext.db.getProduct(productName);
      return product && product.length > 0 && product[0].length > 0
        ? res.status(200).send(product[0])
        : res.status(400).send('Product not found');
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.put('/products', uploadStrategy, async (req, res) => {
    const {
      productName,
      price,
      specifications,
      category,
      provider,
      quantity,
      newImage,
      productId,
    }: {
      productName: string,
      price: string,
      specifications: string,
      category: string,
      provider: string,
      quantity: string,
      newImage: string,
      productId: string,
    } = req.body;
    const priceVar:number = parseFloat(price);
    const idCat:number = parseInt(category, 10);
    const IdProv:number = parseInt(provider, 10);
    const productQuantity:number = parseInt(quantity, 10);
    const isNewImage = (newImage === 'true');
    if (
      (typeof productName !== 'string')
      || (typeof priceVar !== 'number')
      || (typeof specifications !== 'string')
      || (typeof idCat !== 'number')
      || (typeof IdProv !== 'number')
      || (typeof quantity !== 'string')
      || (typeof productId !== 'string')
    ) {
      const respObject:IResponse = {
        status: 401,
        data: [],
        message: 'Bad request. Please fix your params',
      };
      return res.status(400).json(respObject);
    }
    try {
      if ((isNewImage && req.file.originalname === undefined) || (isNewImage && req.file.originalname === null) || (isNewImage && req.file.originalname === '')) {
        const respObject:IResponse = {
          status: 400,
          data: [],
          message: 'Please, send a image',
        };
        return res.status(400).json(respObject);
      }
      const newImageURL = isNewImage ? getBlobName(req.file.originalname, productName) : undefined;
      log.info('Updating product with fields: ', req.body);
      await routesContext.db.updateProduct(
        productId,
        productName,
        priceVar,
        specifications,
        newImageURL,
        category,
        provider,
      );
      await routesContext.db.updateInventory(productQuantity, productId, 1);
      if (isNewImage) {
        const stream = getStream(req.file.buffer);
        const streamLength = req.file.buffer.length;
        await blobService.createBlockBlobFromStream(
          containerName,
          newImageURL,
          stream,
          streamLength,
          (e:any) => {
            if (e) {
              throw e;
            }
          },
        );
      }
      const respObject:IResponse = {
        status: 200,
        data: req.body,
        message: 'Product updated correctly',
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
};
