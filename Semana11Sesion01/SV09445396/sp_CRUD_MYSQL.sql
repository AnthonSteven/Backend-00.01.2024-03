--------------------
--- tbl_especie  ---
--------------------
DROP PROCEDURE SP_CRUD_ESPECIE;
delimiter //
CREATE PROCEDURE SP_CRUD_ESPECIE (IN OPCION int, PARAM_DESCRIPCION varchar(200),PARAM_ACTIVO bool, PARAM_ID int, USUARIO int )
BEGIN 
	if OPCION = 1 then 
		begin 
			insert into tbl_especie(descripcion, usuarioCreacion) values  (PARAM_DESCRIPCION, USUARIO);
		end;
	ELSEIF OPCION = 2 then 
		begin 
			select  *  from  tbl_especie where tbl_especie.activo <> 0;
		end;
	ELSEIF OPCION = 3 then 
		begin 
			Update tbl_especie 
				set descripcion = IFNULL(PARAM_DESCRIPCION, descripcion),
				    activo = IFNULL(PARAM_ACTIVO, activo),
				    usuarioModificacion = USUARIO,
				    fechaModificacion = CURRENT_TIMESTAMP()
				where id = PARAM_ID;
		end;
	ELSEIF OPCION = 4 then 
		begin 
			Update tbl_especie set activo = 0, usuarioModificacion = USUARIO,	fechaModificacion = CURRENT_TIMESTAMP()
				where id = PARAM_ID;
		end;
	end if;
END //

delimiter ;


--------------------
--- tbl_raza  ---
--------------------
DROP PROCEDURE SP_CRUD_RAZA;
delimiter //
CREATE PROCEDURE SP_CRUD_RAZA (IN OPCION int, PARAM_DESCRIPCION varchar(200),PARAM_ACTIVO bool, PARAM_ID int, USUARIO int )
BEGIN 
	if OPCION = 1 then 
		begin 
			insert into tbl_raza(descripcion, usuarioCreacion) values  (PARAM_DESCRIPCION, USUARIO);
		end;
	ELSEIF OPCION = 2 then 
		begin 
			select  *  from  tbl_raza where tbl_raza.activo <> 0;
		end;
	ELSEIF OPCION = 3 then 
		begin 
			Update tbl_raza 
				set descripcion = IFNULL(PARAM_DESCRIPCION, descripcion),
				    activo = IFNULL(PARAM_ACTIVO, activo),
				    usuarioModificacion = USUARIO,
				    fechaModificacion = CURRENT_TIMESTAMP()
				where id = PARAM_ID;
		end;
	ELSEIF OPCION = 4 then 
		begin 
			Update tbl_raza set activo = 0, usuarioModificacion = USUARIO,	fechaModificacion = CURRENT_TIMESTAMP()
				where id = PARAM_ID;
		end;
	end if;
END //

delimiter ;


---------------------------
--- tbl_tipo_documento  ---
---------------------------
DROP PROCEDURE SP_CRUD_TIPO_DOCUMENTO;
delimiter //
CREATE PROCEDURE SP_CRUD_TIPO_DOCUMENTO (IN OPCION int, PARAM_DESCRIPCION varchar(200),PARAM_ACTIVO bool, PARAM_ID int, USUARIO int )
BEGIN 
	if OPCION = 1 then 
		begin 
			insert into tbl_tipo_documento(descripcion, usuarioCreacion) values  (PARAM_DESCRIPCION, USUARIO);
		end;
	ELSEIF OPCION = 2 then 
		begin 
			select  *  from  tbl_tipo_documento where tbl_tipo_documento.activo <> 0;
		end;
	ELSEIF OPCION = 3 then 
		begin 
			Update tbl_tipo_documento
				set descripcion = IFNULL(PARAM_DESCRIPCION, descripcion),
				    activo = IFNULL(PARAM_ACTIVO, activo),
				    usuarioModificacion = USUARIO,
				    fechaModificacion = CURRENT_TIMESTAMP()
				where id = PARAM_ID;
		end;
	ELSEIF OPCION = 4 then 
		begin 
			Update tbl_tipo_documento set activo = 0, usuarioModificacion = USUARIO,	fechaModificacion = CURRENT_TIMESTAMP()
				where id = PARAM_ID;
		end;
	end if;
END //

delimiter ;


-------------------------
--- tbl_nacionalidad  ---
-------------------------
DROP PROCEDURE SP_CRUD_NACIONALIDAD;
delimiter //
CREATE PROCEDURE SP_CRUD_NACIONALIDAD (IN OPCION int, PARAM_DESCRIPCION varchar(200),PARAM_ACTIVO bool, PARAM_ID int, USUARIO int )
BEGIN 
	if OPCION = 1 then 
		begin 
			insert into tbl_nacionalidad(descripcion, usuarioCreacion) values  (PARAM_DESCRIPCION, USUARIO);
		end;
	ELSEIF OPCION = 2 then 
		begin 
			select  *  from  tbl_nacionalidad where tbl_nacionalidad.activo <> 0;
		end;
	ELSEIF OPCION = 3 then 
		begin 
			Update tbl_nacionalidad
				set descripcion = IFNULL(PARAM_DESCRIPCION, descripcion),
				    activo = IFNULL(PARAM_ACTIVO, activo),
				    usuarioModificacion = USUARIO,
				    fechaModificacion = CURRENT_TIMESTAMP()
				where id = PARAM_ID;
		end;
	ELSEIF OPCION = 4 then 
		begin 
			Update tbl_nacionalidad set activo = 0, usuarioModificacion = USUARIO,	fechaModificacion = CURRENT_TIMESTAMP()
				where id = PARAM_ID;
		end;
	end if;
END //

delimiter ;


--------------------
--- tbl_vacunas  ---
--------------------
DROP PROCEDURE SP_CRUD_VACUNAS;
delimiter //
CREATE PROCEDURE SP_CRUD_VACUNAS (IN OPCION int, PARAM_DESCRIPCION varchar(200),PARAM_ACTIVO bool, PARAM_ID int, USUARIO int )
BEGIN 
	if OPCION = 1 then 
		begin 
			insert into tbl_vacunas(descripcion, usuarioCreacion) values  (PARAM_DESCRIPCION, USUARIO);
		end;
	ELSEIF OPCION = 2 then 
		begin 
			select  *  from  tbl_vacunas where tbl_vacunas.activo <> 0;
		end;
	ELSEIF OPCION = 3 then 
		begin 
			Update tbl_vacunas
				set descripcion = IFNULL(PARAM_DESCRIPCION, descripcion),
				    activo = IFNULL(PARAM_ACTIVO, activo),
				    usuarioModificacion = USUARIO,
				    fechaModificacion = CURRENT_TIMESTAMP()
				where id = PARAM_ID;
		end;
	ELSEIF OPCION = 4 then 
		begin 
			Update tbl_vacunas set activo = 0, usuarioModificacion = USUARIO,	fechaModificacion = CURRENT_TIMESTAMP()
				where id = PARAM_ID;
		end;
	end if;
END //

delimiter ;