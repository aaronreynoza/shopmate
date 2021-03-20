import Knex from 'knex';
import { ConnectionType } from '../utils/types';
import * as Logger from '../utils/logger';
import { renamedProduct, renameCategory, renameInventory } from '../utils/dataChanges';

/**
 * Abstracts operations against the database
 */
class Database {
  config: any;

  renameCategory: any;

  renamedProduct: any;

  renameInventory: any;

  queryBuilder: any;

  log: any;

  constructor(config: ConnectionType) {
    this.config = config;
    this.renamedProduct = renamedProduct;
    this.renameCategory = renameCategory;
    this.renameInventory = renameInventory;
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
        .where('id_categoria', category).select();
      const newCategory = this.renameCategory(categories[0]);
      return newCategory;
    } catch (err) {
      this.log.error({ message: `Error while getting Categories: ${err}` });
      throw Error(err);
    }
  }

  async insertUserType(name: string, description: string) {
    try {
      return this.queryBuilder('tipo_usuario').insert([
        {
          nombre_tu: name,
          descripcion: description,
        },
      ]);
    } catch (err) {
      this.log.error({ message: `Error while inserting User Type: ${err}` });
      throw Error(err);
    }
  }

  async getUserTypes() {
    try {
      const userTypes = await this.queryBuilder('tipo_usuario').select();
      const renamed = userTypes.map((uType: any) => ({
        name: uType.nombre_tu,
        description: uType.descripcion,
      }));
      return renamed;
    } catch (err) {
      this.log.error({ message: `Error while getting user types: ${err}` });
      throw Error(err);
    }
  }

  async getUserType(category: string) {
    try {
      const userType = await this.queryBuilder('tipo_usuario')
        .where('id_tipo', category).select('nombre_tu', 'descripcion');
      return userType;
    } catch (err) {
      this.log.error({ message: `Error while getting Categories: ${err}` });
      throw Error(err);
    }
  }

  async insertInventory(quantity: string, idProduct: string, idOffice: string) {
    try {
      return this.queryBuilder('inventario').insert([
        {
          cantidad: quantity,
          fk_id_producto: idProduct,
          fk_id_sucursal: idOffice,
        },
      ]);
    } catch (err) {
      this.log.error({ message: `Error while inserting Category: ${err}` });
      throw Error(err);
    }
  }

  async getInventories() {
    try {
      const inventories = await this.queryBuilder('inventario').select();
      const renamed = inventories.map((category: any) => this.renameInventory(category));
      return renamed;
    } catch (err) {
      this.log.error({ message: `Error while getting inventories: ${err}` });
      throw Error(err);
    }
  }

  async getInventory(IdProduct: string) {
    try {
      const inventory = await this.queryBuilder('inventario')
        .where('fk_id_producto', IdProduct).select();
      return this.renameInventory(inventory[0]);
    } catch (err) {
      this.log.error({ message: `Error while getting inventory: ${err}` });
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

  async insertOffice(name: string, state: string) {
    try {
      return this.queryBuilder('sucursal').insert([
        {
          nombre_sucursal: name,
          estado: state,
          fecha_creacion: new Date(),
        },
      ]);
    } catch (err) {
      this.log.error({ message: `Error while inserting Office: ${err}` });
      throw Error(err);
    }
  }

  async getOffices() {
    try {
      const offices = await this.queryBuilder('sucursal').select();
      return offices.map((office: any) => ({
        name: office.nombre_sucursal,
        state: office.estado,
        date: office.fecha_creacion,
      }));
    } catch (err) {
      this.log.error({ message: `Error while getting Offices: ${err}` });
      throw Error(err);
    }
  }

  async getOffice(officeId: string) {
    try {
      const office = await this.queryBuilder('sucursal')
        .where('id_sucursal', officeId).select();
      return {
        name: office[0].nombre_sucursal,
        state: office[0].estado,
        date: office.fecha_creacion,
      };
    } catch (err) {
      this.log.error({ message: `Error while getting Office: ${err}` });
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
      return this.queryBuilder('producto').insert([
        {
          nombre_prod: name,
          precio_venta: price,
          especificaciones: description,
          imagen,
          fk_id_categoria: idcategory,
          fk_Id_proveedor: idproviderName,
        },
      ]);
    } catch (err) {
      throw Error(err);
    }
  }

  async getSearchProductCategory(category:number) {
    try {
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .innerJoin('inventario', 'producto.id_producto', '=', 'inventario.fk_id_producto')
        .where({
          'producto.fk_id_categoria': category,
        })
        .select(
          'id_producto',
          'nombre_prod',
          'precio_venta',
          'nombre_categoria',
          'especificaciones',
          'imagen',
          'cantidad',
        );
      return prodArray;
    } catch (Err) {
      this.log.error({ message: Err });
    }
    return new Error('failed to Search for Product');
  }

  async getSearchProductCategoryFilter(category:number, priceMin:number, priceMax:number) {
    try {
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .innerJoin('inventario', 'producto.id_producto', '=', 'inventario.fk_id_producto')
        .where({ 'producto.fk_id_categoria': category })
        .andWhere('precio_venta', '>', priceMin)
        .andWhere('precio_venta', '<', priceMax)
        .select(
          'id_producto',
          'nombre_prod',
          'precio_venta',
          'nombre_categoria',
          'especificaciones',
          'imagen',
          'cantidad',
        );
      return prodArray;
    } catch (Err) {
      this.log.error({ message: Err });
    }
    return new Error('failed to Search for Product');
  }

  async getSearchProductCategoryFilterMin(category:number, priceMin:number) {
    try {
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .innerJoin('inventario', 'producto.id_producto', '=', 'inventario.fk_id_producto')
        .where({ 'producto.fk_id_categoria': category })
        .andWhere('precio_venta', '>', priceMin)
        .select(
          'id_producto',
          'nombre_prod',
          'precio_venta',
          'nombre_categoria',
          'especificaciones',
          'imagen',
          'cantidad',
        );
      return prodArray;
    } catch (Err) {
      this.log.error({ message: Err });
    }
    return new Error('failed to Search for Product');
  }

  async getSearchProductCategoryFilterMax(category:number, priceMax:number) {
    try {
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .innerJoin('inventario', 'producto.id_producto', '=', 'inventario.fk_id_producto')
        .where({ 'producto.fk_id_categoria': category })
        .andWhere('precio_venta', '<', priceMax)
        .select(
          'id_producto',
          'nombre_prod',
          'precio_venta',
          'nombre_categoria',
          'especificaciones',
          'imagen',
          'cantidad',
        );
      return prodArray;
    } catch (Err) {
      this.log.error({ message: Err });
    }
    return new Error('failed to Search for Product');
  }

  async getSearchProductKeyword(keyword:string) {
    try {
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .innerJoin('inventario', 'producto.id_producto', '=', 'inventario.fk_id_producto')
        .where(
          this.queryBuilder.raw('MATCH(nombre_prod)  AGAINST(?)', keyword),
        )
        .select(
          'id_producto',
          'nombre_prod',
          'precio_venta',
          'nombre_categoria',
          'especificaciones',
          'imagen',
          'cantidad',
        );
      return prodArray;
    } catch (err) {
      this.log.error({ message: `Error while getting Products: ${err}` });
      throw Error(err);
    }
  }

  async getSearchProductKeywordFilter(keyword:string, priceMin:number, priceMax:number) {
    try {
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .innerJoin('inventario', 'producto.id_producto', '=', 'inventario.fk_id_producto')
        .where(
          this.queryBuilder.raw('MATCH(nombre_prod)  AGAINST(?)', keyword),
        )
        .andWhere('precio_venta', '<', priceMax)
        .andWhere('precio_venta', '>', priceMin)
        .select(
          'id_producto',
          'nombre_prod',
          'precio_venta',
          'nombre_categoria',
          'especificaciones',
          'imagen',
          'cantidad',
        );
      return prodArray;
    } catch (err) {
      this.log.error({ message: `Error while getting Products: ${err}` });
      throw Error(err);
    }
  }

  async getSearchProductKeywordFilterMin(keyword:string, priceMin:number) {
    console.log('---------------');
    console.log(priceMin, keyword);
    console.log('---------------');
    try {
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .innerJoin('inventario', 'producto.id_producto', '=', 'inventario.fk_id_producto')
        .where(
          this.queryBuilder.raw('MATCH(nombre_prod)  AGAINST(?)', keyword),
        )
        .andWhere('precio_venta', '>', priceMin)
        .select(
          'id_producto',
          'nombre_prod',
          'precio_venta',
          'nombre_categoria',
          'especificaciones',
          'imagen',
          'cantidad',
        );
      return prodArray;
    } catch (err) {
      this.log.error({ message: `Error while getting Products: ${err}` });
      throw Error(err);
    }
  }

  async getSearchProductKeywordFilterMax(keyword:string, priceMax:number) {
    try {
      const prodArray = await this.queryBuilder.table('producto')
        .innerJoin('categoria', 'producto.fk_id_categoria', '=', 'categoria.id_categoria')
        .innerJoin('inventario', 'producto.id_producto', '=', 'inventario.fk_id_producto')
        .where(
          this.queryBuilder.raw('MATCH(nombre_prod)  AGAINST(?)', keyword),
        )
        .andWhere('precio_venta', '<', priceMax)
        .select(
          'id_producto',
          'nombre_prod',
          'precio_venta',
          'nombre_categoria',
          'especificaciones',
          'imagen',
          'cantidad',
        );
      return prodArray;
    } catch (err) {
      this.log.error({ message: `Error while getting Products: ${err}` });
      throw Error(err);
    }
  }

  async getProducts() {
    try {
      const productsArray = await this.queryBuilder.raw('select * from producto as p inner join inventario where fk_id_producto = p.id_producto;');
      return productsArray;
    } catch (err) {
      this.log.error({ message: `Error while getting Products: ${err}` });
      throw Error(err);
    }
  }

  async getProduct(idProduct: number) {
    try {
      const products = await this.queryBuilder.raw(`select * from producto as p inner join inventario where fk_id_producto = p.id_producto AND p.id_producto = ${idProduct}`);
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
          estado: 'Pendiente',
          cantidad,
          fk_id_producto,
          fk_id_usuario,
        },
      ]);
    } catch (err) {
      throw Error(err);
    }
  }

  async getShoppingCart(user:number) {
    try {
      const shopCartArray = await this.queryBuilder('carrito_compra')
        .where('fk_id_usuario', user)
        .select();
      return shopCartArray;
    } catch (err) {
      throw Error(err);
    }
  }

  async getShoppingCartData(id:number) {
    try {
      const shopCartArray = await this.queryBuilder('carrito_compra')
        .where('id_carrito', id)
        .select();
      return shopCartArray;
    } catch (err) {
      throw Error(err);
    }
  }

  async deleteShoppingCartItem(id:number) {
    try {
      const shopCartArray = await this.queryBuilder('carrito_compra')
        .where('id_carrito', id)
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
        .select('id_usuario', 'email_usu', 'fk_id_tipo')
        .where('email_usu', email)
        .andWhere('clave_usu', password);
      return userData;
    } catch (err) {
      throw Error(err);
    }
  }

  async dataUserFront(email:string) {
    try {
      const dataUser = await this.queryBuilder('direccion_entrega')
        .innerJoin('usuario', 'usuario.id_usuario', '=', 'direccion_entrega.fk_id_usuario')
        .select()
        .where('email_usu', email);
      return dataUser;
    } catch (e) {
      throw Error(e);
    }
  }

  async dataUserAdmin(email:string) {
    try {
      const dataUser = await this.queryBuilder('usuario')
        .select(
          'nombres_usuario',
          'primer_apellido_usu',
          'phone',
          'email_usu',

        )
        .where('email_usu', email);
      return dataUser;
    } catch (e) {
      throw Error(e);
    }
  }

  async emailValidator(email:string) {
    try {
      let mssg:boolean = false;
      const datEmail = await this.queryBuilder('usuario')
        .select()
        .where('email_usu', email);
      if (datEmail.length >= 1) {
        mssg = true;
      } else {
        mssg = false;
      }
      return mssg;
    } catch (e) {
      throw Error(e);
    }
  }

  async registerClient(
    names:string,
    lastName:string,
    secondLastName:string,
    phone:string,
    email:string,
    password:string,
  ) {
    try {
      return this.queryBuilder('usuario').insert([
        {
          nombres_usuario: names,
          primer_apellido_usu: lastName,
          segundo_apellido_usu: secondLastName,
          phone,
          email_usu: email,
          clave_usu: password,
          validacion: 1,
          estado: 1,
          fk_id_tipo: 4,
        },
      ]);
    } catch (e) {
      throw Error(e);
    }
  }

  async registerUser(
    names:string,
    lastName:string,
    secondLastName:string,
    phone:string,
    email:string,
    password:string,
    userType:string,
  ) {
    try {
      return this.queryBuilder('usuario').insert([
        {
          nombres_usuario: names,
          primer_apellido_usu: lastName,
          segundo_apellido_usu: secondLastName,
          phone,
          email_usu: email,
          clave_usu: password,
          validacion: true,
          estado: 1,
          fk_id_tipo: userType,
        },
      ]);
    } catch (e) {
      throw Error(e);
    }
  }

  async verification(
    id:string,
    email:string,
  ) {
    try {
      return this.queryBuilder('verificacion').insert([
        {
          id_verificacion: id,
          email,
        },
      ]);
    } catch (e) {
      throw Error(e);
    }
  }

  async verifyUserToken(token:string) {
    try {
      const email = await this.queryBuilder('verificacion')
        .where('id_verificacion', token)
        .select('email');
      return email;
    } catch (e) {
      throw Error(e);
    }
  }

  async idUser(email:string) {
    try {
      const userData = await this.queryBuilder('usuario')
        .select('id_usuario')
        .where('email_usu', email);
      return userData;
    } catch (e) {
      throw Error(e);
    }
  }

  async verifyUser(idUsu:string) {
    try {
      return await this.queryBuilder('usuario')
        .where('id_usuario', idUsu)
        .update(
          {
            validacion: 1,
          },
        );
    } catch (e) {
      throw Error(e);
    }
  }

  async verifyProductQuantity(idProd:number, idBranchOffice:number) {
    try {
      const quantityProduct = this.queryBuilder('inventario')
        .where('fk_id_producto', idProd)
        .andWhere('fk_id_sucursal', idBranchOffice)
        .select();
      return (quantityProduct);
    } catch (e) {
      throw Error(e);
    }
  }

  async shoppingUpdateProduct(idProd:number, quantity:number) {
    try {
      return await this.queryBuilder('inventario')
        .where('fk_id_producto', idProd)
        .update('cantidad', quantity);
    } catch (e) {
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
    email:string,
    branchOfficeId:number,
  ) {
    try {
      const estado:number = 1;
      const dat = await this.idUser(email);
      console.log(dat);
      const id = dat[0].id_usuario;
      return await this.queryBuilder('encabezado_solicitud')
        .insert({
          id_encabez: idRequest,
          fecha_sol: date,
          estado,
          tipo_compra: typeOfPurchase,
          banco: bank,
          numero_cuenta: accountNumberStore,
          tipo_entrega: deliveryType,
          fk_id_usuario: id,
          fk_id_sucursal: branchOfficeId,
        });
    } catch (e) {
      throw Error(e);
    }
  }

  async insertPurchaseDetail(
    idProd:number,
    quantity:number,
    totalPrice:number,
    idRequest:string,
  ) {
    try {
      return await this.queryBuilder('detalle_solicitud')
        .insert([{
          cantidad: quantity,
          total_pagar: totalPrice,
          fk_id_encabez: idRequest,
          fk_id_producto: idProd,
        }]);
    } catch (e) {
      throw Error(e);
    }
  }

  async insertPaymentDetail(
    accountHolder:string,
    accountNumber:string,
    depositNumber:string,
    amount:number,
    concept:string,
    idPhotoName:string,
    idRequest:string,
  ) {
    try {
      return this.queryBuilder('detalle_pago')
        .insert({
          cuenta_usuario: accountHolder,
          titular: accountNumber,
          numero_deposito: depositNumber,
          monto: amount,
          concept,
          foto_comp: idPhotoName,
          fk_id_encabez: idRequest,
        });
    } catch (e) {
      throw Error(e);
    }
  }

  async approvelRequest(idRequest:string, status:number) {
    try {
      return await this.queryBuilder('encabezado_solicitud')
        .where('id_encabez', idRequest)
        .update('estado', status);
    } catch (e) {
      throw Error(e);
    }
  }

  async getShoppingRequestData() {
    try {
      return await this.queryBuilder('encabezado_solicitud')
        .select();
    } catch (e) {
      throw Error(e);
    }
  }

  async getShoppingRequestStatus(idRequest:string) {
    try {
      const requestStatus = await this.queryBuilder('encabezado_solicitud')
        .select('estado')
        .where('id_encabez', idRequest);
      return requestStatus[0].estado;
    } catch (e) {
      throw Error(e);
    }
  }

  async getPaymentDetailData(idRequest:string) {
    try {
      const payment = await this.queryBuilder('detalle_pago')
        .select()
        .where('fk_id_encabez', idRequest);
      return payment;
    } catch (e) {
      throw Error(e);
    }
  }

  async getShoppingDetailData(idRequest:string) {
    try {
      const shopingDetal = await this.queryBuilder('detalle_solicitud')
        .join('producto', 'producto.id_producto', '=', 'detalle_solicitud.fk_id_producto')
        .where('fk_id_encabez', idRequest)
        .select(
          'id_producto',
          'cantidad',
          'precio_venta',
          'total_pagar',
          'especificaciones',
          'nombre_prod',
          'imagen',
        );
      return shopingDetal;
    } catch (e) {
      throw Error(e);
    }
  }

  async getIdUserFromIdRequest(idRequest:string) {
    try {
      const idUser = await this.queryBuilder('encabezado_solicitud')
        .select('fk_id_usuario', 'fk_id_sucursal')
        .where('id_encabez', idRequest);
      return idUser;
    } catch (e) {
      throw Error(e);
    }
  }

  async getEmailFromIdUser(idUser:string) {
    try {
      const email = await this.queryBuilder('usuario')
        .select('email_usu')
        .where('id_usuario', idUser);
      return email;
    } catch (e) {
      throw Error(e);
    }
  }

  async getRequestHeaderForUser(id:string) {
    try {
      const header = await this.queryBuilder('encabezado_solicitud')
        .select()
        .where('fk_id_usuario', id);
      return header;
    } catch (e) {
      throw Error(e);
    }
  }

  async getIdUserForEmail(email:string) {
    try {
      const id = await this.queryBuilder('usuario')
        .select('id_usuario')
        .where('email_usu', email);
      return id;
    } catch (e) {
      throw Error(e);
    }
  }

  async getBranchoOfficeName(bO:number) {
    try {
      const name = await this.queryBuilder('sucursal')
        .where('id_sucursal', bO).select();
      return name;
    } catch (e) {
      throw Error(e);
    }
  }
}

export default Database;
