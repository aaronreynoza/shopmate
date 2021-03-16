/*Datos BD*/
use db_tienda;
/*insert into */
insert into tipo_usuario (nombre_tu, descripcion) values ('Administrador', 'Usuario que se encarga de administar');
insert into tipo_usuario (nombre_tu, descripcion) values ('Vendedor', 'Ofrecer informacion y facilita la compra de productos');
insert into tipo_usuario (nombre_tu, descripcion) values ('Repartidor', 'Usuario que se encarga de entregar los pedidos');
insert into tipo_usuario (nombre_tu, descripcion) values ('Cliente', 'Usuario que adquiere los productos');
/*Clientes*/
insert into usuario (nombres_usuario, primer_apellido_usu, segundo_apellido_usu, email_usu, clave_usu, estado,fk_id_tipo,phone,validacion) values ('Jose', 'Maldonado', 'Menjivar', 'j_maldonado@gmail.com','123456',1,1,'25693456',1);
insert into usuario (nombres_usuario, primer_apellido_usu, segundo_apellido_usu, email_usu, clave_usu, estado,fk_id_tipo,phone,validacion) values ('Mario', 'Reynoza', 'Valdez', 'mario_rv@gmail.com','123456',1,2,'25698478',1);
insert into usuario (nombres_usuario, primer_apellido_usu, segundo_apellido_usu, email_usu, clave_usu, estado,fk_id_tipo,phone,validacion) values ('Cristian', 'Gonzales', 'Hernandez', 'cristian_gh@gmail.com','123456',1,2,'25369587',1);
insert into usuario (nombres_usuario, primer_apellido_usu, segundo_apellido_usu, email_usu, clave_usu, estado,fk_id_tipo,phone,validacion) values ('Elena', 'Villacorta', 'Rafaelano', 'elena1296@gmail.com','123456',1,3,'78524169',1);
insert into usuario (nombres_usuario, primer_apellido_usu, segundo_apellido_usu, email_usu, clave_usu, estado,fk_id_tipo,phone,validacion) values ('Sonia', 'Critales', 'de Avila', 'sonia1215@gmail.com','123456',1,4,'72653420',1);
insert into usuario (nombres_usuario, primer_apellido_usu, segundo_apellido_usu, email_usu, clave_usu, estado,fk_id_tipo,phone,validacion) values ('Marcos', 'Ruiz', 'Jimenez', 'm.jimenez@gmail.com','123456',1,4,'69875214',1);
insert into usuario (nombres_usuario, primer_apellido_usu, segundo_apellido_usu, email_usu, clave_usu, estado,fk_id_tipo,phone,validacion) values ('Daniel', 'Rauda', 'Rosa', 'drraagos@gmail.com','123456',1,4,'29653512',1);
insert into usuario (nombres_usuario, primer_apellido_usu, segundo_apellido_usu, email_usu, clave_usu, estado,fk_id_tipo,phone,validacion) values ('Felix', 'Alberto', 'Moran', 'fam8595@gmail.com','123456',1,4,'76524569',1);
select * from usuario;

/*Direccion de entrega*/
insert into direccion_entrega (departamento, municipio, direccion, fk_id_usuario) Values ('San Salvador','Tonacatepeque','Residencial Amelia Calle las flores casa numero 12',5);
insert into direccion_entrega (departamento, municipio, direccion, fk_id_usuario) Values ('Chalatenango','Chalatenango','Barrio el calvario avenida santa cecilia casa n10',6);
insert into direccion_entrega (departamento, municipio, direccion, fk_id_usuario) Values ('Chalatenango','Chalatenango','Barrio el centro avenida libertad casa n01',7);
insert into direccion_entrega (departamento, municipio, direccion, fk_id_usuario) Values ('San Salvador','San Martin','Residencial res. Altavista pol 15 casa 16',8);
Select * from direccion_entrega;

