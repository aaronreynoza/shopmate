/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from 'express';
import config from '../../config';
import * as Logger from '../../utils/logger';

const log = Logger.getInstance();
const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  // eslint-disable-next-line consistent-return
  router.post('/auth', async (req, res) => {
    const {
      email,
      password,
    }: {
      email: string,
      password: string,
    } = req.body;
    if (
      (typeof email !== 'string')
      || (typeof password !== 'string')
    ) {
      return res.status(400).json({
        status: 400,
        data: [],
        messages: 'Wrong type of data or missing fields',
      });
    }
    log.info('inserting new product with fields: ', req.body);
    try {
      // check if the user exists
      const user1 = await routesContext.db.loginUser(email, password);
      if (user1.length === 0) {
        res.status(400).json({
          status: 400,
          data: [],
          messages: 'User not found, verify that the email and password are correct',
        });
      }
      // getting data for the front-end
      let dataUser:any = [];
      let adressData:any|string;
      if (user1[0].fk_id_tipo === 4) {
        dataUser = await routesContext.db.dataUserFront(email);
        if (dataUser.length !== 0) {
          adressData = `${dataUser[0].departamento} ${dataUser[0].municipio} ${dataUser[0].direccion}`;
        } else {
          dataUser = await routesContext.db.dataUserAdmin(email);
          adressData = 'N/D';
        }
      } else {
        dataUser = await routesContext.db.dataUserAdmin(email);
        adressData = 'N/D';
      }
      // data format
      const user = {
        name: dataUser[0].nombres_usuario,
        lastName: dataUser[0].primer_apellido_usu,
        phone: dataUser[0].phone,
        email: dataUser[0].email_usu,
        address: adressData,
      };
      // token generation
      jwt.sign({ user1 }, config.jwtSeed, (e:any, token:any) => {
        // token sending + user data
        res.status(200).json({
          status: 200,
          data: {
            token,
            user,
          },
          message: 'Login Successful',
        });
      });
    } catch (e) {
      log.error(e);
      return res.status(500).json({
        status: 500,
        data: [],
        messages: 'Something went wrong',
      });
    }
  });
};
