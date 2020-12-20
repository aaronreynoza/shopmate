/* eslint-disable @typescript-eslint/naming-convention */
const renamedProduct = (product: any) => {
  const {
    id_producto,
    nombre_prod,
    precio_venta,
    descripcion,
    imagen,
    descuento,
    cantidad,
    fk_id_categoria,
    fk_Id_Proveedor,
    date,
  }: {
    id_producto: string,
    nombre_prod: string,
    precio_venta: number,
    descripcion: string,
    imagen: string,
    descuento: number,
    cantidad: number,
    fk_id_categoria: number,
    fk_Id_Proveedor: number,
    date: string
  } = product;
  const rename = {
    product_id: id_producto,
    name: nombre_prod,
    price: precio_venta,
    product_image: imagen,
    product_discount: descuento,
    stock_available: cantidad,
    description: descripcion,
    categoryId: fk_id_categoria,
    providerId: fk_Id_Proveedor,
    date,
  };
  return rename;
};

const renameCategory = (category: any) => {
  const {
    id_categoria,
    nombre_categoria,
    icon,
    estado,
    descripcion_categoria,
  }: {
    id_categoria: number,
    nombre_categoria: string,
    icon: string,
    estado: number,
    descripcion_categoria: string,
  } = category;
  return {
    category_id: id_categoria,
    name: nombre_categoria,
    icon,
    active: estado,
    description: descripcion_categoria,
  };
};

export { renamedProduct, renameCategory };
