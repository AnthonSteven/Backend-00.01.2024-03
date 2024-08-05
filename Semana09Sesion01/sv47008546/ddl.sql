
--drop database prueba2;
-- create database prueba2;
-- use prueba2;

create table tbl_usuario(
id int identity primary key not null,
username varchar(50) unique not null,
password varchar(100) not null,
email varchar(100) unique not null,
activo bit default 1 not null,
usuarioCreacion int not null,
fechaCreacion datetime default getDate() not null,
usuarioModificacion int null,
fechaModificacion datetime default getDate() null,
CONSTRAINT FK_usuario_creacion FOREIGN KEY (usuarioCreacion)
        REFERENCES tbl_usuario(id),
CONSTRAINT FK_usuario_modificacion FOREIGN KEY (usuarioModificacion)
        REFERENCES tbl_usuario(id)
);

insert into tbl_usuario(username, password, email, usuarioCreacion)
values ('Antony','123456','ascastroguerrero@gmail.com',1);

select * from tbl_usuario;

create table tbl_color(
id int identity (1,1) primary key,
descripcion varchar(200) not null,
activo bit default 1 not null,
usuarioCreacion int not null,
fechaCreacion datetime default getDate() not null,
usuarioModificacion int null,
fechaModificacion datetime null,
CONSTRAINT FK_color_usuarioCreacion FOREIGN KEY (usuarioCreacion)
        REFERENCES tbl_usuario(id),
CONSTRAINT FK_color_usuarioModificacion FOREIGN KEY (usuarioModificacion)
        REFERENCES tbl_usuario(id)
);

insert into tbl_color (descripcion,usuarioCreacion)
values('Atigrado',1),('Blanco',1),('Marron',1),
('Gris',1),('Negro',1),('Chocolate',1);

select * from tbl_color;


create table tbl_especie(
id int identity (1,1) primary key,
descripcion varchar(200) not null,
activo bit default 1 not null,
usuarioCreacion int not null,
fechaCreacion datetime default getDate() not null,
usuarioModificacion int null,
fechaModificacion datetime null,
CONSTRAINT FK_especie_usuarioCreacion FOREIGN KEY (usuarioCreacion)
        REFERENCES tbl_usuario(id),
CONSTRAINT FK_especie_usuarioModificacion FOREIGN KEY (usuarioModificacion)
        REFERENCES tbl_usuario(id)
);

insert into tbl_especie(descripcion,usuarioCreacion)
values('Perro',1), ('Gato',1);

select * from tbl_especie;

create table tbl_raza(
id int identity (1,1) primary key,
descripcion varchar(200) not null,
activo bit default 1 not null,
usuarioCreacion int not null,
fechaCreacion datetime default getDate() not null,
usuarioModificacion int null,
fechaModificacion datetime null,
CONSTRAINT FK_raza_usuarioCreacion FOREIGN KEY (usuarioCreacion)
        REFERENCES tbl_usuario(id),
CONSTRAINT FK_raza_usuarioModificacion FOREIGN KEY (usuarioModificacion)
        REFERENCES tbl_usuario(id)
);

insert into tbl_raza(descripcion,usuarioCreacion)
values('Mestizo',1), ('Ruso',1), ('Gran Danes',1), ('Felina',1), ('Pekines',1), ('Labrador',1);

select * from tbl_raza;


create table tbl_nacionalidad(
id int identity (1,1) primary key,
descripcion varchar(200) not null,
activo bit default 1 not null,
usuarioCreacion int not null,
fechaCreacion datetime default getDate() not null,
usuarioModificacion int null,
fechaModificacion datetime null,
CONSTRAINT FK_nacionalidad_usuarioCreacion FOREIGN KEY (usuarioCreacion)
        REFERENCES tbl_usuario(id),
CONSTRAINT FK_nacionalidad_usuarioModificacion FOREIGN KEY (usuarioModificacion)
        REFERENCES tbl_usuario(id)
);

