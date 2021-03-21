import { Router } from 'express';
import * as Logger from '../../utils/logger';
import { IResponse } from '../../utils/types';

const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/categories', async (req, res) => {
    const {
      name,
      description,
      icon,
      active,
    }: {
      name: string,
      description: string
      icon: string,
      active: number,
    } = req.body;
    if (
      (typeof description !== 'string')
      || (typeof name !== 'string')
      || (typeof icon !== 'string')
    ) {
      return res.status(400).send('Wrong type of data or missing fields');
    }
    log.info('inserting new category with fields: ', req.body);
    try {
      await routesContext.db.insertCategory(name, description, icon, active);
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

  router.get('/category/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    if (typeof categoryId !== 'string') {
      return res.status(400).send('Wrong type of data');
    }
    try {
      const category = await routesContext.db.getCategory(categoryId);
      return res.status(200).send(category);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });

  router.put('/categories', async (req, res) => {
    const {
      name,
      description,
      icon,
      active,
      categoryId,
    }: {
      name: string,
      description: string
      icon: string,
      active: number,
      categoryId: number
    } = req.body;
    if (
      (typeof description !== 'string')
      || (typeof name !== 'string')
      || (typeof icon !== 'string')
    ) {
      return res.status(400).send('Wrong type of data or missing fields');
    }
    log.info(`Updating category ${categoryId} with fields: `, req.body);
    try {
      await routesContext.db.updateCategory(categoryId, name, description, icon, active);
      const respObject:IResponse = {
        status: 200,
        data: req.body,
        message: 'Product updated correctly',
      };
      return res.status(200).json(respObject);
    } catch (e) {
      log.error(e);
      return res.status(500).send('Something went wrong');
    }
  });
};
