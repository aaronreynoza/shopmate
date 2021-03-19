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
        return res.status(400).json({
          status: 400,
          data: [],
          messages: 'This request is already approved / rejected.',
        });
      }
      if(status === 1){
        return res.status(400).json({
          status: 400,
          data: [],
          messages: 'Unable to place pending status',
        });
      }
      //update status
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
      var quantityInventori = [];
      //get the number of products in the database
      const convertRequest = await routesContext.db.getShoppingDetailData(idRequest);
      console.log(convertRequest)
      for(let i in convertRequest){
        var dat = await routesContext.db.verifyProductQuantity(convertRequest[i].id_producto,idUser[0].fk_id_sucursal);
        quantityInventori.push(dat[0]);
      }
      var update = [];
      for(let i in quantityInventori){
        if(quantityInventori[0].fk_id_producto !== convertRequest[0].id_producto){
          console.log('error')
        }
        else{
          const num1:number = convertRequest[i].cantidad;
          const num2:number = quantityInventori[i].cantidad;
          let sum = ( num1 + num2 );
          const invent = {
            branchOfficeId:quantityInventori[i].fk_id_sucursal,
            productId:quantityInventori[i].fk_id_producto,
            amount:sum
          }
          update.push(invent)
        }
      }
      update.forEach(async function(element:any){
        await routesContext.db.shoppingUpdateProduct(element.productId,element.amount);
      })
      // data email
      const dataEmail:string = contentHTML(idRequest,estado);
      // the mail is sent
      const info = await transporter.sendMail({
        from: `"shopmasterrace 🎮 🖥️ 🛒"`, // sender address
        to: email[0].email_usu, // list of receivers
        subject: 'Respuesta de solicitud de compra', // Subject line
        html: dataEmail,
        });
        return res.status(200).json({
          status: 200,
          data: req.body,
          message: 'Solicitud Validada',
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
