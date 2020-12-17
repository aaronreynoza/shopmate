import bunyan from 'bunyan';

let instance: bunyan;

const createLogger = () => {
  instance = bunyan.createLogger({ name: 'Shopmate-System-API' });

  return instance;
};

const getInstance = () => instance;

export {
  createLogger,
  getInstance,
};
