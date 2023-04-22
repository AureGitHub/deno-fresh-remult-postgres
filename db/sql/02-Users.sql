
DROP TABLE IF EXISTS T_Users;

CREATE TABLE T_Users (
	id  serial PRIMARY KEY,	
	"name" varchar(255) NULL,
	email varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NULL,	
	fk_estado INT,
	fk_perfil INT,
	created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_TC_userEstados FOREIGN KEY (fk_estado)
	REFERENCES TC_userEstados (id),
	CONSTRAINT fk_TC_userPerfiles FOREIGN KEY (fk_perfil)
	REFERENCES TC_userPerfiles (id)

);



INSERT INTO public.t_users
("name", email, "password", fk_estado, fk_perfil, created_at, updated_at)
VALUES('Aure', 'aure.desande@gmail.com', 'jas11jas11', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);