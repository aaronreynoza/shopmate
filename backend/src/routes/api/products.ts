/* eslint-disable @typescript-eslint/naming-convention */
require('dotenv').config();
import { Router } from 'express';
import * as Logger from '../../utils/logger';
import multer from 'multer';
import path from 'path';

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
      nombre_prod,
      precio_venta,
      especificaciones,
      categoria,
      proveedor,
    }: {
      nombre_prod: string,
      precio_venta: number,
      imagen: string,
      especificaciones: string,
      categoria: string,
      proveedor: string,
    } = req.body;

    const blobName:string = getBlobName(req.file.originalname,nombre_prod);
    const stream = getStream(req.file.buffer);
    const streamLength = req.file.buffer.length;
    if (
      (typeof nombre_prod !== 'string')
      || (typeof precio_venta !== 'string')
      || (typeof especificaciones !== 'string')
      || (typeof categoria !== 'string')
      || (typeof proveedor !== 'string')
    ) {
      return res.status(400).send('Wrong type of data or missing fields');
    }
    log.info('inserting new product with fields: ', req.body);
    try {
      await routesContext.db.insertProduct(
        nombre_prod,
        precio_venta,
        especificaciones,
        blobName,
        categoria,
        proveedor,
      );
      await blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, function (e:any){
        if(e){
          throw e;
        }
      });
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
