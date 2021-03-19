import { Router } from 'express';
import * as Logger from '../../utils/logger';
import contentHTML from '../../utils/htmlEmailResponse'
import {IdataRequest, IdataProducto} from '../../utils/types'
const log = Logger.getInstance();


// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.get('/requestUser/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    try{
      const idUser = await routesContext.db.getIdUserForEmail(userEmail);
      const RequesUserHeader = await routesContext.db.getRequestHeaderForUser(idUser[0].id_usuario);
      var data = [];
      for(let i in RequesUserHeader){
        let paymentDetail:any = await routesContext.db.getPaymentDetailData(RequesUserHeader[i].id_encabez);
        let detailShop:any = await routesContext.db.getShoppingDetailData(RequesUserHeader[i].id_encabez);
        let dataP:any =[];
        detailShop.forEach(function(element:any){
            let obj:IdataProducto= {
              idProd:element.id_producto,
              name:element.name,
              specification:element.especificaciones,
              image:element.imagen,
              amountProduct:element.cantidad,
              unitPrice:element.precio_venta,
              total:element.total_pagar
            }
            dataP.push(obj)
        });
        console.log(detailShop)
        let options:IdataRequest = {
          idRequest : RequesUserHeader[i].id_encabez,
          dateTime : RequesUserHeader[i].fecha_sol,
          state:RequesUserHeader[i].estado,
          typeOfPurchase:RequesUserHeader[i].tipo_compra,
          bankOfTheStore:RequesUserHeader[i].banco,
          accountNumberStore:RequesUserHeader[i].numero_cuenta,
          deliveryType:RequesUserHeader[i].tipo_entrega,
          branchOfficeId:RequesUserHeader[i].fk_id_sucursal,
          bankAccountHolder:paymentDetail[0].titular,
          customerAccount:paymentDetail[0].cuenta_usuario,
          depositNumber:paymentDetail[0].numero_deposito,
          amount:paymentDetail[0].monto,
          concept:paymentDetail[0].concept,
          imageComp:paymentDetail[0].foto_comp,
          requestDetail:dataP
        }
        data.push(options);
      }
      return res.status(200).json(
        {
          status:200,
          data:data,
          message:"Purchase requisition list"
        }
      );
    } catch(e) {
      throw Error(e);
    }
  });

};
