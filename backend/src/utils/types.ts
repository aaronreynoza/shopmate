interface ConfigType {
  http: {
    HOST: string,
    PORT: number,
  },
  DATABASE: {
    DIALECT: string,
    HOST: string,
    PORT: number,
    USER: string,
    PASSWORD: string,
    SCHEMA: string,
    POOL_MIN_SIZE: number,
    POOL_MAX_SIZE: number,
    ACQUIRE_TIMEOUT_MILLIS: number,
    CREATE_TIMEOUT_MILLIS: number,
    DESTROY_TIMEOUT_MILLIS: number,
    IDLE_TIMEOUT_MILLIS: number,
    REAP_INTERVAL_MILLIS: number,
    CREATE_RETRY_INTERVAL_MILLIS: number,
    DEBUG: boolean,
  },
}

// eslint-disable-next-line import/prefer-default-export
export { ConfigType };
