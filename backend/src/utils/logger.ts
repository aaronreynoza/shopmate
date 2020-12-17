import bunyan from 'bunyan';

let instance: bunyan;

const create = () => {
  instance = bunyan.createLogger({ name: 'Shopmate-System-API' });

  return instance;
};

const getInstance = () => instance;

export {
  create,
  getInstance,
};
