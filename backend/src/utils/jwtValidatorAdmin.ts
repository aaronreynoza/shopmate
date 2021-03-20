import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

function verifyTokenAdmin(req:Request, res:Response, next:NextFunction) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    const payload:any = jwt.verify(bearerToken, config.jwtSeed, (error, authData) => {
      if (error) {
        return res.status(400).json(
          {
            statos: 400,
            data: error,
            message: 'Invalid Token',
          },
        );
      }
      return authData;
    });
    console.log(payload.user1[0].fk_id_tipo);
    if (payload.user1[0].fk_id_tipo !== 1) {
      return res.status(400).json(
        {
          statos: 400,
          data: [],
          message: 'Invalid User for this endpoint',
        },
      );
    }
    next();
  }
  return res.status(500).json(
    {
      statos: 500,
      data: [],
      message: 'Invalid Token',
    },
  );
}
export default verifyTokenAdmin;
