/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from 'express';
import * as Logger from '../../utils/logger';
import { Filter } from '../../utils/types';

const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.post('/search', async (req, res) => {
    const {
      type_search,
      keyword,
      categoryId,
      filter,
    }:{
      type_search:string,
      keyword:string,
      categoryId:number,
      filter: Filter | null | undefined,
    } = req.body;
    if (
      (typeof type_search !== 'string')
      || (typeof keyword !== 'string')
      || (typeof categoryId !== 'number')
    ) {
      return res.status(400).send('Wrong type of data or missing fields');
    }
    try {
      switch (type_search) {
        case 'category':
          if (filter && filter !== null) {
            if (filter && filter?.price_max !== null && filter?.price_min !== null) {
              const products = await routesContext
                .db.getSearchProductCategoryFilter(
                  categoryId,
                  filter?.price_min,
                  filter?.price_max,
                );
              res.status(200).send(products);
            } else if (filter.price_min !== null && filter.price_max == null) {
              const products = await routesContext
                .db.getSearchProductCategoryFilterMin(categoryId, filter.price_min);
              res.status(200).send(products);
            } else if (filter && filter.price_max !== null && filter.price_min == null) {
              const products = await routesContext
                .db.getSearchProductCategoryFilterMax(categoryId, filter.price_max);
              res.status(200).send(products);
            }
          } else {
            const products = await routesContext.db.getSearchProductCategory(categoryId);
            res.status(200).send(products);
          }
          break;
        case 'keyword':
          if (filter && filter !== null) {
            if (filter?.price_max !== null && filter?.price_min !== null) {
              const products = await routesContext
                .db.getSearchProductKeywordFilter(keyword, filter?.price_min, filter?.price_max);
              res.status(200).send(products);
            } else if (filter.price_min !== null && filter.price_max === null) {
              const products = await routesContext
                .db.getSearchProductKeywordFilterMin(categoryId, filter.price_min);
              res.status(200).send(products);
            } else if (filter.price_max !== null && filter.price_min === null) {
              const products = await routesContext
                .db.getSearchProductKeywordFilterMax(categoryId, filter.price_max);
              res.status(200).send(products);
            }
          } else {
            const products = await routesContext.db.getSearchProductKeyword(keyword);
            res.status(200).send(products);
          }
          break;
        default:
          res.status(400).send('No access');
      }
    } catch (e) {
      res.status(500).send('Something went wrong');
    }
    return res.status(200).send('This is unrechable');
  });
};
