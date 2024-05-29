-- 1.- Seleccionar los clientes que viven en el país de "usa"
Select * from Customers where country = 'USA';

-- 2.- Seleccionar los proveedores que viven en la ciudad de "BERLIN"

Select * from Suppliers s where city = 'Berlin';

-- 3.- Seleccionar los empleados con código 3,5 y 8

select * from Employees e where EmployeeID in (3,5,8)

-- 4.- Seleccionar los productos que tienen stock mayor
-- que cero y son del proveedor 1,3 y 5

select * from Products p where Unit > 0 and SupplierID in (1,3,5);

-- 5.- Seleccionar los productos con precio mayor 
-- o igual a 20 y menor o igual a 90

select * from Products p where Price >= 20 and Price <= 90;

-- 6.- Mostrar las órdenes de compra entre las 
-- fechas 01/01/1997 al 15/07/1997

select * from Orders o where OrderDate BETWEEN '1997-01-01 00:00:00' and '1997-07-15 00:00:00'

-- 7.- Mostrar las órdenes de compra hechas en el año 1997, 
-- que pertenecen a los empleados con códigos 1 ,3 ,4 ,8

select * from Orders o where YEAR(OrderDate) = '1997' and 
EmployeeID in (1,3,4,8);

-- 8.- Mostrar las ordenes hechas en el año 1996

select * from Orders o where YEAR(OrderDate) = '1996';

-- 9.- Mostrar las ordenes hechas en el año 1997 ,del mes de abril

select * from Orders o where YEAR(OrderDate) = '1997' 
and MONTH(OrderDate) = 4;

-- 10.- Mostrar las ordenes hechas el primero de 
-- todos los meses, del año 1998

select * from Orders o where YEAR(OrderDate) = '1998' 
and DAY(OrderDate) = 1;

-- 11.- Mostrar todos los clientes que no tienen fax

select * from Customers where Fax is null

-- 12.- Mostrar todos los clientes que tienen fax

select Fax, * from Customers s where Fax is not null;

-- 13 .- Mostrar el nombre del producto, el precio, el stock 
-- y el nombre de la categoría a la que pertenece.

select 
    UnitPrice as precio, 
    UnitsInStock as stock, 
    c.CategoryName as nombre_categoria 
from Products p
    join Categories c 
    on p.CategoryID = c.CategoryID

-- 14.- Mostrar el nombre del producto, el precio 
-- producto, el código del proveedor y el nombre de la compañía proveedora

select 
    p.ProductName as nombre, 
    p.UnitPrice as precio,
    s.SupplierID as codigo_proveedor,
    s.CompanyName as nombre_compania 
from Products p 
    join Suppliers s 
        on s.SupplierID = p.SupplierID;

-- 15.- Mostrar el número de orden, el código del producto, el precio, 
-- la cantidad y el total pagado por producto.

select 
    od.OrderID as numero_orden, 
    od.ProductID as codigo_producto, 
    od.UnitPrice as precio_unitario, 
    od.Quantity as cantidad, 
    (od.UnitPrice * od.Quantity) as TOTAL 
from [Order Details] od;

-- 16.- Mostrar el número de la orden, fecha, código del producto, 
-- precio, código del empleado y su nombre completo.

select 
    o.OrderID as id_orden, 
    o.OrderDate as fecha, 
    od.ProductID as codigo_producto,  
    od.UnitPrice as precio_unitario, 
    o.EmployeeID as empleado_id, 
    e.FirstName as nombre_completo  
from Orders o
    join [Order Details] od
        on od.OrderID = o.OrderID
    join Employees e
        on e.EmployeeID = o.EmployeeID

-- 17.- Mostrar los 10 productos con menor stock

select top 10 * from Products order by UnitsInStock asc;

-- 18.- Mostrar los 10 productos con mayor stock

select top 10 * from Products order by UnitsInStock desc;

-- 19.- Mostrar los 10 productos con menor precio

select top 10 * from Products order by UnitPrice asc;

-- 20.- Mostrar los 10 productos con mayor precio

select top 10 * from Products order by UnitPrice desc;

