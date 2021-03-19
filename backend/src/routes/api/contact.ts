import { Router } from 'express';
import * as Logger from '../../utils/logger';
import transporter from '../../utils/transporter'
import config from '../../config'
const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/contact', async (req, res) => {
    const {
      name,
      email,
      message,
    }: {
      name: string,
      email: string
      message: string,
    } = req.body;
    if (
      (typeof name !== 'string')
      || (typeof email !== 'string')
      || (typeof message !== 'string')
    ) {
      return res.status(400).json({
        status: 500,
        data: req.body,
        message: "Wrong type of data or missing fields"
      });
      
    }
    log.info('sen email with fields: ', req.body);
    try {
      // email data is verified
      transporter.verify().then(() => {
        console.log('ready');
      });
      const dataFrom:string = name + "shopmasterrace 🎮 🖥️ 🛒";
      const info = await transporter.sendMail({
        from: dataFrom, // sender address
        to: config.emailApp, // list of receivers
        subject: `contacto 🤖`, // Subject line
        text: message,
        });
        return res.status(200).json({
          status: 200,
          data: req.body,
          message: `Contact information sent ${info.messageId}`,
          });
    } catch (e) {
      log.error(e);
      return res.status(500).json(
        {
          status: 500,
          data: req.body,
          message: e,
        }
      );
    }
  });
};