insert into tbl_nacionalidad(descripcion,usuarioCreacion)
values('Ecuatoriana',1),('Peruana',1),('Americana',1),
('Venezolana',1);

select * from tbl_nacionalidad;


create table tbl_documento(
id int identity (1,1) primary key,
descripcion varchar(200) not null,
activo bit default 1 not null,
usuarioCreacion int not null,
fechaCreacion datetime default getDate() not null,
usuarioModificacion int null,
fechaModificacion datetime null,
CONSTRAINT FK_documento_usuarioCreacion FOREIGN KEY (usuarioCreacion)
        REFERENCES tbl_usuario(id),
CONSTRAINT FK_documento_usuarioModificacion FOREIGN KEY (usuarioModificacion)
        REFERENCES tbl_usuario(id)
);

insert into tbl_documento(descripcion,usuarioCreacion)
values('DNI',1), ('Carnet de Extranjeria',1);

select * from tbl_documento;


create table tbl_direccion(
ubigeo char(6) primary key,
descripcion varchar(200) not null,
activo bit default 1 not null,
usuarioCreacion int not null,
fechaCreacion datetime default getDate() not null,
usuarioModificacion int null,
fechaModificacion datetime null,
CONSTRAINT FK_direccion_usuarioCreacion FOREIGN KEY (usuarioCreacion)
        REFERENCES tbl_usuario(id),
CONSTRAINT FK_direccion_usuarioModificacion FOREIGN KEY (usuarioModificacion)
        REFERENCES tbl_usuario(id)
);
insert into tbl_direccion(ubigeo,descripcion,usuarioCreacion)
values('140111','Lince',1), ('150115','Surco',1), ('999999','California',1), ('240103','Callao',1),
('140137','SJL',1), ('140131','Surquillo',1), ('140112','Lurigancho Chosica',1);

select * from tbl_direccion;

create table tbl_vacuna(
id int identity (1,1) primary key,
descripcion varchar(200) not null,
activo bit default 1 not null,
usuarioCreacion int not null,
fechaCreacion datetime default getDate() not null,
usuarioModificacion int null,
fechaModificacion datetime null,
CONSTRAINT FK_vacuna_usuarioCreacion FOREIGN KEY (usuarioCreacion)
        REFERENCES tbl_usuario(id),
CONSTRAINT FK_vacuna_usuarioModificacion FOREIGN KEY (usuarioModificacion)
        REFERENCES tbl_usuario(id)
);

insert into tbl_vacuna(descripcion,usuarioCreacion)
values('Triple Felina',1), ('Pfizer',1), ('Todas',1),('Antirrabica',1), ('Completas',1);

select * from tbl_vacuna;

create table tbl_propietario(
id int identity (1,1) primary key,
nombre varchar(100) not null,
apellido varchar(100) not null,
documento varchar(50) not null,
telefono varchar(50) not null,
idTipoDocumento int not null,
idNacionalidad int not null,
ubigeo char(6) not null,
activo bit default 1 not null,
usuarioCreacion int not null,
fechaCreacion datetime default getDate() not null,
usuarioModificacion int null,
fechaModificacion datetime null,
CONSTRAINT FK_propietario_usuarioCreacion FOREIGN KEY (usuarioCreacion) REFERENCES tbl_usuario(id),
CONSTRAINT FK_propietario_usuarioModificacion FOREIGN KEY (usuarioModificacion) REFERENCES tbl_usuario(id),
CONSTRAINT FK_propietario_direccion FOREIGN KEY (ubigeo) REFERENCES tbl_direccion(ubigeo),
CONSTRAINT FK_propietario_nacionalidad FOREIGN KEY (idNacionalidad) REFERENCES tbl_nacionalidad(id),
CONSTRAINT FK_propietario_tipoDocumento FOREIGN KEY (idTipoDocumento) REFERENCES tbl_documento(id),
);

