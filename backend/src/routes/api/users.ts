/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from 'express';
import config from '../../config';
import * as Logger from '../../utils/logger';
import contentHTML from '../../utils/htmlEmailVerify';

const nodemailer = require('nodemailer');

const log = Logger.getInstance();
// const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/user', async (req, res) => {
    const {
      names,
      lastName,
      secondLastName,
      phone,
      email,
      password,
      userType,
    }: {
      names: string,
      lastName: string,
      secondLastName:string,
      phone:string,
      email:string,
      password:string,
      userType: string
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
        status: 500,
        data: [],
        messages: 'Wrong type of data or missing fields',
      });
    }
    try {
      // validate if the email is already active
      const emailVal:boolean = await routesContext.db.emailValidator(email);
      if (emailVal!) {
        return res.status(400).json({
          status: 400,
          data: [],
          messages: 'Este usuario ya se encuentra dentro de la plataforma',
        });
      }
      await routesContext.db.registerUser(
        names,
        lastName,
        secondLastName,
        phone,
        email,
        password,
        userType,
      );
      // create validation token
      const identifier1:string = Math.random().toString().replace(/0\./, '');
      const identifier2:string = Math.random().toString().replace(/0\./, '');
      // insert verify token in the database
      const token = identifier1 + identifier2;
      await routesContext.db.verification(token, email);

      // create a URL to validate the new user
      const routeVal:string = `${config.hostServer}/api/v1/verifyClient/${token}`;
      // the store email data is inserted
      const transporter = nodemailer.createTransport({
        host: config.emailHost,
        port: parseInt(config.emailPort, 10),
        secure: config.secureEmail !== 'yes',
        auth: {
          user: config.emailApp,
          pass: config.passwordEmail,
        },
      });
      const dataEmail:string = contentHTML(routeVal, lastName, names);
      // send the email
      const info = await transporter.sendMail({
        from: `"shopmasterrace 🎮 🖥️ 🛒" ${config.emailApp}`, // sender address
        to: email, // list of receivers
        subject: 'Verificacion de cuenta ✔', // Subject line
        html: dataEmail,
      });
      log.info(`verification email sent: ${info.messageId}${routeVal}`);
      // se retorna el siguiente mensaje
    } catch (e) {
      log.error(e);
      res.status(500).json({
        status: 500,
        data: [],
        messages: 'Something went wrong',
      });
    }
    return res.status(200).json({
      status: 200,
      data: req.body,
      message: 'Usuario registrado correctamente',
    });
  });
};
