/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from 'express';
import * as Logger from '../../utils/logger';
const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {

  router.post('/shoppingcart', async (req, res) => {
    const {
      date,
      cantidad,
      fk_id_producto,
      fk_id_usuario
    }:{
      date:string,
      cantidad:number,
      fk_id_producto:number,
      fk_id_usuario:number,
    } = req.body;
    if (
      (typeof date !== 'string')
      || (typeof cantidad !== 'number')
      || (typeof fk_id_producto !== 'number')
      || (typeof fk_id_usuario !== 'number')
    ) {
        return res.status(400).send('Wrong type of data or missing fields');
    }
    try {
        await routesContext.db.insertShoppingCart(
        date,
        cantidad,
        fk_id_producto,
        fk_id_usuario,
        );
        return res.status(200).send('Shopping cart inserted succesfully');
      } catch (e) {
        log.error(e);
        return res.status(500).send('Something went wrong');
      }
  });

  router.get('/shoppingcartlist/:user', async (req, res) => {
    const { user } = req.params;
    if (typeof user !== 'string') {
      return res.status(400).send(user);
    }
    const id : number = parseInt(user);
    const shopArray = await routesContext.db.getShoppingCart(id);
    res.status(200).send(shopArray);
  });

  router.get('/shoppingcart/:idCart', async (req, res) => {
    const { idCart } = req.params;
    if (typeof idCart !== 'string') {
      return res.status(400).send("Worng type");
    }
    const id : number = parseInt(idCart);
    const shopArray = await routesContext.db.getShoppingCartData(id);
    res.status(200).send(shopArray);
  });

  router.delete('/shoppingcart/:id_cart', async (req, res) => {
    const { id_cart } = req.params;
    if (typeof id_cart !== 'string') {
      return res.status(400).send("Worng type");
    }
    const id : number = parseInt(id_cart);
    const shopArray = await routesContext.db.deleteShoppingCartItem(id);
    res.status(200).send(shopArray);
  });

};
