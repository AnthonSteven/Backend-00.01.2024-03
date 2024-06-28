--use prueba;

--drop database prueba2;

create database prueba2;
use prueba2;


create table tbl_usuario(
	id int identity(1,1) primary key,
	username varchar(50) not null unique,
	password varchar(100) not null,
	email varchar(100) not null unique,
	activo bit not null default 1,
	usuarioCreacion int  NOT NULL,
	fechaCreacion datetime default getdate() NOT NULL,
	usuarioModificacion int NULL,
	fechaModificacion datetime NULL,
	constraint fk_usuarioCreacion FOREIGN key(usuarioCreacion) references tbl_usuario(id),
	constraint fk_usuarioModificacion FOREIGN key(usuarioModificacion) references tbl_usuario(id)

)

insert into tbl_usuario(username, password, email,usuarioCreacion)
values('rpineda','0987654321', 'rpineda@x-codec.net', 1)

create table tbl_color(
	id int IDENTITY(1,1) primary key ,
	descripcion varchar(200) not null,
	activo bit not null default 1,
	usuarioCreacion int  NOT NULL,
	fechaCreacion datetime default getdate() NOT NULL,
	usuarioModificacion int NULL,
	fechaModificacion datetime NULL,
	constraint fk_usuario_usuarioCreacion FOREIGN key(usuarioCreacion) references tbl_usuario(id),
	constraint fk_usuario_usuarioModificacion FOREIGN key(usuarioModificacion) references tbl_usuario(id)

)

insert into tbl_color(descripcion, usuarioCreacion)
values('Blanco',1);

select * from tbl_color;


create table tbl_especie(
	id int IDENTITY(1,1) primary key ,
	descripcion varchar(200) not null,
	activo bit not null default 1,
	usuarioCreacion int  NOT NULL,
	fechaCreacion datetime default getdate() NOT NULL,
	usuarioModificacion int NULL,
	fechaModificacion datetime NULL,
	constraint fk_especie_usuarioCreacion FOREIGN key(usuarioCreacion) references tbl_usuario(id),
	constraint fk_especie_usuarioModificacion FOREIGN key(usuarioModificacion) references tbl_usuario(id)

)

insert into tbl_especie(descripcion, usuarioCreacion)
values('Gato',1);

select * from tbl_especie;


create table tbl_raza(
	id int IDENTITY(1,1) primary key ,
	descripcion varchar(200) not null,
	activo bit not null default 1,
	usuarioCreacion int  NOT NULL,
	fechaCreacion datetime default getdate() NOT NULL,
	usuarioModificacion int NULL,
	fechaModificacion datetime NULL,
	constraint fk_raza_usuarioCreacion FOREIGN key(usuarioCreacion) references tbl_usuario(id),
	constraint fk_raza_usuarioModificacion FOREIGN key(usuarioModificacion) references tbl_usuario(id)

)

insert into tbl_raza(descripcion, usuarioCreacion)
values('Mestizo',1);

select * from tbl_raza;


create table tbl_direccion(
	ubigeo char(6) primary key ,
	descripcion varchar(200) not null,
	activo bit not null default 1,
	usuarioCreacion int  NOT NULL,
	fechaCreacion datetime default getdate() NOT NULL,
	usuarioModificacion int NULL,
	fechaModificacion datetime NULL,
	constraint fk_direccion_usuarioCreacion FOREIGN key(usuarioCreacion) references tbl_usuario(id),
	constraint fk_direccion_usuarioModificacion FOREIGN key(usuarioModificacion) references tbl_usuario(id)

)

insert into tbl_direccion(ubigeo,descripcion, usuarioCreacion)
values('140109','LIMA-LIMA-LA VICTORIA',1);

select * from tbl_direccion;


create table tbl_nacionalidad(
	id int IDENTITY(1,1) primary key ,
	descripcion varchar(200) not null,
	activo bit not null default 1,
	usuarioCreacion int  NOT NULL,
	fechaCreacion datetime default getdate() NOT NULL,
	usuarioModificacion int NULL,
	fechaModificacion datetime NULL,
	constraint fk_nacionalidad_usuarioCreacion FOREIGN key(usuarioCreacion) references tbl_usuario(id),
	constraint fk_nacionalidad_usuarioModificacion FOREIGN key(usuarioModificacion) references tbl_usuario(id)

)

insert into tbl_nacionalidad(descripcion, usuarioCreacion)
values('Peruano',1);

insert into tbl_nacionalidad(descripcion, usuarioCreacion)
values('Ecuatoriano',1);

select * from tbl_nacionalidad;


create table tbl_tipo_documento(
	id int IDENTITY(1,1) primary key ,
	descripcion varchar(200) not null,
	activo bit not null default 1,
	usuarioCreacion int  NOT NULL,
	fechaCreacion datetime default getdate() NOT NULL,
	usuarioModificacion int NULL,
	fechaModificacion datetime NULL,
	constraint fk_tipo_documento_usuarioCreacion FOREIGN key(usuarioCreacion) references tbl_usuario(id),
	constraint fk_tipo_documento_usuarioModificacion FOREIGN key(usuarioModificacion) references tbl_usuario(id)

)

