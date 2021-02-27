#  Creado con Kata Kuntur - Modelador de Datos
#  Versión: 2.5.4
#  Sitio Web: http://katakuntur.jeanmazuelos.com/
#  Si usted encuentra algún error le agradeceriamos lo reporte en:
#  http://pm.jeanmazuelos.com/katakuntur/issues/new

#  Administrador de Base de Datos: MySQL/MariaDB
#  Diagrama: db_tienda
#  Autor: jegzstate
#  Fecha y hora: 24/02/2021 10:00:58
CREATE DATABASE db_tienda;
use db_tienda;
# GENERANDO TABLAS
CREATE TABLE `usuario` (
	`id_usuario` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador del cliente',
	`nombres_usuario` VARCHAR(100) NOT NULL COMMENT 'Nombre o Nombres del cliente',
	`primer_apellido_usu` VARCHAR(15) NOT NULL COMMENT 'Primer Apellido del cliente',
	`segundo_apellido_usu` VARCHAR(15) NOT NULL COMMENT 'Segundo Apellido del cliente',
	`email_usu` VARCHAR(45) NOT NULL COMMENT 'email del cliente',
	`clave_usu` VARCHAR(100) NOT NULL COMMENT 'Clave de usuario o acceso',
	`estado` INTEGER NOT NULL COMMENT 'Estado de usuario activo/desactivado/bloqueado',
	`fk_id_tipo` INTEGER NOT NULL COMMENT 'Identificador del tipo Usuario',
	KEY(`fk_id_tipo`),
	PRIMARY KEY(`id_usuario`)
) ENGINE=INNODB;
CREATE TABLE `producto` (
	`id_producto` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador de producto',
	`nombre_prod` VARCHAR(25) NOT NULL COMMENT 'Nombre del producto',
	`precio_venta` DOUBLE NOT NULL COMMENT 'Precio del producto',
	`especificaciones` JSON NOT NULL COMMENT 'Especificaciones del producto',
	`fk_id_proveedor` INTEGER NOT NULL COMMENT 'Identificador del proveedor',
	KEY(`fk_id_proveedor`),
	`fk_id_categoria` INTEGER NOT NULL COMMENT 'Identificador categoria',
	KEY(`fk_id_categoria`),
	PRIMARY KEY(`id_producto`)
) ENGINE=INNODB;
CREATE TABLE `inventario` (
	`cantidad` INTEGER NOT NULL COMMENT 'Cantidad que ingresa (Unidades del producto)',
	`fk_id_producto` INTEGER NOT NULL COMMENT 'Identificador de producto',
	KEY(`fk_id_producto`),
	`fk_id_sucursal` INTEGER NOT NULL COMMENT 'Identificador de la sucursal',
	KEY(`fk_id_sucursal`)
) ENGINE=INNODB;
CREATE TABLE `proveedor` (
	`id_proveedor` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador del proveedor',
	`nombre_prov` VARCHAR(100) NOT NULL COMMENT 'Nombre del proveedor',
	`telefono_prov` VARCHAR(15) NOT NULL COMMENT 'Telefono de contacto del proveedor',
	`email_prov` VARCHAR(150) NOT NULL COMMENT 'Email del proveedor.',
	PRIMARY KEY(`id_proveedor`)
) ENGINE=INNODB;
CREATE TABLE `sucursal` (
	`id_sucursal` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador de la sucursal',
	`nombre_sucursal` VARCHAR(50) NOT NULL COMMENT 'Nombre de la sucursal',
	`estado` BIT NOT NULL COMMENT 'Estado del almacen Activo/Desactivado',
	`fecha_creacion` DATE NOT NULL COMMENT 'Fecha creacion de sucursal',
	PRIMARY KEY(`id_sucursal`)
) ENGINE=INNODB;
CREATE TABLE `direccion_almacen` (
	`id_dir_almacen` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador del almacen',
	`pais` VARCHAR(25) NOT NULL COMMENT 'Pais de procedencia del almacen',
	`departamento` VARCHAR(25) NOT NULL COMMENT 'Departamento de procedenciad del almacen',
	`municipio` VARCHAR(25) NOT NULL COMMENT 'Municipio de procedencia del almacen',
	`ciudad` VARCHAR(25) NOT NULL COMMENT 'Ciudad de procendecia del almacen',
	`direccion` VARCHAR(100) NOT NULL COMMENT 'Direccion del almacen',
	`fk_id_sucursal` INTEGER NOT NULL COMMENT 'Identificador de la sucursal',
	KEY(`fk_id_sucursal`),
	PRIMARY KEY(`id_dir_almacen`)
) ENGINE=INNODB;
CREATE TABLE `dato_facturacion_contribuyente` (
	`id_cliente_fact` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador cliente facturacion',
	`nombre` VARCHAR(25) NOT NULL COMMENT 'Nombre Contribuyente',
	`direccion` VARCHAR(150) NOT NULL COMMENT 'Direccion contribuyente',
	`departamento` VARCHAR(20) NOT NULL COMMENT 'Departamento contribuyente',
	`nit_contribuyente` VARCHAR(20) NOT NULL COMMENT 'Ni del contribuyente',
	`nrc` VARCHAR(20) NOT NULL COMMENT 'Numero de registro de declaracion de Iva',
	`giro` VARCHAR(35) NOT NULL COMMENT 'Giro de el contribuyente',
	`fk_id_usuario` INTEGER NOT NULL COMMENT 'Identificador del cliente',
	KEY(`fk_id_usuario`),
	PRIMARY KEY(`id_cliente_fact`)
) ENGINE=INNODB;
CREATE TABLE `encabezado_solicitud` (
	`id_encabez` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador en solicitud',
	`fecha_sol` DATE NOT NULL COMMENT 'Fecha en que se realizo la solicitud',
	`Estado` INTEGER NOT NULL COMMENT 'Estado en que se encuentra la solicitud',
	`tipo_compra` INTEGER NOT NULL COMMENT 'Tipo de compra consumidor final/contribuyente',
	`fk_id_usuario` INTEGER NOT NULL COMMENT 'Identificador del cliente',
	KEY(`fk_id_usuario`),
	`fk_id_direccion` INTEGER NOT NULL COMMENT 'Identificador de ubicacion',
	KEY(`fk_id_direccion`),
	PRIMARY KEY(`id_encabez`)
) ENGINE=INNODB;
CREATE TABLE `detalle_solicitud` (
	`id_detalle` INTEGER AUTO_INCREMENT NOT NULL,
	`cantidad` INTEGER NOT NULL COMMENT 'Cantidad del producto a comprar',
	`precio` DOUBLE NOT NULL COMMENT 'Precio del producto',
	`fk_id_encabez` INTEGER NOT NULL COMMENT 'Identificador en solicitud',
	KEY(`fk_id_encabez`),
	`fk_id_producto` INTEGER NOT NULL COMMENT 'Identificador de producto',
	KEY(`fk_id_producto`),
	PRIMARY KEY(`id_detalle`)
) ENGINE=INNODB;
CREATE TABLE `descuentos` (
	`porcentaje` DOUBLE NOT NULL COMMENT 'Porcentaje',
	`fecha_inicio` DATE NOT NULL COMMENT 'Fecha en la que se publico el descuento',
	`fecha_fin` DATE NOT NULL COMMENT 'Fecha en la que no se aplica descuento',
	`fk_id_producto` INTEGER NOT NULL COMMENT 'Identificador de producto',
	KEY(`fk_id_producto`)
) ENGINE=INNODB;
CREATE TABLE `direccion_entrega` (
	`id_direccion` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador de ubicacion',
	`departamento` VARCHAR(20) NOT NULL COMMENT 'Departamento de la entrega',
	`municipio` VARCHAR(20) NOT NULL COMMENT 'Municipio de entreda',
	`direccion` VARCHAR(100) NOT NULL,
	`fk_id_usuario` INTEGER NOT NULL COMMENT 'Identificador del cliente',
	KEY(`fk_id_usuario`),
	PRIMARY KEY(`id_direccion`)
) ENGINE=INNODB;
CREATE TABLE `categoria` (
	`id_categoria` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador categoria',
	`nombre_categoria` VARCHAR(100) NOT NULL COMMENT 'String Nombre categoria',
	`icon` VARCHAR(100) NOT NULL COMMENT 'Icono Categoria',
	`estado` INTEGER NOT NULL COMMENT 'Estado actual del',
	`descripcion_categoria` VARCHAR(100) NOT NULL COMMENT 'Descripcion de la categoria',
	PRIMARY KEY(`id_categoria`)
) ENGINE=INNODB;
CREATE TABLE `tipo_usuario` (
	`id_tipo` INTEGER AUTO_INCREMENT NOT NULL COMMENT 'Identificador del tipo Usuario',
	`nombre_tu` VARCHAR(100) NOT NULL COMMENT 'Nombre del tipo de usuario',
	`descripcion` VARCHAR(100) NOT NULL COMMENT 'Descripcion del tipo Usuario',
	PRIMARY KEY(`id_tipo`)
) ENGINE=INNODB;
CREATE TABLE `carrito_compra` (
	`date` DATETIME NOT NULL COMMENT 'Fecha y hora en q se agrego al carrito',
	`estado` INTEGER NOT NULL COMMENT 'Estado del elemento, activo o desactivado',
	`cantidad` INTEGER NOT NULL COMMENT 'Cantidad de elementos en el carrito de compra',
	`fk_id_usuario` INTEGER NOT NULL COMMENT 'Identificador del cliente',
	KEY(`fk_id_usuario`),
	`fk_id_producto` INTEGER NOT NULL COMMENT 'Identificador de producto',
	KEY(`fk_id_producto`)
) ENGINE=INNODB;