/*proveedores*/
insert into proveedor(nombre_prov,telefono_prov,email_prov) values ('Compupart','2222-5555','compu_part@cpm.com');
insert into proveedor(nombre_prov,telefono_prov,email_prov) values ('Compumax','2323-2828','cp_max@cpmax.com');
insert into proveedor(nombre_prov,telefono_prov,email_prov) values ('MarinComputec','2424-2525','info@marinc.com');
insert into proveedor(nombre_prov,telefono_prov,email_prov) values ('HardwareXtreme','2626-2626','ventas@hdx.com');
insert into proveedor(nombre_prov,telefono_prov,email_prov) values ('PCMax','2596-9696','contacto@pcmax.com');
select * from proveedor;
/*Categoria Productos*/
insert into categoria(nombre_categoria,icon,estado,descripcion_cat) values ('MEMORIAS RAM','icono dato extraño',1,'Memoria volatil');
insert into categoria(nombre_categoria,icon,estado,descripcion_cat) values ('HDD','icono dato extraño',1,'Almacenamiento HDD');
insert into categoria(nombre_categoria,icon,estado,descripcion_cat) values ('SSD','icono dato extraño',1,'Unida de almacenamiento');
insert into categoria(nombre_categoria,icon,estado,descripcion_cat) values ('MOTHERBOARD','icono dato extraño',1,'Tarjeta Madre');
insert into categoria(nombre_categoria,icon,estado,descripcion_cat) values ('PROCESADOR','icono dato extraño',1,'Unidad central de procesamiento');
insert into categoria(nombre_categoria,icon,estado,descripcion_cat) values ('FUENTES DE PODER','icono dato extraño',1,'Alimentacio pc');
insert into categoria(nombre_categoria,icon,estado,descripcion_cat) values ('GPU','icono dato extraño',1,'Tarjeta grafica');
/*Productos*/
/*RAM*/
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('Corsair Vengeance LPX', 50.25,'1.jpg','{"marca":"CORSAIR","frecuencia":"3200MHz","capacidad":"8GB","tipo":"DDR4","tamaño":"escritorio"}',1,1);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('HyperX Fury', 100.00,'2.jpg','{"marca":"HyperX","frecuencia":"2666MHz","capacidad":"16GB","tipo":"DDR4","tamaño":"escritorio"}',1,1);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('ADATA Premier', 80.25,'3.jpg','{"marca":"ADATA ","frecuencia":"2666MHz","capacidad":"16GB","tipo":"DDR4","tamaño":"escritorio"}',1,2);
/*HDD*/
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor)
 values ('WD10EZEX', 65.25,'4.jpg','{"marca":"Western Digita","capacidad":"1TB","tamaño":"Escritorio"}',2,1);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('WD40EFAX', 125.00,'5.jpg','{"marca":"Western Digita","capacidad":"4TB","tamaño":"Escritorio"}',2,1);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('HDWG11AXZSTA', 300.00,'6.jpg','{"marca":"Toshiba","capacidad":"10TB","tamaño":"Escritorio"}',2,1);
/*SSD*/
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('Samsung 970 EVO', 85.00,'7.jpg','{"marca":"Samsung","capacidad":"500GB"}',3,1);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('WDS200T2B0C', 60.00,'8.jpg','{"marca":"Western Digital","capacidad":"2TB"}',3,1);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('Samsung 870 QVO', 250.00,'9.jpg','{"marca":"Samsung","capacidad":"2TB"}',3,2);
/*Motherboard*/
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('ASUS TUF B365M', 159.00,'10.jpg','{"zocalo":"LGA 1151","tipo_ram":"DDR4"}',4,4);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('MSI H310M PRO', 79.00,'11.jpg','{"zocalo":"LGA 1151","tipo_ram":"DDR4"}',4,4);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('ASUS TUF GAMING B550M', 225.00,'12.jpg','{"zocalo":"AMD AM4","tipo_ram":"DDR4"}',4,4);
/*Procesadores*/
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('INTEL CORE I5 10600K',400.00,'13.jpg','{"nucleos":"6","frecuencia":"4.10GHz","hilos":"12"}',5,4);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('AMD RYZEN 5 3500X',215.00,'14.jpg','{"nucleos":"6","frecuencia":"3.6GHz","hilos":"6"}',5,3);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('INTEL CORE I7 9700F', 500.00,'15.jpg','{"nucleos":"8","frecuencia":"3GHz","hilos":"8"}',5,1);
/*Fuentes de poder*/
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor)
 values ('ROG STRIX 750G', 179.00,'16.jpg','{"potencia":"750W","certificacion":"80 plus gold","marca":"ASUS"}',6,1);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('P750GM', 135.00,'17.jpg','{"potencia":"750W","certificacion":"80 plus gold","marca":"GIGABYTE"}',6,2);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('RGPS GC-PS001', 69.00,'18.jpg','{"potencia":"500W","certificacion":"80 plus bronce","marca":"REDRAGON"}',6,3);
/*Tarjetas de video*/
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('ASUS TUF GAMING GTX1660S', 380.00,'19.jpg','{"Capacidad":"6GB","Tipo":"GDDR6"}',7,1);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('ASUS TUF RX5700XT',630.00,'20.jpg','{"Capacidad":"8GB","Tipo":"GDDR6"}',7,3);
insert into producto(nombre_prod,precio_venta,imagen,especificaciones,fk_id_categoria,fk_id_proveedor) 
values ('ASUS GT1030',125.00,'21.jpg','{"Capacidad":"2GB","Tipo":"GDDR5"}',7,3);
select * from  producto;
/*Sucursal*/
insert into sucursal(nombre_sucursal, estado,fecha_creacion) values ('sucursal centro, san salvador',true,'2019-01-11');
/*Direccion*/
insert into direccion_almacen(pais,departamento,municipio,ciudad,direccion,fk_id_sucursal) values ('El Salvador','San Salvador','San Salvador','','1° avenida norte',1);
/*Inventario*/
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,1,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,2,1); 
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,3,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,4,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,5,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,6,1); 
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,7,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,8,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,9,1); 
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,10,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,11,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,12,1); 
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,13,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,14,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,15,1); 
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,16,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,17,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,18,1); 
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,19,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,20,1);
insert into inventario(cantidad,fk_id_producto,fk_id_sucursal) values (35,21,1); 
/*Solicitud nueva*/
select * from categoria;
select * from usuario;
use db_tienda;
select * from producto;
select * from verificacion;