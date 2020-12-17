import { Router } from 'express';

module.exports = (router: Router) => {
  router.post('/products', async (req, res) => {
    // const ProductModel = db.getModel('Product');
    // const product = new ProductModel(req.body);
    // const savedItem = await product.save();

    // return res.status(201).send({
    //   id: savedItem._id,
    //   ...req.body
    // });
  });

  router.get('/products', async (req, res, next) => res.status(200).send('hola mundo'));
};
