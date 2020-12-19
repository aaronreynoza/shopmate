interface ConfigType {
  http: {
    HOST: string,
    PORT: number,
  },
  database: DatabaseType,
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

export { ConfigType, DatabaseType, ConnectionType };
