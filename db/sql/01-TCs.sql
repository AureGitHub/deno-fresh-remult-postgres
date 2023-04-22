
DROP TABLE  IF EXISTS TC_userEstados;

CREATE TABLE TC_userEstados (
	id INT PRIMARY KEY ,
	descripcion varchar(255) NULL
);

insert into TC_userEstados values (1,'activo');
insert into TC_userEstados values (2,'inactivo');
insert into TC_userEstados values (3,'bloqueado');




DROP TABLE  IF EXISTS TC_userPerfiles;

CREATE TABLE TC_userPerfiles (
	id integer PRIMARY KEY,
	descripcion varchar(255) NULL
);

insert into TC_userPerfiles values (1,'super');
insert into TC_userPerfiles values (2,'admin');
insert into TC_userPerfiles values (3,'normal');
