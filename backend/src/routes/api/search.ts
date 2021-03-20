/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from 'express';
import { Filter } from '../../utils/types';
// import * as Logger from '../../utils/logger';

// const log = Logger.getInstance();

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
      let products: any;
      switch (type_search) {
        case 'category':
          // eslint-disable-next-line no-case-declarations
          if (filter && filter !== null) {
            if (filter && filter?.price_max !== undefined && filter?.price_min !== undefined) {
              products = await routesContext
                .db.getSearchProductCategoryFilter(
                  categoryId,
                  filter?.price_min,
                  filter?.price_max,
                );
            } else if (filter.price_min !== undefined && filter.price_max === undefined) {
              products = await routesContext
                .db.getSearchProductCategoryFilterMin(categoryId, filter.price_min);
            } else if (filter && filter.price_max !== undefined && filter.price_min === undefined) {
              products = await routesContext
                .db.getSearchProductCategoryFilterMax(categoryId, filter.price_max);
            }
          } else {
            products = await routesContext.db.getSearchProductCategory(categoryId);
          }
          break;
        case 'keyword':
          // eslint-disable-next-line no-case-declarations
          if (filter && filter !== undefined) {
            if (filter?.price_max !== undefined && filter?.price_min !== undefined) {
              products = await routesContext
                .db.getSearchProductKeywordFilter(keyword, filter?.price_min, filter?.price_max);
            } else if (filter.price_min !== undefined && filter.price_max === undefined) {
              products = await routesContext
                .db.getSearchProductKeywordFilterMin(keyword, filter.price_min);
            } else if (filter.price_max !== undefined && filter.price_min === undefined) {
              products = await routesContext
                .db.getSearchProductKeywordFilterMax(keyword, filter.price_max);
            }
          } else {
            products = await routesContext.db.getSearchProductKeyword(keyword);
          }
          break;
        default:
          return res.status(400).send('No access');
      }
      return res.status(200).send(products);
    } catch (e) {
      res.status(500).send('Something went wrong');
    }
    return res.status(200).send('This is unrechable');
  });
};
