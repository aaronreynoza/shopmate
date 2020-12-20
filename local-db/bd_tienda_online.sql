#  Creado con Kata Kuntur - Modelador de Datos
#  Versión: 2.5.4
#  Sitio Web: http://katakuntur.jeanmazuelos.com/
#  Si usted encuentra algún error le agradeceriamos lo reporte en:
#  http://pm.jeanmazuelos.com/katakuntur/issues/new

#  Administrador de Base de Datos: MySQL/MariaDB
#  Diagrama: db_tienda
#  Autor: jegzstate
#  Fecha y hora: 06/11/2020 13:35:21

# GENERANDO TABLAS
CREATE TABLE `Usuario_Cliente` (
	`Id_Cliente` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador del cliente',
	`Nombres_Cli` VARCHAR(100) NOT NULL COMMENT 'Nombre o Nombres del cliente',
	`Primer_Apellido_Cli` VARCHAR(15) NOT NULL COMMENT 'Primer Apellido del cliente',
	`Segundo_Apellido_Cli` VARCHAR(15) NOT NULL COMMENT 'Segundo Apellido del cliente',
	`Email_Cli` VARCHAR(45) NOT NULL COMMENT 'email del cliente',
	`Clave_Cli` VARCHAR(100) NOT NULL COMMENT 'Clave de usuario o acceso',
	`Direccion_Cli` VARCHAR(125) NOT NULL COMMENT 'Direccion de entrega de producto',
	PRIMARY KEY(`Id_Cliente`)
) ENGINE=INNODB;
CREATE TABLE `Favoritos` (
	`Fecha_Favorito` DATE NOT NULL COMMENT 'Fecha en que se añadio el favorito',
	`Estado_Favorito` BIT NOT NULL COMMENT 'Estado Activo/Desactivado',
	`fk_Id_Cliente` INTEGER NOT NULL COMMENT 'Identificador del cliente',
	KEY(`fk_Id_Cliente`),
	`fk_id_producto` INTEGER NOT NULL COMMENT 'Identificador de producto',
	KEY(`fk_id_producto`)
) ENGINE=INNODB;
CREATE TABLE `Producto` (
	`id_producto` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador de producto',
	`nombre_prod` VARCHAR(100) NOT NULL COMMENT 'Nombre del producto',
	`precio_venta` DOUBLE NOT NULL COMMENT 'Precio del producto',
  `cantidad` INTEGER NOT NULL COMMENT 'Cantidad de unidades del producto',
  `descuento` DOUBLE NOT NULL COMMENT 'descuento del producto',
  `imagen` VARCHAR(100) NOT NULL COMMENT 'Imagen del producto',
	`descripcion` VARCHAR(150) NOT NULL COMMENT 'Descripcion del producto',
  `date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creacion del producto producto',
	`fk_Id_Proveedor` INTEGER NOT NULL COMMENT 'Identificador del proveedor',
	KEY(`fk_Id_Proveedor`),
	`fk_id_categoria` INTEGER NOT NULL COMMENT 'Identificador de la categoria del producto',
	KEY(`fk_id_categoria`),
	PRIMARY KEY(`id_producto`)
) ENGINE=INNODB;
CREATE TABLE `Inventario` (
	`cantidad` INTEGER NOT NULL COMMENT 'Cantidad que ingresa (Unidades del producto)',
	`fk_Id_Sucursal` INTEGER NOT NULL COMMENT 'Identificador de la sucursal',
	KEY(`fk_Id_Sucursal`),
	`fk_id_producto` INTEGER NOT NULL COMMENT 'Identificador de producto',
	KEY(`fk_id_producto`)
) ENGINE=INNODB;
CREATE TABLE `Proveedor` (
	`Id_Proveedor` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador del proveedor',
	`Nombre_Prov` VARCHAR(100) NOT NULL COMMENT 'Nombre del proveedor',
	`Telefono_Prov` VARCHAR(10) NOT NULL COMMENT 'Telefono de contacto del proveedor',
	`Email_Prov` VARCHAR(150) NOT NULL COMMENT 'Email del proveedor.',
	PRIMARY KEY(`Id_Proveedor`)
) ENGINE=INNODB;
CREATE TABLE `Sucursal` (
	`Id_Sucursal` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador de la sucursal',
	`Nombre_Sucursal` VARCHAR(100) NOT NULL COMMENT 'Nombre de la sucursal',
	`Estado` BIT NOT NULL COMMENT 'Estado del almacen Activo/Desactivado',
	`Fecha_Creacion` DATE NOT NULL COMMENT 'Fecha creacion de sucursal',
	PRIMARY KEY(`Id_Sucursal`)
) ENGINE=INNODB;
CREATE TABLE `Direccion_Almacen` (
	`id_dir_almacen` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador del almacen',
	`pais` VARCHAR(25) NOT NULL COMMENT 'Pais de procedencia del almacen',
	`departamento` VARCHAR(25) NOT NULL COMMENT 'Departamento de procedenciad del almacen',
	`municipio` VARCHAR(25) NOT NULL COMMENT 'Municipio de procedencia del almacen',
	`ciudad` VARCHAR(25) NOT NULL COMMENT 'Ciudad de procendecia del almacen',
	`direccion` VARCHAR(100) NOT NULL COMMENT 'Direccion del almacen',
	`fk_Id_Sucursal` INTEGER NOT NULL COMMENT 'Identificador de la sucursal',
	KEY(`fk_Id_Sucursal`),
	PRIMARY KEY(`id_dir_almacen`)
) ENGINE=INNODB;
CREATE TABLE `Categoria` (
	`id_categoria` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador de la categoria del producto',
	`nombre_categoria` VARCHAR(100) NOT NULL COMMENT 'Nombre de la categoria',
  `icon` VARCHAR(100) NOT NULL COMMENT 'Nombre de la categoria',
  `estado` INTEGER NOT NULL COMMENT 'Estado del producto:',
	`descripcion_categoria` VARCHAR(100) NOT NULL COMMENT 'Descripcion de la categoria',
	PRIMARY KEY(`id_categoria`)
) ENGINE=INNODB;
CREATE TABLE `Venta_Contribuyente_Encabezado` (
	`id_venta` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador de venta',
	`total` DOUBLE NOT NULL COMMENT 'Total a cancelar',
	`n_factura` VARCHAR(150) NOT NULL COMMENT 'Numero de facturacion',
	`fk_id_cliente_fact` INTEGER NOT NULL COMMENT 'Identificador cliente facturacion',
	KEY(`fk_id_cliente_fact`),
	PRIMARY KEY(`id_venta`)
) ENGINE=INNODB;
CREATE TABLE `Datos_Facturacion_Contribuyente` (
	`id_cliente_fact` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador cliente facturacion',
	`nombre` VARCHAR(100) NOT NULL COMMENT 'Nombre Contribuyente',
	`direccion` VARCHAR(150) NOT NULL COMMENT 'Direccion contribuyente',
	`departamento` VARCHAR(20) NOT NULL COMMENT 'Departamento contribuyente',
	`nit_contribuyente` VARCHAR(20) NOT NULL COMMENT 'Ni del contribuyente',
	`nrc` VARCHAR(20) NOT NULL COMMENT 'Numero de registro de declaracion de Iva',
	`Giro` VARCHAR(35) NOT NULL COMMENT 'Giro de el contribuyente',
	PRIMARY KEY(`id_cliente_fact`)
) ENGINE=INNODB;
CREATE TABLE `Detalle_Factura_COntribuyente` (
	`catidad_venta` INTEGER NOT NULL COMMENT 'Cantidad de producto',
	`descuento` FLOAT(3) NOT NULL COMMENT 'Si aplica a Descuento',
	`precio_descuento` DOUBLE NOT NULL COMMENT 'Precio del producto con descuento aplicado',
	`fecha_venta` DATE NOT NULL COMMENT 'Fecha en que se realizo la venta',
	`fk_id_producto` INTEGER NOT NULL COMMENT 'Identificador de producto',
	KEY(`fk_id_producto`),
	`fk_id_venta` INTEGER NOT NULL COMMENT 'Identificador de venta',
	KEY(`fk_id_venta`)
) ENGINE=INNODB;
CREATE TABLE `Entrada_Producto` (
	`id_entrada` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador de la entrada de producto',
	`fecha_ingreso` DATE NOT NULL COMMENT 'Fecha en que ingreso producto a bodega',
	`precio_compra` DOUBLE NOT NULL COMMENT 'Precio en que se realizo la compra del  de producto que se compro en unidproducto',
	`cantidad_compra` INTEGER NOT NULL COMMENT 'Cantidadades',
	`fk_id_producto` INTEGER NOT NULL COMMENT 'Identificador de producto',
	KEY(`fk_id_producto`),
	`fk_id_compra` INTEGER NOT NULL COMMENT 'Identificador de la compra',
	KEY(`fk_id_compra`),
	PRIMARY KEY(`id_entrada`)
) ENGINE=INNODB;
CREATE TABLE `Compra_Datos` (
	`id_compra` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador de la compra',
	`fecha_ingreso` DATE NOT NULL COMMENT 'Fecha en que se realizo la compra',
	`total_compra` DOUBLE NOT NULL COMMENT 'Total de la compra',
	`sujeta_iva` BIT NOT NULL COMMENT 'SI/NO esta sujeta a Iva',
	PRIMARY KEY(`id_compra`)
) ENGINE=INNODB;
CREATE TABLE `Venta_Consumidor_Final` (
	`id_venta` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador de venta',
	`total` DOUBLE NOT NULL COMMENT 'Total a cancelar',
	`n_factura` VARCHAR(150) NOT NULL COMMENT 'Numero de facturacion',
	PRIMARY KEY(`id_venta`)
) ENGINE=INNODB;
CREATE TABLE `Detalle_Factura` (
	`catidad_venta` INTEGER NOT NULL COMMENT 'Cantidad de producto',
	`descuento` FLOAT(3) NOT NULL COMMENT 'Si aplica a Descuento',
	`precio_descuento` DOUBLE NOT NULL COMMENT 'Precio del producto con descuento aplicado',
	`fecha_venta` DATE NOT NULL COMMENT 'Fecha en que se realizo la venta',
	`fk_id_venta` INTEGER NOT NULL COMMENT 'Identificador de venta',
	KEY(`fk_id_venta`),
	`fk_id_producto` INTEGER NOT NULL COMMENT 'Identificador de producto',
	KEY(`fk_id_producto`)
) ENGINE=INNODB;

# GENERANDO RELACIONES
ALTER TABLE `Favoritos` ADD CONSTRAINT `favoritos_usuario_cliente_fk_id_cliente` FOREIGN KEY (`fk_Id_Cliente`) REFERENCES `Usuario_Cliente`(`Id_Cliente`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `Favoritos` ADD CONSTRAINT `favoritos_producto_fk_id_producto` FOREIGN KEY (`fk_id_producto`) REFERENCES `Producto`(`id_producto`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `Producto` ADD CONSTRAINT `producto_proveedor_fk_id_proveedor` FOREIGN KEY (`fk_Id_Proveedor`) REFERENCES `Proveedor`(`Id_Proveedor`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `Producto` ADD CONSTRAINT `producto_categoria_fk_id_categoria` FOREIGN KEY (`fk_id_categoria`) REFERENCES `Categoria`(`id_categoria`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `Inventario` ADD CONSTRAINT `inventario_sucursal_fk_id_sucursal` FOREIGN KEY (`fk_Id_Sucursal`) REFERENCES `Sucursal`(`Id_Sucursal`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `Inventario` ADD CONSTRAINT `inventario_producto_fk_id_producto` FOREIGN KEY (`fk_id_producto`) REFERENCES `Producto`(`id_producto`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `Direccion_Almacen` ADD CONSTRAINT `direccion_almacen_sucursal_fk_id_sucursal` FOREIGN KEY (`fk_Id_Sucursal`) REFERENCES `Sucursal`(`Id_Sucursal`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `Venta_Contribuyente_Encabezado` ADD CONSTRAINT `venta_contribuyente_encabezado_datos_facturacion_contribuyente8` FOREIGN KEY (`fk_id_cliente_fact`) REFERENCES `Datos_Facturacion_Contribuyente`(`id_cliente_fact`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `Detalle_Factura_COntribuyente` ADD CONSTRAINT `detalle_factura_contribuyente_producto_fk_id_producto` FOREIGN KEY (`fk_id_producto`) REFERENCES `Producto`(`id_producto`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `Detalle_Factura_COntribuyente` ADD CONSTRAINT `detalle_factura_contribuyente_venta_contribuyente_encabezado_10` FOREIGN KEY (`fk_id_venta`) REFERENCES `Venta_Contribuyente_Encabezado`(`id_venta`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `Entrada_Producto` ADD CONSTRAINT `entrada_producto_producto_fk_id_producto` FOREIGN KEY (`fk_id_producto`) REFERENCES `Producto`(`id_producto`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `Entrada_Producto` ADD CONSTRAINT `entrada_producto_compra_datos_fk_id_compra` FOREIGN KEY (`fk_id_compra`) REFERENCES `Compra_Datos`(`id_compra`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `Detalle_Factura` ADD CONSTRAINT `detalle_factura_venta_consumidor_final_fk_id_venta` FOREIGN KEY (`fk_id_venta`) REFERENCES `Venta_Consumidor_Final`(`id_venta`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `Detalle_Factura` ADD CONSTRAINT `detalle_factura_producto_fk_id_producto` FOREIGN KEY (`fk_id_producto`) REFERENCES `Producto`(`id_producto`) ON DELETE NO ACTION ON UPDATE CASCADE;