# GENERANDO RELACIONES
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_tipo_usuario_fk_id_tipo` FOREIGN KEY (`fk_id_tipo`) REFERENCES `tipo_usuario`(`id_tipo`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `producto` ADD CONSTRAINT `producto_proveedor_fk_id_proveedor` FOREIGN KEY (`fk_id_proveedor`) REFERENCES `proveedor`(`id_proveedor`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `producto` ADD CONSTRAINT `producto_categoria_fk_id_categoria` FOREIGN KEY (`fk_id_categoria`) REFERENCES `categoria`(`id_categoria`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `inventario` ADD CONSTRAINT `inventario_producto_fk_id_producto` FOREIGN KEY (`fk_id_producto`) REFERENCES `producto`(`id_producto`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `inventario` ADD CONSTRAINT `inventario_sucursal_fk_id_sucursal` FOREIGN KEY (`fk_id_sucursal`) REFERENCES `sucursal`(`id_sucursal`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `direccion_almacen` ADD CONSTRAINT `direccion_almacen_sucursal_fk_id_sucursal` FOREIGN KEY (`fk_id_sucursal`) REFERENCES `sucursal`(`id_sucursal`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `dato_facturacion_contribuyente` ADD CONSTRAINT `dato_facturacion_contribuyente_usuario_fk_id_usuario` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `encabezado_solicitud` ADD CONSTRAINT `encabezado_solicitud_usuario_fk_id_usuario` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `encabezado_solicitud` ADD CONSTRAINT `encabezado_solicitud_direccion_entrega_fk_id_direccion` FOREIGN KEY (`fk_id_direccion`) REFERENCES `direccion_entrega`(`id_direccion`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `detalle_solicitud` ADD CONSTRAINT `detalle_solicitud_encabezado_solicitud_fk_id_encabez` FOREIGN KEY (`fk_id_encabez`) REFERENCES `encabezado_solicitud`(`id_encabez`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `detalle_solicitud` ADD CONSTRAINT `detalle_solicitud_producto_fk_id_producto` FOREIGN KEY (`fk_id_producto`) REFERENCES `producto`(`id_producto`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `descuentos` ADD CONSTRAINT `descuentos_producto_fk_id_producto` FOREIGN KEY (`fk_id_producto`) REFERENCES `producto`(`id_producto`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `direccion_entrega` ADD CONSTRAINT `direccion_entrega_usuario_fk_id_usuario` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `carrito_compra` ADD CONSTRAINT `carrito_compra_usuario_fk_id_usuario` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE `carrito_compra` ADD CONSTRAINT `carrito_compra_producto_fk_id_producto` FOREIGN KEY (`fk_id_producto`) REFERENCES `producto`(`id_producto`) ON DELETE NO ACTION ON UPDATE CASCADE;