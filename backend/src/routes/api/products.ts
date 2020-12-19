import { Router } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/products', async (req, res) => {
    // const ProductModel = db.getModel('Product');
    // const product = new ProductModel(req.body);
    // const savedItem = await product.save();

    // return res.status(201).send({
    //   id: savedItem._id,
    //   ...req.body
    // });
  });

  router.get('/products', async (req, res) => {
    const x = await routesContext.isConnected();
    console.log(x)
    res.status(200).send('hola mundo');
  });
};
