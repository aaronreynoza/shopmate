/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import * as Logger from '../../utils/logger';
const log = Logger.getInstance();


const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({storage: inMemoryStorage}).single('image');
const azureStorage = require('azure-storage');

const getStream = require('into-stream');

const blobService = azureStorage.createBlobService();
const containerName = 'comprobantes';

function getBlobName (originalName:string, name1:string){
  const extension = path.extname(originalName);
  return `${name1}${extension}`;
}

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/shopping',uploadStrategy,async (req, res) => {
    const {
      userName,
      email,
      dateTime,
      branchOfficeId,
      typeOfPurchase,
      deliveryType,
      bankOfTheStore,
      accountNumberStore,
      customerAccount,
      bankAccountHolder,
      depositNumber,
      amount,
      concept,
      requestDetail
    }: {
      userName:string,
      email:string,
      dateTime:string,
      branchOfficeId:number,
      typeOfPurchase:number,
      deliveryType:number,
      bankOfTheStore:string,
      accountNumberStore:string,
      customerAccount:string,
      bankAccountHolder:string,
      depositNumber:string,
      amount:number,
      concept:string,
      requestDetail:any
    } = req.body;
    
    if (
      (typeof userName !== 'string')
      || (typeof email !== 'string')
      || (typeof dateTime !== 'string')
      || (typeof branchOfficeId !== 'number')
      || (typeof typeOfPurchase !== 'number')
      || (typeof deliveryType !== 'number')
      || (typeof bankOfTheStore !== 'string')
      || (typeof accountNumberStore !== 'string')
      || (typeof customerAccount !== 'string')
      || (typeof bankAccountHolder !== 'string')
      || (typeof depositNumber !== 'string')
      || (typeof amount !== 'number')
      || (typeof concept !== 'string')
    ) {
      return res.status(400).json(
        {
          status:400,
          data:[],
          message:"Something went wrong"
        }
      );
    }
    log.info('inserting new purchase request with fields: ', req.body);
    try {
      if(req.file.originalname ===undefined || req.file.originalname === null || req.file.originalname === ""){
        const respObject = {
          status:400,
          data:[],
          message:"Please, send a image"
        }
        return res.status(400).json(respObject);
      }
      //Create Request Number
      const identifier1:string = Math.random().toString().replace(/0\./,'');
      const identifier2:string = Math.random().toString().replace(/0\./,'');
      const numeroSolicitud = identifier1+identifier2;
      const blobName:string = getBlobName(req.file.originalname,numeroSolicitud);
      const stream = getStream(req.file.buffer);
      const streamLength = req.file.buffer.length;
      log.info('inserting new product with fields: ', req.body);
      //verify that the request has products
      if(requestDetail.length ===0){
        return res.status(400).json(
          {
            status:400,
            data:[],
            message:"Please enter products to your purchase"
          }
        );
      }
      var quantityInventori = [];
      //get the number of products in the database
      for(let i in requestDetail){
        var dat = await routesContext.db.verifyProductQuantity(requestDetail[i].idProduct,branchOfficeId);
        if(dat.length ===0){
          return res.status(400).json(
            {
              status:400,
              data:dat,
              message:"Product not found"
            }
          );
        }
        if(requestDetail[i].productQuantity <= dat[0].cantidad){
          quantityInventori.push(dat[0]);
        }
        else{
          return res.status(400).json(
            {
              status:400,
              data:dat,
              message:"Does not have enough products"
            }
          );
        }
      }
      //subtract the amount of the request with that of the database
      const arrayUpadate:any = [];
      for(let i in quantityInventori){
        if(quantityInventori[i].fk_id_producto!==requestDetail[i].idProduct){
          return res.status(400).json(
            {
              status:400,
              data:[],
              message:"Does not have enough products"
            }
          );
        }
        let id = quantityInventori[i].fk_id_producto;
        let quantity = (quantityInventori[i].cantidad - requestDetail[i].productQuantity);
        let obj ={
          id,quantity
        }
        arrayUpadate.push(obj);
      }
      //Insert Request Header
      await routesContext.db.insertRequestHeader(numeroSolicitud,dateTime,typeOfPurchase,bankOfTheStore,accountNumberStore,deliveryType,email);
      //InserRequest Detail
      requestDetail.forEach(async function(element:any){
        await routesContext.db.insertPurchaseDetail(element.idProduct,element.productQuantity,element.productPrice,numeroSolicitud);
        return element;
      });
      //Insert payment detail
      await routesContext.db.insertPaymentDetail(bankAccountHolder,customerAccount,depositNumber,amount,concept,numeroSolicitud,numeroSolicitud)
      //insert changes to inventory
      arrayUpadate.forEach(async function(element:any){
        await routesContext.db.shoppingUpdateProduct(element.id, element.quantity);
      });
      //uploadimage to azure-blob storage
      await blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, function (e:any){
        if(e){
          throw e;
        }
      });
      //return result
      return res.status(200).json(
        {
          status:200,
          data:{
            data1:quantityInventori,
            data2:requestDetail
          },
          message:"Product inserted correctly"
        }
      );
    } catch (e) {
      log.error(e);
      return res.status(500).json(
        {
          status:500,
          data:[],
          message:"Something went wrong"
        }
      );
    }
  });
  
};
