import { Router } from 'express';
import * as Logger from '../../utils/logger';

const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  // eslint-disable-next-line consistent-return
  router.get('/verifyClient/:idVerify', async (req, res) => {
    const { idVerify } = req.params;
    if (typeof idVerify !== 'string') {
      return res.status(400).send('Wrong type of data');
    }
    try {
      // obtener email del token
      const email = await routesContext.db.verifyUserToken(idVerify);
      if (email.length === 0) {
        res.status(400).send('Token de verificacion invalido');
      }
      const idClan = await routesContext.db.idUser(email[0].email);
      await routesContext.db.verifyUser(idClan[0].id_usuario);
      res.status(200).send('Verificacion exitosa');
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });
};
