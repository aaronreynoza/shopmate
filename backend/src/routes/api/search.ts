/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from 'express';
import * as Logger from '../../utils/logger';
import {Filter} from '../../utils/types';
const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {

  router.post('/search', async (req, res) => {
    const {
      type_search,
      keyword,
      category,
      filter,
    }:{
      type_search:string,
      keyword:string,
      category:number,
      filter: Filter | null,
    } = req.body;
    if (
      (typeof type_search !== 'string')
      || (typeof keyword !== 'string')
      || (typeof category !== 'number')
    ) {
        return res.status(400).send('Wrong type of data or missing fields');
    }
    switch(type_search){
      case "category":
        if(filter !== null){
          const products = await routesContext.db.getSearchProductCategoryFilter(category, filter.price_min,filter.price_max);
          res.status(200).send(products);
        }else{
          const products = await routesContext.db.getSearchProductCategory(category);
          res.status(200).send(products);
        }
        break;
      case "keyword":
        if(filter !== null){
          const products = await routesContext.db.getSearchProductKeywordFilter(keyword, filter.price_min,filter.price_max);
          res.status(200).send(products);
        }else{
          const products = await routesContext.db.getSearchProductKeyword(keyword);
          res.status(200).send(products);
        }
        break;
    }
  });

};