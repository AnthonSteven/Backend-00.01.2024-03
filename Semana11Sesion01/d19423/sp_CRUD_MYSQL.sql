DROP PROCEDURE SP_CRUD_COLOR;
delimiter //
CREATE PROCEDURE SP_CRUD_COLOR (IN OPCION int, PARAM_DESCRIPCION varchar(200),PARAM_ACTIVO bool, PARAM_ID int, USUARIO int )
BEGIN 
if OPCION = 1 then 
begin 
insert into tbl_color(descripcion, usuarioCreacion) 
values 
  (PARAM_DESCRIPCION, USUARIO);
end;
ELSEIF OPCION = 2 then begin 
select 
  * 
from 
  tbl_color where tbl_color.activo <> 0;
end;
ELSEIF OPCION = 3 then begin 
Update tbl_color 
	set descripcion = IFNULL(PARAM_DESCRIPCION, descripcion),
	activo = IFNULL(PARAM_ACTIVO, activo),
    usuarioModificacion = USUARIO,
    fechaModificacion = CURRENT_TIMESTAMP()
    where id = PARAM_ID;
end;
ELSEIF OPCION = 4 then begin 
Update tbl_color 
	set activo = 0,
    usuarioModificacion = USUARIO,
    fechaModificacion = CURRENT_TIMESTAMP()
    where id = PARAM_ID;
end;
End IF;
END //

delimiter ;

call SP_CRUD_COLOR(1,'Atigrado',null,null,1);
call SP_CRUD_COLOR(2,null,null,null,null);
call SP_CRUD_COLOR(3,'Negrito',1, 2,1);
call SP_CRUD_COLOR(4,null,null, 2,1);