-- 21.- Mostrar los 10 productos más baratos

select top 10 * from Products order by UnitPrice asc;

-- 22.- Mostrar los 10 productos más caros

select top 10 * from Products order by UnitPrice desc;

-- 23.- Seleccionar todos los campos de la tabla clientes,ordenar por compania

select * from Customers order by CompanyName ASC

-- 24.- Seleccionar todos los campos de clientes,cuya compania empiece con la letra B 
-- y pertenezcan a UK ,ordenar por nombre de la compania

select * from 
Customers where 
    CompanyName LIKE 'B%' 
    and Country = 'UK' 
order by CompanyName asc;

-- 25.- eleccionar todos los campos de productos de las categorias 1,3 y 5 ,ordenar por categoria

select * from 
    Products 
    where CategoryID in (1,3,5) 
order by CategoryID desc;

-- 26.- Seleccionar los productos cuyos precios unitarios estan entre 50 y 200

select * from 
    Products 
    where UnitPrice between 50 and 200;

-- 27.- Visualizar el nombre y el id de la compania del cliente,fecha,precio 
-- unitario y producto de la orden

select 
    c.CompanyName, 
    c.CustomerID, 
    o.OrderDate, 
    od.UnitPrice, 
    p.ProductName 
from Orders o
    join [Order Details] od
        on od.OrderID = o.OrderID
    join Products p 
        on p.ProductID = od.ProductId
    join Customers c
        on c.CustomerID = o.CustomerID

-- 28.- Visualizar el nombre de la categoria y el numero de 
-- productos que hay por cada categoria

select c.CategoryID, c.CategoryName, count(p.ProductID) as numero_productos from Products p
join Categories c
    on p.CategoryID = c.CategoryID
GROUP by c.CategoryID, c.CategoryName

-- 29.- Seleccionar los 5 productos mas vendidos

select top 5 p.ProductName, sum(od.Quantity) as total_vendido from [Order Details] as od
join Products p
    on p.ProductID = od.ProductID
group by p.ProductName
order by total_vendido desc

-- 30.- Seleccionar los jefes de los empleados

select 
    e1.EmployeeID as empleado, 
    e1.FirstName, e2.EmployeeID as jefe, 
    e2.FirstName as jefe_name 
from Employees e1
    inner JOIN Employees e2
        on e1.ReportsTo = e2.EmployeeID;

-- 31.- Obtener todos los productos cuyo nombre comienzan 
-- con M y tienen un precio comprendido entre 28 y 129

select * from Products p
join [Order Details] od
    on od.ProductID = p.ProductID
where ProductName like 'M%'
and od.UnitPrice between 28 and 129

-- 32.- Obtener todos los clientes del Pais de USA,Francia y UK

select * from Customers where Country in ('USA', 'France', 'UK')

-- 33.- Obtener todos los productos descontinuados o con stock cero.

select * from Products where Discontinued = 1 or UnitsInStock = 0;

-- 34.- Obtener todas las ordenes hechas por el empleado King Robert (subquerys)

select * from 
    Orders where 
        EmployeeID = 
        (
            select 
                EmployeeID 
            from Employees 
            where LastName = 'King' 
            and  FirstName = 'Robert'
        )

-- 35.- Obtener todas las ordenes por el cliente cuya compania es "Que Delícia"

select * from Orders o
join Customers c
    on c.CustomerID = o.CustomerID
where c.CompanyName = 'Que Delícia'

-- 36,- Obtener todas las ordenes hechas por el empleado 
-- King Robert,Davolio Nancy y Fuller Andrew

select * from 
    Orders where 
        EmployeeID in
        (
            select 
                EmployeeID 
            from Employees 
            where LastName IN ('King', 'Davolio', 'Fuller') 
            and  FirstName IN ('Robert', 'Nancy', 'Andrew')
        )

-- 37.- Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257

select o.OrderID, p.ProductName, p.UnitPrice, p.UnitsInStock from Orders o
join [Order Details] od
    on od.OrderID = o.OrderID
join Products p
    on p.ProductID = od.ProductID
where o.OrderID = '10257'

