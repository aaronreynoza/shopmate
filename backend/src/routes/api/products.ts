/* eslint-disable @typescript-eslint/naming-convention */
require('dotenv').config();
import { Router } from 'express';
import * as Logger from '../../utils/logger';
import multer from 'multer';
import path from 'path';
import {IResponse} from '../../utils/types';
const log = Logger.getInstance();

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({storage: inMemoryStorage}).single('image');
const azureStorage = require('azure-storage');

const blobService = azureStorage.createBlobService();
const containerName = 'imagen-producto';

const getStream = require('into-stream');

function getBlobName (originalName:string, name:string){
  const identifier = Math.random().toString().replace(/0\./,'');
  const extension = path.extname(originalName);
  const name1 = name.replace(/\s+/g, '');
  return `${identifier}${name1}${extension}`;
}

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/products', uploadStrategy ,async (req, res) => {
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
    const priceVar:number = parseFloat(price)
    const blobName:string = getBlobName(req.file.originalname,productName);
    const stream = getStream(req.file.buffer);
    const streamLength = req.file.buffer.length;
    if (
      (typeof productName !== 'string')
      || (typeof priceVar !== 'number')
      || (typeof specifications !== 'string')
      || (typeof category !== 'string')
      || (typeof provider !== 'string')
    ) {
      const respObject:IResponse = {
        status:400,
        data:[],
        message:"Something went wrong"
      }
      return res.status(400).json(respObject);
    }
    log.info('inserting new product with fields: ', req.body);
    try {
      await routesContext.db.insertProduct(
        productName,
        priceVar,
        specifications,
        blobName,
        category,
        provider,
      );
      await blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, function (e:any){
        if(e){
          throw e;
        }
      });
      const respObject:IResponse = {
        status:200,
        data:req.body,
        message:"Producto insertado correctamente"
      }
      return res.status(200).json(respObject);
    } catch (e) {
      log.error(e);
      const respObject:IResponse = {
        status:400,
        data:[],
        message:"Something went wrong"
      }
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
      return res.status(200).send(product);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });
  
};
