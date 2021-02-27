import Knex from 'knex';
import { ConnectionType } from '../utils/types';
import * as Logger from '../utils/logger';
import { renamedProduct, renameCategory } from '../utils/dataChanges';

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
          descripcion_categoria: description,
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
    product_image: string,
    product_discount: number,
    stock_available: number,
    category: string,
    providerName: string,
  ) {
    try {
      // the database creator doesn't know what CamelCase is. I hate you so much, Jesus.
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const categoryData = await this.getCategory(category);
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { Id_Proveedor } = await this.getProvider(providerName);
      return this.queryBuilder('producto').insert([
        {
          nombre_prod: name,
          precio_venta: price,
          descripcion: description,
          imagen: product_image,
          descuento: product_discount,
          cantidad: stock_available,
          fk_id_categoria: categoryData.category_id,
          fk_Id_proveedor: Id_Proveedor,
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
          'especificaciones' 
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
        .where({'producto.fk_id_categoria': category,})
        .andWhere('precio_venta','>',priceMin)
        .andWhere('precio_venta','<',priceMax)
        .select(
          'id_producto',
          'nombre_prod',
          'precio_venta', 
	        'nombre_categoria', 
          'especificaciones' 
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
        .where({
          'producto.nombre_prod': keyword,
        }).select(
          'id_producto',
          'nombre_prod',
          'precio_venta', 
	        'nombre_categoria', 
          'especificaciones' 
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
        .where({'nombre_prod': keyword,})
        .andWhere('precio_venta','<',priceMax)
        .andWhere('precio_venta','>',priceMin)
        .select(
          'id_producto',
          'nombre_prod',
          'precio_venta', 
	        'nombre_categoria', 
          'especificaciones' 
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

  async getProduct(product: string) {
    try {
      const products = await this.queryBuilder('producto')
        .where('nombre_prod', product).select();
      const renamedProd = this.renamedProduct(products[0]);
      return renamedProd;
    } catch (err) {
      this.log.error({ message: `Error while getting Product: ${err}` });
      throw Error(err);
    }
  }
}

export default Database;
