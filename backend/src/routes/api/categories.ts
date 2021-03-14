import { Router } from 'express';
import * as Logger from '../../utils/logger';

const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/categories', async (req, res) => {
    const {
      categoryName,
      categoryDescription,
      icon,
      active,
    }: {
      categoryName: string,
      categoryDescription: string
      icon: string,
      active: number,
    } = req.body;
    if (
      (typeof categoryDescription !== 'string')
      || (typeof categoryName !== 'string')
      || (typeof icon !== 'string')
    ) {
      return res.status(400).send('Wrong type of data or missing fields');
    }
    log.info('inserting new category with fields: ', req.body);
    try {
      await routesContext.db.insertCategory(categoryName, categoryDescription, icon, active);
      return res.status(200).send('Category inserted succesfully');
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.get('/categories', async (req, res) => {
    try {
      const categories = await routesContext.db.getCategories();
      return res.status(200).send(categories);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.get('/category/:categoryName', async (req, res) => {
    const { categoryName } = req.params;
    if (typeof categoryName !== 'string') {
      return res.status(400).send('Wrong type of data');
    }
    try {
      const category = await routesContext.db.getCategory(categoryName);
      return res.status(200).send(category);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });
};
