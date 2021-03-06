import jwt from 'jsonwebtoken';
import config from '../config';

const validateToken = (token:any) => {
  try {
    // verifica si la firma o seed no ha cambiado
    jwt.verify(token, config.jwtSeed, (error:any, authData:any) => {
      if (error) {
        return { error };
      }
      // envia la data del token verificado
      return ({
        mensaje: 'Data verificada',
        authData,
      });
    });
  } catch (e) {
    throw Error(e);
  }
};
export default validateToken;