insert into tbl_tipo_documento(descripcion, usuarioCreacion)
values('DNI',1),
('CE',1);

select * from tbl_tipo_documento;


create table tbl_vacunas(
	id int IDENTITY(1,1) primary key ,
	descripcion varchar(200) not null,
	activo bit not null default 1,
	usuarioCreacion int  NOT NULL,
	fechaCreacion datetime default getdate() NOT NULL,
	usuarioModificacion int NULL,
	fechaModificacion datetime NULL,
	constraint fk_vacunas_usuarioCreacion FOREIGN key(usuarioCreacion) references tbl_usuario(id),
	constraint fk_vacunas_usuarioModificacion FOREIGN key(usuarioModificacion) references tbl_usuario(id)

)




insert into tbl_vacunas(descripcion, usuarioCreacion)
values('Triple Felina',1),
('Antirrabica',1);

select * from tbl_vacunas;


create table tbl_propietario(
	id int identity(1,1) primary key,
	nombre varchar(100) not null,
	apellido varchar(100) not null,
	telefono varchar(20) not null,
	documento varchar(50) not null,
	idTipoDocumento int not null,
	idNacionalidad int not null,
	ubigeo char(6) not null,
	activo bit not null default 1,
	usuarioCreacion int  NOT NULL,
	fechaCreacion datetime default getdate() NOT NULL,
	usuarioModificacion int NULL,
	fechaModificacion datetime NULL,
	constraint fk_propietario_usuarioCreacion FOREIGN key(usuarioCreacion) references tbl_usuario(id),
	constraint fk_propietario_usuarioModificacion FOREIGN key(usuarioModificacion) references tbl_usuario(id),
	constraint fk_propietario_tipo_documento Foreign key(idTipoDocumento) references tbl_tipo_documento(id),
	constraint fk_nacionalidad_propietario foreign key (idNAcionalidad) references tbl_nacionalidad(id),
	constraint fk_ubigeo_propietario foreign key(ubigeo) references tbl_direccion(ubigeo)
)

insert into tbl_propietario(nombre,apellido,telefono,documento,idTipoDocumento,idNacionalidad,ubigeo, usuarioCreacion)
values('Roberto', 'Pineda', '+51916730940', '001575291',2, 2, '140109',1)

select * from tbl_propietario;

CREATE table tbl_mascotas(
	id int identity(1,1) primary key,
	nombre varchar(200) not null,
	fechaNacimiento date null,
	idEspecie int not null,
	idRaza int not null,
	idColor int not null,
	idPropietario int not null,
	activo bit not null default 1,
	usuarioCreacion int  NOT NULL,
	fechaCreacion datetime default getdate() NOT NULL,
	usuarioModificacion int NULL,
	fechaModificacion datetime NULL,
	constraint fk_mascota_usuarioCreacion FOREIGN key(usuarioCreacion) references tbl_usuario(id),
	constraint fk_mascota_usuarioModificacion FOREIGN key(usuarioModificacion) references tbl_usuario(id),
	constraint fk_mascota_especie foreign key (idEspecie) references tbl_especie(id),
	constraint fk_mascota_raza foreign key (idRaza) references tbl_raza(id),
	constraint fk_mascota_color foreign key(idColor) references tbl_color(id),
	constraint fk_mascota_propietario foreign key (idPropietario) references tbl_propietario(id)
)

insert into tbl_mascotas(nombre, fechaNacimiento,idRaza,idColor, idEspecie, idPropietario,usuarioCreacion)
values('Pancho', null,1, 1,1,1,1);

select * from tbl_mascotas;


create table tbl_vacuna_mascota(
	id int identity(1,1) primary key,
	idMascota int not null,
	idVacuna int not null,
	activo bit not null default 1,
	usuarioCreacion int  NOT NULL,
	fechaCreacion datetime default getdate() NOT NULL,
	usuarioModificacion int NULL,
	fechaModificacion datetime NULL,
	constraint fk_mascota_vacuna_usuarioCreacion FOREIGN key(usuarioCreacion) references tbl_usuario(id),
	constraint fk_mascota_vacuna_usuarioModificacion FOREIGN key(usuarioModificacion) references tbl_usuario(id),
	constraint fk_mascota_vacuna_mascota foreign key (idmascota) references tbl_mascotas(id),
	constraint fk_mascota_vacuna_vacunas foreign key (idVacuna) references tbl_vacunas(id)

)

select * from tbl_vacunas

insert into tbl_vacuna_mascota(idMascota,idVacuna, usuarioCreacion)
values(1,1,1),
(1,2,1);

select * from tbl_vacuna_mascota;

select vm.id, m.nombre, v.descripcion from tbl_vacuna_mascota vm inner join tbl_mascotas m on vm.idMascota = m.id
inner join tbl_vacunas v on vm.idVacuna = v.id;