-- 38.- Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes 
-- hechas desde 1997 hasta la fecha de hoy.

select o.OrderDate, o.OrderID, p.ProductName, p.UnitPrice, p.UnitsInStock from Orders o
join [Order Details] od
    on od.OrderID = o.OrderID
join Products p
    on p.ProductID = od.ProductID
where YEAR(o.OrderDate) between  1997 and YEAR(GETDATE())

-- NOTA: Esta funcion saca el current date.
select GETDATE()

-- 41.- Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock.

select c.CategoryName, p.ProductName, p.UnitPrice, p.UnitsInStock from Products p
join Categories c
    on c.CategoryID = p.CategoryID

-- 42.- Obtener el nombre de todas las categorias y los nombres de sus 
-- productos,solo los productos que su nombre no comience con la letra P

select c.CategoryName, p.ProductName, p.UnitPrice, p.UnitsInStock from Products p
join Categories c
    on c.CategoryID = p.CategoryID
where p.ProductName LIKE 'P%';

-- 43.- Calcular el stock de productos por cada categoria.Mostrar el 
-- nombre de la categoria y el stock por categoria.

select c.CategoryName, SUM(c.CategoryID) from Products p 
join Categories c
    on c.CategoryID = p.CategoryID
GROUP BY c.CategoryName

-- 44.- Obtener el Nombre del cliente,Nombre del 
-- Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794

select c.CompanyName, s.CompanyName, e.FirstName, e.LastName, p.ProductName from Orders o
join [Order Details] od
    on o.OrderID = od.OrderID
join Customers c
    on c.CustomerID = o.CustomerID
join Products p
    on p.ProductID = od.ProductID
join Suppliers s
    on s.SupplierID = p.SupplierID
join Employees e
    on e.EmployeeID = o.EmployeeID
where o.OrderID = '10794'

-- 45.- Mostrar el numero de ordenes de cada uno de los clientes 
-- por año,luego ordenar codigo del cliente y el año. 

select o.CustomerID, YEAR(o.OrderDate), COUNT(*) 
    from Orders o
GROUP by o.CustomerID, o.OrderDate
ORDER by o.CustomerID, o.OrderDate

-- 46.- Contar el numero de ordenes que se han realizado por años y 
-- meses ,luego debe ser ordenado por año y por mes.

select YEAR(o.OrderDate), MONTH(o.OrderDate), COUNT(*) 
    from Orders o
GROUP by o.OrderDate
ORDER by o.OrderDate

-- 47.- Seleccionar el nombre de la 
-- compañía del cliente,él código de la orden de compra,la 
-- fecha de la orden de compra, código del producto, 
-- cantidad pedida del producto,nombre del producto, el nombre 
-- de la compañía proveedora y la ciudad del proveedor ,usar Join

select c.CompanyName, o.OrderID, o.OrderDate, p.ProductID, od.Quantity, p.ProductName, s.CompanyName, s.City  from Orders o
join [Order Details] od
    on od.OrderID = o.OrderID
join Products p
    on p.ProductID = od.ProductID
join Customers c
    on c.CustomerID = o.CustomerID
join Suppliers s
    on s.SupplierID = p.SupplierID
    
-- 48.- Seleccionar el nombre de la compañía del cliente, nombre del contacto,
-- el código de la orden de compra, la fecha de la orden de compra, el código 
-- del producto,cantidad pedida del producto, nombre del producto y el nombre 
-- de la compañía proveedora, usas JOIN.
-- Solamente las compañías proveedoras que 
-- comienzan con la letra de la A 
-- hasta la letra G,además la cantidad pedida 
-- del producto debe estar entre 23 y 187.

select c.CompanyName, o.OrderID, o.OrderDate, p.ProductID, od.Quantity, p.ProductName, s.CompanyName, s.City  from Orders o
join [Order Details] od
    on od.OrderID = o.OrderID
join Products p
    on p.ProductID = od.ProductID
join Customers c
    on c.CustomerID = o.CustomerID
join Suppliers s
    on s.SupplierID = p.SupplierID
where s.CompanyName like '[A-G]%'
and od.Quantity BETWEEN 23 and 187