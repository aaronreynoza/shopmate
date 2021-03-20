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
interface IResponse{
  status:number,
  data:any,
  message:string
}
interface IrequestDetail{
  idProducto:number,
  productQuatity:number,
  productPrice:number
}
interface IdataRequest{
  idRequest:string,
  imageComp:string,
  dateTime:string,
  branchOfficeId:number,
  typeOfPurchase:number,
  deliveryType:number,
  deliveryTypeName:string,
  bankOfTheStore:string,
  accountNumberStore:string,
  customerAccount:string,
  bankAccountHolder:string,
  depositNumber:string,
  amount:number,
  concept:string,
  requestDetail:any,
  state:number,
  statusName:string,
  branchOffice:string,

}
interface IdataProducto{
  idProd:number,
  total:number,
  unitPrice:number,
  name:string,
  specification:any,
  image:string,
  amountProduct:string
}
export { ConfigType, DatabaseType, ConnectionType , Filter, ItokenData,IResponse,IrequestDetail,IdataRequest,IdataProducto};
