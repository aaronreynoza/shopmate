/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { Router } from 'express';
import { IdataRequest, IdataProducto } from '../../utils/types';
// import * as Logger from '../../utils/logger';

// const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.get('/requestList', async (req, res) => {
    try {
      const RequesUserHeader = await routesContext.db.getShoppingRequestData();
      const data = [];
      for (const i in RequesUserHeader) {
        const OfficeName = await routesContext.db
          .getBranchoOfficeName(RequesUserHeader[i].fk_id_sucursal);
        const paymentDetail:any = await routesContext.db
          .getPaymentDetailData(RequesUserHeader[i].id_encabez);
        const detailShop:any = await routesContext.db
          .getShoppingDetailData(RequesUserHeader[i].id_encabez);
        let stado = '';
        if (RequesUserHeader[i].estado === 1) {
          stado = 'Pendiente';
        } else if (RequesUserHeader[i].estado === 2) {
          stado = 'Aprobado';
        } else if (RequesUserHeader[i].estado === 3) {
          stado = 'Rechazado';
        }
        const dataP:any = [];
        detailShop.forEach((element:any) => {
          const obj:IdataProducto = {
            idProd: element.id_producto,
            name: element.nombre_prod,
            specification: element.especificaciones,
            image: element.imagen,
            amountProduct: element.cantidad,
            unitPrice: element.precio_venta,
            total: element.total_pagar,
          };
          dataP.push(obj);
        });
        const options:IdataRequest = {
          idRequest: RequesUserHeader[i].id_encabez,
          dateTime: RequesUserHeader[i].fecha_sol,
          state: RequesUserHeader[i].estado,
          statusName: stado,
          typeOfPurchase: RequesUserHeader[i].tipo_compra,
          bankOfTheStore: RequesUserHeader[i].banco,
          accountNumberStore: RequesUserHeader[i].numero_cuenta,
          deliveryType: RequesUserHeader[i].tipo_entrega,
          deliveryTypeName: 'Entrega en sucursal',
          branchOfficeId: RequesUserHeader[i].fk_id_sucursal,
          branchOffice: OfficeName[0].nombre_sucursal,
          bankAccountHolder: paymentDetail[0].titular,
          customerAccount: paymentDetail[0].cuenta_usuario,
          depositNumber: paymentDetail[0].numero_deposito,
          amount: paymentDetail[0].monto,
          concept: paymentDetail[0].concept,
          imageComp: paymentDetail[0].foto_comp,
          requestDetail: dataP,
        };
        data.push(options);
      }
      console.log(data);
      return res.status(200).json(
        {
          status: 200,
          data,
          message: 'Purchase requisition list',
        },
      );
    } catch (e) {
      throw Error(e);
    }
  });
};