insert into tbl_propietario(nombre,apellido,documento,telefono,idTipoDocumento,idNacionalidad,ubigeo,usuarioCreacion)
values('Roberto', 'Pineda','001575291', '916730940',2,1,'140111',1),
('Javier', 'Santaolalla','74784244', '945134669',1,2,'150115',1),
('Shaggy', 'Rogers','51537895', '951328853',2,3,'999999',1),
('Clint', 'Clobber','67318294', '964127182',1,2,'240103',1),
('Antony', 'Castro','47008546', '985041777',1,2,'240103',1),
('Jose', 'Balcazar','09445862', '964187297',1,2,'140137',1),
('Ana', 'Gonzalez','2333753', '970179443',2,4,'140131',1),
('Luis', 'Juarez','75140778', '932616113',1,2,'140112',1);

select * from tbl_propietario;


create table tbl_mascota(
id int identity (1,1) primary key,
nombre varchar(200) not null,
fechaNacimiento date null,
idEspecie int not null,
idRaza int not null,
idColor int not null,
idPropietario int not null,
activo bit default 1 not null,
usuarioCreacion int not null,
fechaCreacion datetime default getDate() not null,
usuarioModificacion int null,
fechaModificacion datetime null,
CONSTRAINT FK_mascota_usuarioCreacion FOREIGN KEY (usuarioCreacion) REFERENCES tbl_usuario(id),
CONSTRAINT FK_mascota_usuarioModificacion FOREIGN KEY (usuarioModificacion) REFERENCES tbl_usuario(id),
CONSTRAINT FK_mascota_especie FOREIGN KEY (idEspecie) REFERENCES tbl_especie(id),
CONSTRAINT FK_mascota_raza FOREIGN KEY (idRaza) REFERENCES tbl_raza(id),
CONSTRAINT FK_mascota_color FOREIGN KEY (idColor) REFERENCES tbl_color(id),
CONSTRAINT FK_mascota_propietario FOREIGN KEY (idPropietario) REFERENCES tbl_propietario(id),
);

insert into tbl_mascota(nombre,idEspecie,idRaza,idColor,idPropietario,usuarioCreacion)
values('Pancho',1,1,1,1,1),
('Selina',1,1,2,1,1),
('Copito de nieve',1,2,2,2,1),
('Scooby doo',2,3,3,3,1),
('Tom',1,2,4,4,1),
('Homero',2,1,2,5,1),
('Tiguis',1,4,1,6,1),
('Zoe',2,1,2,7,1),
('Pinki',2,5,2,6,1),
('Bruno',2,1,2,7,1),
('Napo',2,6,5,6,1),
('Choco',2,6,6,8,1);

select * from tbl_mascota;

create table tbl_vacuna_mascota(
id int identity not null,
idVacuna int not null,
idMascota int not null,
activo bit default 1 not null,
usuarioCreacion int not null,
fechaCreacion datetime default getDate() not null,
usuarioModificacion int null,
fechaModificacion datetime null,
CONSTRAINT FK_vacuna_mascota_usuarioCreacion FOREIGN KEY (usuarioCreacion) REFERENCES tbl_usuario(id),
CONSTRAINT FK_vacuna_mascota_usuarioModificacion FOREIGN KEY (usuarioModificacion) REFERENCES tbl_usuario(id),
CONSTRAINT FK_vacuna_mascota_vacuna FOREIGN KEY (idVacuna) REFERENCES tbl_vacuna(id),
CONSTRAINT FK_vacuna_mascota_mascota FOREIGN KEY (idMascota) REFERENCES tbl_mascota(id),
);

insert into tbl_vacuna_mascota(idMascota, idVacuna, usuarioCreacion)
values(1,1,1),(1,4,1),(2,1,1),(2,4,1),(3,1,1),(4,3,1),
(5,3,1),(6,4,1),(6,3,1),(7,5,1),(8,5,1),(9,5,1),
(10,5,1),(11,5,1),(12,5,1);

select * from tbl_usuario;

select * from tbl_vacuna_mascota vm inner join tbl_mascota m on vm.idMascota = m.id
inner join tbl_vacuna v on vm.idVacuna = v.id;