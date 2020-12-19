import { Router } from 'express';
import * as Logger from '../../utils/logger';

const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/categories', async (req, res) => {
    const {
      categoryName,
      categoryDescription,
    }: { categoryName: string, categoryDescription: string } = req.body;
    if ((typeof categoryDescription !== 'string') || (typeof categoryName !== 'string')) {
      return res.status(400).send('Wrong type of data');
    }
    try {
      await routesContext.db.insertCategory(categoryName, categoryDescription);
      return res.status(200).send('Category inserted succesfully');
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.get('/categories', async (req, res) => {
    const { categoryName, categoryDescription } = req.body;
    console.log(categoryDescription, categoryName);
    res.status(200).send('hola mundo');
  });
};
