interface ConfigType {
  http: {
    HOST: string,
    PORT: number,
  },
  database: DatabaseType,
  jwtSeed:string,
  algorithm:string,
  emailApp:string,
  passwordEmail:string
  emailService:string,
  hostServer:string
  secureEmail:string,
  emailHost:string,
  emailPort:string

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
interface ItokenData{
  id:number,
  email:string,
  access:number
}
export { ConfigType, DatabaseType, ConnectionType , Filter, ItokenData};
