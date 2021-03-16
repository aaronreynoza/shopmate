/* eslint-disable @typescript-eslint/naming-convention */
import config from '../../config';
import { json } from 'body-parser';
import { Router } from 'express';
import * as Logger from '../../utils/logger';
import contentHTML from '../../utils/htmlEmailVerify';
const nodemailer = require('nodemailer');

const log = Logger.getInstance();
const jwt = require("jsonwebtoken");
// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/registerClient' ,async (req, res) => {
    const {
      names,
      lastName,
      secondLastName,
      phone,
      email,
      password,
    }: {
      names: string,
      lastName: string,
      secondLastName:string,
      phone:string,
      email:string,
      password:string,
    } = req.body;
    if (
      (typeof names !== 'string')
      || (typeof lastName !== 'string')
      || (typeof secondLastName !== 'string')
      || (typeof phone !== 'string')
      || (typeof email !== 'string')
      || (typeof password !== 'string')
    ) {
      return res.status(400).json({
        status:500,
        data:[],
        messages:"Wrong type of data or missing fields"
      });
    }
    log.info('inserting new product with fields: ', req.body);
    try{
      //it is validated if the email is already active
      const emailVal:boolean = await routesContext.db.emailValidator(email);
      if (emailVal!) {
        return res.status(400).json({
          status:400,
          data:[],
          messages:"Este usuario ya se encuentra dentro de la plataforma"
        });
      }
      //si el correo no se encuentra en la base de datos se inserta
      await routesContext.db.registerClient(names,lastName,secondLastName,phone,email,password);
      const val = function(dato:string){
        if(dato !== "yes"){
          return false
        }else {
          return true
        }
      }
      //create validation token
      const identifier1:string = Math.random().toString().replace(/0\./,'');
      const identifier2:string = Math.random().toString().replace(/0\./,'');
      //insert token verify in database
      const token = identifier1 + identifier2;
      await routesContext.db.verification(token,email)
      //the route is created to generate a validation
      const routeVal:string = config.hostServer+ "/api/v1/verifyClient/"+token;
      //the store email data is inserted
      let transporter = nodemailer.createTransport({
        host: config.emailHost,
        port: parseInt(config.emailPort),
        secure: val(config.secureEmail),
        auth: {
          user: config.emailApp,
          pass: config.passwordEmail,
        },
      });
      //email data is verified
      transporter.verify().then(()=>{
        console.log('ready');
      })
      //data email
      const dataEmail:string = contentHTML(routeVal,lastName,names);
      //the mail is sent
      let info = await transporter.sendMail({
        from: `"shopmasterrace 🎮 🖥️ 🛒" ${config.emailApp}`, // sender address
        to:email, // list of receivers
        subject: "Verificacion de cuenta ✔", // Subject line
        html:dataEmail,
      });
      //a message + and message is printed on the console
      console.log('envio de correo verificacion' + info.messageId +routeVal)
      //se retorna el siguiente mensaje
      res.status(200).json({
        status:200,
        data:req.body,
        message:"Usuario registrado correctamente"
      });
    } catch (e) {
      res.status(400).json({
        status:500,
        data:[],
        messages:"Algo salio mal"
      })
    }
  });

};
