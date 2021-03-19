import { Router } from 'express';
import * as Logger from '../../utils/logger';
import transporter from '../../utils/transporter'
import contentHTML from '../../utils/htmlEmailResponse'
const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/validation', async (req, res) => {
    const {
      idRequest,
      status,
    }: {
      idRequest: string,
      status: number
    } = req.body;
    if (
      (typeof idRequest !== 'string')
      || (typeof status !== 'number')
    ) {
      return res.status(400).json(
        {
          status:401,
          data:[],
          message:"Something went wrong"
        }
      )
    }
    log.info('inserting new Provider with fields: ', req.body);
    try {
      //check if the project is validated
      const val:number = await routesContext.db.getShoppingRequestStatus(idRequest)
      if(val === 2 || val === 3){
        res.status(400).json({message:"This request is already approved / rejected."});
      }
      if(status === 1){
        res.status(400).json({message:"Unable to place pending status"});
      }
      await routesContext.db.approvelRequest(idRequest,status);
      // email data is verified
      transporter.verify().then(() => {
        console.log('ready');
      });
      const idUser = await routesContext.db.getIdUserFromIdRequest(idRequest);
      const email = await routesContext.db.getEmailFromIdUser(idUser[0].fk_id_usuario)
      console.log(email)
      var estado:string = "";
      if(status === 2){
        estado = "Aprobado"
      }else if(status === 3){
        estado = "Rechazado"
      }

      //
      // data email
      const dataEmail:string = contentHTML(idRequest,estado);
      // the mail is sent
      const info = await transporter.sendMail({
        from: `"shopmasterrace 🎮 🖥️ 🛒"`, // sender address
        to: email[0].email_usu, // list of receivers
        subject: 'Respuesta de solicitu de compra', // Subject line
        html: dataEmail,
        });
        
      res.status(200).json({message:"Prueba pasada"})
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

};
