import { Router } from 'express';
import * as Logger from '../../utils/logger';
import transporter from '../../utils/transporter'
import contentHTML from '../../utils/htmlEmailResponse'
const log = Logger.getInstance();

// eslint-disable-next-line import/prefer-default-export
export const handler = (router: Router, routesContext: any) => {
  router.get('/requestUser/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    try{
      const idUser = await routesContext.db.getIdUserForEmail(userEmail);
      console.log(idUser)

      const RequesUserHeader = await routesContext.db.getRequestHeaderForUser(idUser[0].id_usuario);
      console.log(RequesUserHeader);
      //var TotalData = []
      //var requestDetailData = [];
      /* for(let i in RequesUserHeader){
        let data = await routesContext.db.getShoppingDetailData(RequesUserHeader[i].id_encabez);
        let header = RequesUserHeader[i].id_encabez;
        requestDetailData.push({header:data})
      } */
      //console.log(requestDetailData)
      
      res.status(200).json({mesagge:"Hello"});
    } catch(e) {
      throw Error(e);
    }
  });

};
