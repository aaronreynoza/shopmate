interface ConfigType {
  http: {
    HOST: string,
    PORT: number,
  },
  database: DatabaseType,
  jwtSeed:string,
  algorithm:string,
}

interface DatabaseType {
  client: string,
  connection: ConnectionType,
  pool: {
    min: number,
    max: number,
    acquireTimeoutMillis: number,
    createTimeoutMillis: number,
    destroyTimeoutMillis: number,
    idleTimeoutMillis: number,
    reapIntervalMillis: number,
    createRetryIntervalMillis: number,
  },
  debug: boolean,
}

interface ConnectionType {
  host: string,
  port: number,
  user: string,
  password: string,
  database: string,
}
interface Filter{
  price_min:number|null,
  price_max:number|null,
}
interface IdataUser{
  address:string,
  name:string,
  lastname:string,
  email:string,
  phone:string
}
export { ConfigType, DatabaseType, ConnectionType , Filter, IdataUser};
