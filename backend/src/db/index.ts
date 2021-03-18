import Knex from 'knex';
import { ConnectionType } from '../utils/types';
import * as Logger from '../utils/logger';
import { renamedProduct, renameCategory } from '../utils/dataChanges';
import { threadId } from 'worker_threads';

/**
 * Abstracts operations against the database
 */
class Database {
  config: any;

  renameCategory: any;

  renamedProduct: any;

  queryBuilder: any;

  log: any;

  constructor(config: ConnectionType) {
    this.config = config;
    this.renamedProduct = renamedProduct;
    this.renameCategory = renameCategory;
    this.log = Logger.getInstance();
  }

  /**
     * Connects to the database and returns a self reference
     *
     * @returns {promise}
     */
  async connect() {
    this.queryBuilder = Knex({ client: 'mysql2', connection: this.config });

    return this;
  }

  /**
     * Check whether the database connection has basic functionality
     *
     * @returns {boolean}
     */
  async isConnected() {
    try {
      const result = await this.queryBuilder.raw('SELECT 1 + 1 AS result');
      if (result) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  async insertCategory(name: string, description: string, icon: string, state: string) {
    try {
      return this.queryBuilder('categoria').insert([
        {
          nombre_categoria: name,
          descripcion_cat: description,
          icon,
          estado: state,  
        },
      ]);
    } catch (err) {
      this.log.error({ message: `Error while inserting Category: ${err}` });
      throw Error(err);
    }
  }

  async getCategories() {
    try {
      const categories = await this.queryBuilder('categoria').select();
      const renamed = categories.map((category: any) => this.renameCategory(category));
      return renamed;
    } catch (err) {
      this.log.error({ message: `Error while getting categoria: ${err}` });
      throw Error(err);
    }
  }

  async getCategory(category: string) {
    try {
      const categories = await this.queryBuilder('categoria')
        .where('nombre_categoria', category).select();
        const newCategory = this.renameCategory(categories[0]);
      return newCategory;
    } catch (err) {
      this.log.error({ message: `Error while getting Categories: ${err}` });
      throw Error(err);
    }
  }

  async insertProvider(name: string, phone: string, email: string) {
    try {
      return this.queryBuilder('proveedor').insert([
        {
          Nombre_Prov: name,
          Telefono_Prov: phone,
          Email_Prov: email,
        },
      ]);
    } catch (err) {
      this.log.error({ message: `Error while inserting Provider: ${err}` });
      throw Error(err);
    }
  }

  async getProviders() {
    try {
      return this.queryBuilder('proveedor').select();
    } catch (err) {
      this.log.error({ message: `Error while getting Providers: ${err}` });
      throw Error(err);
    }
  }

  async getProvider(provider: string) {
    try {
      const categories = await this.queryBuilder('proveedor')
        .where('Nombre_Prov', provider).select();
      return categories[0];
    } catch (err) {
      this.log.error({ message: `Error while getting Provider: ${err}` });
      throw Error(err);
    }
  }

  async insertProduct(
    name: string,
    price: number,
    description: string,
    imagen: string,
    idcategory: number,
    idproviderName: number,
  ) {
    try {
      // the database creator doesn't know what CamelCase is. I hate you so much, Jesus.
      // eslint-disable-next-line @typescript-eslint/naming-convention
      // eslint-disable-next-line @typescript-eslint/naming-convention}
      return this.queryBuilder('producto').insert([
        {
          nombre_prod: name,
          precio_venta: price,
          especificaciones: description,
          imagen: imagen,
          fk_id_categoria: idcategory,
          fk_Id_proveedor: idproviderName,
        },
      ]);
    } catch (err) {
      throw Error(err);
    }
  }
  
  async getSearchProductCategory(category:number){
    try{
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .where({
          'producto.fk_id_categoria': category,
        }).select(
          'id_producto',
          'nombre_prod',
          'precio_venta', 
	        'nombre_categoria', 
          'especificaciones',
          'imagen'
        );
      return prodArray;
    }catch(Err){
      console.log(Err);
    }
  }

  async getSearchProductCategoryFilter(category:number, priceMin:number, priceMax:number){
    try{
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .where({'producto.fk_id_categoria': category})
        .andWhere('precio_venta','>',priceMin)
        .andWhere('precio_venta','<',priceMax)
        .select(
          'id_producto',
          'nombre_prod',
          'precio_venta', 
	        'nombre_categoria', 
          'especificaciones',
          'imagen'
        );
      return prodArray;
    }catch(Err){
      console.log(Err);
    }
  }

  async getSearchProductCategoryFilterMin(category:number, priceMin:number){
    try{
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .where({'producto.fk_id_categoria': category})
        .andWhere('precio_venta','>',priceMin)
        .select(
          'id_producto',
          'nombre_prod',
          'precio_venta', 
	        'nombre_categoria', 
          'especificaciones',
          'imagen'
        );
      return prodArray;
    }catch(Err){
      console.log(Err);
    }
  }

  async getSearchProductCategoryFilterMax(category:number, priceMax:number){
    try{
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .where({'producto.fk_id_categoria': category})
        .andWhere('precio_venta','<',priceMax)
        .select(
          'id_producto',
          'nombre_prod',
          'precio_venta', 
	        'nombre_categoria', 
          'especificaciones',
          'imagen'
        );
      return prodArray;
    }catch(Err){
      console.log(Err);
    }
  }

  async getSearchProductKeyword(keyword:string){
    try{
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .where(
          this.queryBuilder.raw('MATCH(nombre_prod)  AGAINST(?)', keyword)
        ).select(
            'id_producto',
            'nombre_prod',
            'precio_venta', 
	          'nombre_categoria', 
            'especificaciones',
            'imagen'
        );
      return prodArray;
    }catch(err){
      this.log.error({ message: `Error while getting Products: ${err}` });
      throw Error(err);
    }
  }

  async getSearchProductKeywordFilter(keyword:string, priceMin:number, priceMax:number){
    try{
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .where(
          this.queryBuilder.raw('MATCH(nombre_prod)  AGAINST(?)', keyword)
        ).andWhere('precio_venta','<',priceMax)
        .andWhere('precio_venta','>',priceMin)
        .select(
            'id_producto',
            'nombre_prod',
            'precio_venta', 
	          'nombre_categoria', 
            'especificaciones',
            'imagen'
        );
      return prodArray;
    }catch(err){
      this.log.error({ message: `Error while getting Products: ${err}` });
      throw Error(err);
    }
  }

  async getSearchProductKeywordFilterMin(keyword:string, priceMin:number){
    try{
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .where(
          this.queryBuilder.raw('MATCH(nombre_prod)  AGAINST(?)', keyword)
        ).andWhere('precio_venta','>',priceMin)
        .select(
            'id_producto',
            'nombre_prod',
            'precio_venta', 
	          'nombre_categoria', 
            'especificaciones',
            'imagen'
        );
      return prodArray;
    }catch(err){
      this.log.error({ message: `Error while getting Products: ${err}` });
      throw Error(err);
    }
  }

  async getSearchProductKeywordFilterMax(keyword:string, priceMax:number){
    try{
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .where(
          this.queryBuilder.raw('MATCH(nombre_prod)  AGAINST(?)', keyword)
        ).andWhere('precio_venta','<',priceMax)
        .select(
            'id_producto',
            'nombre_prod',
            'precio_venta', 
	          'nombre_categoria', 
            'especificaciones',
            'imagen'
        );
      return prodArray;
    }catch(err){
      this.log.error({ message: `Error while getting Products: ${err}` });
      throw Error(err);
    }
  }

  async getProducts() {
    try {
      const productsArray = await this.queryBuilder('producto').select();
      return productsArray;
    } catch (err) {
      this.log.error({ message: `Error while getting Products: ${err}` });
      throw Error(err);
    }
  }

  async getProduct(idProduct: number) {
    try {
      const products = await this.queryBuilder('producto')
        .where('id_producto', idProduct).select();
      return products;
    } catch (err) {
      this.log.error({ message: `Error while getting Product: ${err}` });
      throw Error(err);
    }
  }

  async insertShoppingCart(
    fecha: string,
    cantidad: number,
    fk_id_producto: string,
    fk_id_usuario: string,
  ) {
    try {
      return this.queryBuilder('carrito_compra').insert([
        {
          date: fecha,
          estado: "Pendiente",
          cantidad: cantidad,
          fk_id_producto: fk_id_producto,
          fk_id_usuario: fk_id_usuario,
        },
      ]);
    } catch (err) {
      throw Error(err);
    }
  }

  async getShoppingCart(user:number){
    try {
      const shopCartArray = await this.queryBuilder('carrito_compra')
      .where('fk_id_usuario',user)
      .select();
      return shopCartArray;
    } catch (err) {
      throw Error(err);
    }
  }

  async getShoppingCartData(id:number){
    try {
      const shopCartArray = await this.queryBuilder('carrito_compra')
      .where('id_carrito',id)
      .select();
      return shopCartArray;
    } catch (err) {
      throw Error(err);
    }
  }

  async deleteShoppingCartItem(id:number){
    try {
      const shopCartArray = await this.queryBuilder('carrito_compra')
      .where('id_carrito',id)
      .del();
      return shopCartArray;
    } catch (err) {
      throw Error(err);
    }
  }

  async loginUser(
    email: string,
    password: string,
  ) {
    try {
      const userData = await this.queryBuilder('usuario')
      .select('id_usuario','email_usu','fk_id_tipo')
      .where('email_usu',email)
      .andWhere('clave_usu',password);
      return userData;
    } catch (err) {
      throw Error(err);
    }
  }

  async dataUserFront(email:string){
    try {
      const dataUser = await this.queryBuilder('direccion_entrega')
      .innerJoin('usuario', 'usuario.id_usuario', '=', 'direccion_entrega.fk_id_usuario')
      .select()
      .where('email_usu',email)
      return dataUser;
    }
    catch (e){
      throw Error(e);
    }
  }

  async dataUserAdmin(email:string){
    try {
      const dataUser = await this.queryBuilder('usuario')
      .select(
        'nombres_usuario',
        'primer_apellido_usu',
        'phone',
        'email_usu',

      )
      .where('email_usu',email)
      return dataUser;
    }
    catch (e){
      throw Error(e);
    }
  }

  async emailValidator(email:string){
    try {
      var mssg:boolean = false;
      const datEmail = await this.queryBuilder('usuario')
      .select()
      .where('email_usu',email)
      if (datEmail.length >= 1) {
        mssg = true;
      } else {
        mssg = false;
      }
      return mssg;
    } catch (e){
      throw Error(e);
    }
  }

  async registerClient(
    names:string,
    lastName:string,
    secondLastName:string,
    phone:string,
    email:string,
    password:string
  ){
    try{
      return this.queryBuilder('usuario').insert([
        {
          nombres_usuario:names,
          primer_apellido_usu:lastName,
          segundo_apellido_usu:secondLastName,
          phone:phone,
          email_usu:email,
          clave_usu:password,
          validacion:false,
          estado:1,
          fk_id_tipo:4
        }
      ])
    } catch(e) {
      throw Error(e);
    }
  }

  async verification(
    id:string,
    email:string
  ){
    try{
      return this.queryBuilder('verificacion').insert([
        {
          id_verificacion:id,
          email:email,
        }
      ]);
    } catch (e) {
      throw Error(e);
    }
  }

  async verifyUserToken(token:string){
    try{
      const email = await this.queryBuilder('verificacion')
      .where('id_verificacion',token)
      .select('email');
      return email;
    } catch(e) {
      throw Error(e);
    }
  }

  async idUser(email:string){
    try{
      const userData = await this.queryBuilder('usuario')
      .select('id_usuario')
      .where('email_usu',email)
      return userData;
    } catch(e) {
      throw Error(e);
    }
  }

  async verifyUser(idUsu:string){
    try{
       return await this.queryBuilder('usuario')
      .where('id_usuario',idUsu)
      .update(
        {
          validacion:1
        }
      );
    } catch(e) {
      throw Error(e);
    }
  }

  async verifuProductQuantity(idProd:number, idBranchOffice:number){
    try{
      const quantityProduct = this.queryBuilder('inventario')
    .where('fk_id_producto',idProd)
    .andWhere('fk_id_sucursal',idBranchOffice)
    .select()
    return (quantityProduct)
    } catch(e) {
      throw Error(e);
    }
  }

  async shoppingUpdateProduct(idProd:number,quantity:number){
    try{
      return await this.queryBuilder('inventario')
      .where('fk_id_producto',idProd)
      .update('cantidad',quantity)
    } catch(e){
      throw Error(e);
    }
  }

  async insertRequestHeader(
    idRequest:string, 
    date:string, 
    deliveryType:number, 
    bank:string,
    accountNumberStore:string,
    typeOfPurchase:number,
    email:string
    ){
    try{
      const estado:number = 1;
      const dat = await this.idUser(email);
      console.log(dat);
      const id = dat[0].id_usuario;
      return await this.queryBuilder('encabezado_solicitud')
      .insert({
        id_encabez:idRequest,
        fecha_sol:date,
        estado:estado,
        tipo_compra:typeOfPurchase,
        banco:bank,
        numero_cuenta:accountNumberStore,
        tipo_entrega:deliveryType,
        fk_id_usuario:id
      })
    } catch(e) {
      throw Error(e)
    }
  }

  async insertPurchaseDetail(
    idProd:number, 
    quantity:number, 
    totalPrice:number,
    idRequest:string
    ){
    try{
      return await this.queryBuilder('detalle_solicitud')
      .insert([{
        cantidad:quantity,
        total_pagar:totalPrice,
        fk_id_encabez:idRequest,
        fk_id_producto:idProd,
      }])
    } catch(e) {
      throw Error(e)
    }
  }

  async insertPaymentDetail(
    accountHolder:string,
    accountNumber:string,
    depositNumber:string,
    amoun:number, 
    concept:string,
    idPhotoName:string,
    idRequest:string){
    try{
      return this.queryBuilder('detalle_pago')
      .insert({
        cuenta_usuario:accountHolder,
        titular:accountNumber,
        numero_deposito:depositNumber,
        monto:amoun,
        concept:concept,
        foto_comp:idPhotoName,
        fk_id_encabez:idRequest
      })
    } catch(e) {
      throw Error(e)
    }
  }

}

export default Database;
