/* eslint-disable @typescript-eslint/naming-convention */
const renamedProduct = (product: any) => {
  const {
    id_producto,
    nombre_prod,
    precio_venta,
    descripcion,
    imagen,
    fk_id_categoria,
    fk_Id_Proveedor,
  }: {
    id_producto: string,
    nombre_prod: string,
    precio_venta: number,
    descripcion: string,
    imagen: string,
    fk_id_categoria: number,
    fk_Id_Proveedor: number,
  } = product;
  const rename = {
    product_id: id_producto,
    name: nombre_prod,
    price: precio_venta,
    description: descripcion,
    product_image: imagen,
    categoryId: fk_id_categoria,
    providerId: fk_Id_Proveedor,
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
    categoryId: id_categoria,
    name: nombre_categoria,
    icon,
    active: estado,
    descriptions: descripcion_categoria,
  };
};

const renameInventory = (inventory: any) => ({
  quantity: inventory.cantidad,
  idProduct: inventory.fk_id_producto,
  idOffice: inventory.fk_id_sucursal,
});

export { renamedProduct, renameCategory, renameInventory };
