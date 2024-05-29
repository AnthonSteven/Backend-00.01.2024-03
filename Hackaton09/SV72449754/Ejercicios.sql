/*1.  Seleccionar los clientes que viven en el país de "usa"  */
		-- Consulta a la Pregunta
        Select * from Customers where country = 'USA'; 

/*2.  Seleccionar los proveedores que viven en la ciudad de "BERLIN"  */
		-- Consulta a la Pregunta
		select *from Suppliers where City = 'BERLIN'  ;
		--
/*3.  Seleccionar los empleados con código 3,5 y 8  */

		-- Consultas iniciales
		select *from Employees; 

		-- Consulta a la Pregunta
		select *from Employees where EmployeeID=3 OR EmployeeID=5 OR EmployeeID=8;


/*4.  Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5  */

		-- Consultas iniciales
		Select *from Products order by SupplierID;
		
		-- Consulta a la Pregunta
		Select *from Products where UnitsInStock >0 AND (SupplierID =1 OR SupplierID =3 OR SupplierID =5); 



/*5.  Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90  */

		-- Consultas iniciales
		Select *from Products  order by UnitPrice; 

		-- Consulta a la Pregunta
		Select *from Products  where UnitPrice between 20 and 90  order by UnitPrice; 


/*6.  Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997  */

		-- Consultas iniciales
		select *from Orders order by OrderDate;

		-- Consulta a la Pregunta
		select *from Orders where OrderDate between '1997/01/01' and '1997/07/05'; 


/*7.  Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los 
	  empleados con códigos 1 ,3 ,4 ,8  */

	  -- Consultas iniciales
	  Select *from Orders;

	  -- Consulta a la Pregunta
	  Select OrderID,EmployeeID, Year(OrderDate) as 'Año de compra'
	  from Orders 
	  where Year(OrderDate)=1997 AND (EmployeeID=1 OR EmployeeID=3 OR EmployeeID=4 OR EmployeeID=8)
	  order by EmployeeID;


/*8.  Mostrar las ordenes hechas en el año 1996  */

      -- Consultas iniciales
	  Select *from Orders;

	  -- Consulta a la Pregunta
	  Select OrderID,EmployeeID, Year(OrderDate) as 'Año de compra'
	  from Orders 
	  where Year(OrderDate)=1996 order by EmployeeID;


/*9.  Mostrar las ordenes hechas en el año 1997 ,del mes de abril  */

	  -- Consultas iniciales
	  Select *from Orders;

	  -- Consulta a la Pregunta
	  Select OrderID, Year(OrderDate) as 'Año de compra',Datename(Month,OrderDate) as 'Mes de compra'
	  from Orders 
	    where Year(OrderDate)=1997 AND Month(OrderDate)=4 order by OrderID ;


/*10. Mostrar las ordenes hechas el primero de todos los meses, del año 1998  */

	  -- Consultas iniciales
	  Select *from Orders;

	  -- Consulta a la Pregunta
	  Select OrderID, format(OrderDate,'yyyy-MM-dd') as 'Fecha de compra'
	  from Orders 
	    where Year(OrderDate)=1998  AND Day(OrderDate)=1 order by OrderID ;


/*11. Mostrar todos los clientes que no tienen fax  */

	  -- Consultas iniciales
	  Select *from Customers;

	  -- Consulta a la Pregunta
	  Select *from Customers where Fax is NULL;


/*12. Mostrar todos los clientes que tienen fax  */

	  -- Consultas iniciales
	  Select *from Customers;

	  -- Consulta a la Pregunta
	  Select *from Customers where Fax is Not NULL;


/*13. Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece. */

	  -- Consultas iniciales
	  Select *from Products;
	  Select *from Categories;

	  -- Consulta a la Pregunta
	  Select p.ProductName,p.UnitPrice,p.UnitsInStock,c.CategoryName From Products as p
	  inner join Categories as c on p.CategoryID=c.CategoryID
	  


/*14. Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora.  */

	  -- Consultas iniciales
	  Select *from Products;
	  Select *from Suppliers;

	  -- Consulta a la Pregunta
	  Select p.ProductName as 'Nombre del producto',
	  p.UnitPrice as 'Precio del producto',
	  s.SupplierID as 'Código del proveedor',
	  s.CompanyName as 'Compañía proveedora' from Products as p
	  inner join Suppliers as s on p.SupplierID=s.SupplierID


/*15. Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto.  */

	  -- Consultas iniciales
	  Select *from [Order Details];
	 
	  -- Consulta a la Pregunta
	  Select OrderID,ProductID,UnitPrice,Quantity,UnitPrice*Quantity as 'Total por Producto' From [Order Details] 
	  

/*16. Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo. */

	  -- Consultas iniciales
	  Select *from Orders;
	  Select *from [Order Details];
	  Select *from Employees;
	 
	  -- Consulta a la Pregunta
	  Select o.OrderID,
	  format(o.OrderDate,'yyyy-MM-dd') as 'Fecha de Compra',
	  od.ProductID,
	  od.UnitPrice,
	  e.EmployeeID, 
	  e.FirstName+' '+e.LastName as 'Nombre del Empleado'
	  from Orders as o
	  inner join [Order Details] as od on o.OrderID=od.OrderID
	  inner join Employees as e on o.EmployeeID=e.EmployeeID



/*17. Mostrar los 10 productos con menor stock  */

	  -- Consulta a la Pregunta
	  Select TOP(10) *from Products order by UnitsInStock;
	  

/*18. Mostrar los 10 productos con mayor stock  */

	  -- Consulta a la Pregunta
	  Select TOP(10) *from Products order by UnitsInStock desc;


/*19. Mostrar los 10 productos con menor precio  */

	  -- Consulta a la Pregunta
	  Select TOP(10) *from Products order by UnitPrice;


/*20. Mostrar los 10 productos con mayor precio  */

       -- Consulta a la Pregunta
	  Select TOP(10) *from Products order by UnitPrice desc;


/*21. Mostrar los 10 productos más baratos  */

	  -- Consulta a la Pregunta
	  Select TOP(10) *from Products order by UnitPrice;


/*22. Mostrar los 10 productos más caros  */

      -- Consulta a la Pregunta
	  Select TOP(10) *from Products order by UnitPrice desc;


/*23. Seleccionar todos los campos de la tabla clientes,ordenar por compania  */

		-- Consulta a la Pregunta
		Select *from Customers order by CompanyName;


/*24. Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y 
	  pertenezcan a UK ,ordenar por nombre de la compania  */

	  -- Consulta a la Pregunta
		Select *from Customers 
		where (CompanyName like '[B]%') AND (Country='UK')
		order by CompanyName;



/*25. Seleccionar todos los campos de productos de las categorias 1,3 y 5
      ordenar por categoria  */

	   -- Consultas iniciales
	   Select *from Products;
	   Select *from Categories;

	   -- Consulta a la Pregunta
		Select *From Products as p
		inner join Categories as c on p.CategoryID=c.CategoryID
		where (p.CategoryID=1) OR(p.CategoryID=3) OR (p.CategoryID=5);
		

/*26. Seleccionar los productos cuyos precios unitarios estan entre 50 y 200  */

       -- Consulta a la Pregunta
	   Select *from Products where UnitPrice between 50 and 200;
	   

/*27. Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden  */

       -- Consultas iniciales
	   Select *from Customers;
	   Select *from Orders;
	   Select *from [Order Details];

	   -- Consulta a la Pregunta
	   Select c.CustomerID as 'Codigo del Cliente',
		   c.CompanyName as 'Compania del Cliente',
		   o.OrderID as 'Codigo de Orden de Compra',
		   o.OrderDate as 'Fecha de Orden de Compra',
		   od.ProductID as 'Codigo de Producto',
		   od.UnitPrice as 'Precio Unitario del Producto' 
		   from Customers as c
	   inner join Orders as o on c.CustomerID=o.CustomerID
	   inner join [Order Details] as od on o.OrderID=od.OrderID



/*28. Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria.  */

	   -- Consultas iniciales
	   Select *from Categories;
	   Select *from Products order by CategoryID;
	  
	   -- Consulta a la Pregunta
	   Select c.CategoryID,c.CategoryName,Count(p.ProductID) as 'Cantidad de Productos' from Categories as c
	   inner join Products as p on c.CategoryID=p.CategoryID
	   Group by c.CategoryID,c.CategoryName;


/*29. Seleccionar los 5 productos mas vendidos  */

       -- Consultas iniciales
	   Select *from [Order Details] order by ProductID;
	   Select *from Products;

	   -- Consulta a la Pregunta
	   Select Top(5) od.ProductID,p.ProductName,sum(od.Quantity) as 'Total de productos vendidos' from [Order Details] as od
	   inner join Products as p on od.ProductID=p.ProductID
	   group by od.ProductID,p.ProductName 
	   order by sum(od.Quantity) desc



/*30. Seleccionar los jefes de los empleados  */

       -- Consultas iniciales
	   Select *from Employees;
	  

/*31. Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129  */

       -- Consultas iniciales
	   Select *from Products order by ProductName;

	   -- Consulta a la Pregunta
	   Select *from Products
	   where (ProductName like '[M]%') AND (UnitPrice between 28 and 129)


/*32. Obtener todos los clientes del Pais de USA,Francia y UK  */

       -- Consultas iniciales
	   Select *from Customers;

	   -- Consulta a la Pregunta
	   Select *from Customers
	   where (Country='USA') or (Country='France') or (Country='UK')
	   order by Country;


/*33. Obtener todos los productos descontinuados o con stock cero.  */

       -- Consultas iniciales
	   Select *from Products order by ProductName;

	   -- Consulta a la Pregunta
	   Select *from Products
	   where (UnitsInStock=0) or (Discontinued=1)
	   order by ProductName


/*34. Obtener todas las ordenes hechas por el empleado King Robert  */

       -- Consultas iniciales
	   Select *from Orders;
	   Select *from Employees;

	   -- Consulta a la Pregunta
	   Select o.OrderID,o.EmployeeID,e.LastName+' ' +e.FirstName as 'Nombre del Empleado'
	   From Orders as o
	   inner join Employees as e on o.EmployeeID=e.EmployeeID
	   where e.EmployeeID=7


/*35. Obtener todas las ordenes por el cliente cuya compania es "Que delicia"  */

       -- Consultas iniciales
	   Select *from Orders order by CustomerID;
	   Select *from Customers order by CompanyName;

	   -- Consulta a la Pregunta
	   Select o.OrderID,c.CustomerID,c.CompanyName from Orders as o
	   inner join Customers as c on o.CustomerID=c.CustomerID
	   where c.CustomerID='QUEDE'

	   
/*36. Obtener todas las ordenes hechas por el empleado King
	  Robert,Davolio Nancy y Fuller Andrew  */

	   -- Consultas iniciales
	   Select *from Orders;
	   Select *from Employees;

	   -- Consulta a la Pregunta
	   Select o.OrderID,o.EmployeeID,e.LastName+' ' +e.FirstName as 'Nombre del Empleado'
	   From Orders as o
	   inner join Employees as e on o.EmployeeID=e.EmployeeID
	   where (e.EmployeeID=1) OR (e.EmployeeID=2) OR (e.EmployeeID=7)


/*37. Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257*/

		-- Consultas iniciales
		select *from [Order Details] order by OrderID;  
		select *from Products;							

		-- Consulta a la Pregunta
		select od.OrderID,
			od.ProductID,
			p.ProductName,
			od.Unitprice,
			p.UnitsInStock from [Order Details] as od
		inner join Products as p on od.ProductID=p.ProductID 
			where od.OrderID=10257
		group by od.OrderID,od.ProductID,p.ProductName,od.Unitprice,p.UnitsInStock;
			


/*38. Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy.*/

		-- Consultas iniciales
		select *from Orders order by OrderID;			
		select *from [Order Details] order by OrderID;  
		select *from Products;							
		
		-- Consulta a la Pregunta
		select o.OrderID,convert(varchar, o.OrderDate, 11) as 'orden de compra',
			p.ProductID,
			p.ProductName,
			p.UnitPrice,
			p.UnitsInStock from Orders as o
		inner join [Order Details] as od on o.OrderID=od.OrderID
		inner join Products as p on od.ProductID=p.ProductID 
			where convert(varchar, o.OrderDate, 11)>='97/01/01'
		group by o.OrderID,o.OrderDate ,p.ProductID,p.ProductName,p.UnitPrice,p.UnitsInStock order by o.OrderID ;
		

/*39. Calcular los 15 productos mas caros  */

	  -- Consulta a la Pregunta
	  Select TOP(15) *from Products order by UnitPrice;

/*40. Calcular los 5 productos mas baratos  */

	  -- Consulta a la Pregunta
	  Select TOP(5) *from Products order by UnitPrice desc;

/*41. Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock.  */

	  -- Consultas iniciales
	  Select *from Products;
	  Select *from Categories;

	  -- Consulta a la Pregunta
	  Select c.CategoryName,p.ProductName,p.UnitPrice,p.UnitsInStock From Categories as c
	  inner join Products as p on c.CategoryID=p.CategoryID
	  order by c.CategoryName


/*42. Obtener el nombre de todas las categorias y los nombres de sus productos,solo 
	  los productos que su nombre no comience con la letra P  */

	   -- Consultas iniciales
	  Select *from Products;
	  Select *from Categories;

	  -- Consulta a la Pregunta
	  Select c.CategoryName,p.ProductName,p.UnitPrice,p.UnitsInStock From Categories as c
	  inner join Products as p on c.CategoryID=p.CategoryID
	  Where p.ProductName like '[^p]%'
	  order by c.CategoryName


/*43. Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria.  */

	  -- Consultas iniciales
	  Select *from Products order by CategoryID;
	  Select *from Categories;

	  -- Consulta a la Pregunta
	  Select c.CategoryID, c.CategoryName as 'Nombre Categoria',Sum(p.UnitsInStock) as 'Total Stock' From Categories as c
	  inner join Products as p on c.CategoryID=p.CategoryID
	  Group by c.CategoryID,c.CategoryName
	  order by c.CategoryName


/*44. Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794  */
	  
	  -- Consultas iniciales
	  Select * from Customers;
	  Select * from Orders order by CustomerID,OrderDate;
	  Select * from [Order Details];
	  Select *from Products order by CategoryID; 
	  Select * from Suppliers;

	  -- Consulta a la Pregunta
	  Select o.OrderID,c.CompanyName as 'Nombre del cliente',
	  s.CompanyName as 'Nombre del Proveedor' ,
	  e.FirstName + ' ' + e.LastName as 'Nombre del Empleado',
	  p.ProductName as 'Nombre del Producto' from Customers as c
	  inner join Orders as o on c.CustomerID=o.CustomerID
	  inner join [Order Details] as od on o.OrderID=od.OrderID
	  inner join Employees as e on o.EmployeeID=e.EmployeeID
	  inner join Products as p on od.ProductID=p.ProductID
	  inner join Suppliers as s on p.SupplierID=s.SupplierID
	  Where o.OrderID=10794
	 


/*45. Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año.  */
	
	-- Consultas iniciales
	Select * from Orders order by CustomerID,OrderDate;
	Select * from Customers;

	Select CustomerID as 'Cliente',Year(OrderDate) as [Year],Count(OrderID) as [Cantidad]  
	from Orders
	Group by CustomerID,OrderDate order by CustomerID;

	-- Consulta a la Pregunta
	Select *
	From(Select CustomerID as 'Cliente',Year(OrderDate) as [Year],Count(OrderID) as [Cantidad]  
	from Orders 
	Group by CustomerID,Year(OrderDate)) as TA
	Pivot
	( SUM(Cantidad) For [Year] in ([1996],[1997],[1998])
	) as PV;





/*46. Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes.*/

	-- Consultas iniciales
	Select * from Orders;					
	Select count(OrderID) as 'Cantidad de Ordenes', year(OrderDate) [Año] ,Datename(month,OrderDate) [Mes] from Orders
	Group by OrderDate;						
	Select count(OrderID) as 'Cantidad de Ordenes', format(OrderDate,'yyyy-MM') as 'Fecha de Orden' from Orders
	Group by format(OrderDate,'yyyy-MM');	

	-- Consulta a la Pregunta
	Select *
	From (select  Year(OrderDate) [Year] ,Datename(Month,OrderDate) [Month] ,Count(OrderID) [CantidadOrdenes]
		 from Orders
		 Group by Year(OrderDate),Datename(Month,OrderDate)) as TA

	Pivot
		(SUM(CantidadOrdenes) For [Month] in([January],[February],[March],[April],[May],[June],
		[July],[August],[September],[October],[November],[December])) as PT;   


	-- Consulta a la Pregunta Opcional
	Select *
	From (select  Year(OrderDate) [Year] ,Month(OrderDate) [Month] ,Count(OrderID) [CantidadOrdenes]
		from Orders
		Group by Year(OrderDate),Month(OrderDate)) as AA

	Pivot
			(SUM(CantidadOrdenes) for [Month] in([1],[2],[3],[4],[5],[6],
			[7],[8],[9],[10],[11],[12])) as PT;


		

/*47. Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra, 
código del producto, cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora y la ciudad del proveedor ,usar Join*/

        -- Consultas iniciales
		select * from Customers;
		select * from Orders order by CustomerID;
		select * from [Order Details];
		select * from Products;
		select * from Suppliers;

		-- Consulta a la Pregunta
		Select c.CompanyName as 'Compañia del Cliente',
			o.OrderID as 'Codigo Orden de Compra',
			o.OrderDate as 'Fecha de la orden de compra',
			od.ProductID as 'Código del producto',
			od.Quantity as 'Cantidad pedida del producto',
			p.ProductName as 'Nombre del producto',
			s.CompanyName as 'Compañia Proveedora',
			s.Country as 'Pais del Proveedor' ,
			s.City as 'Ciudad del Proveedor' from Customers as c
			inner join Orders as o on c.CustomerID=o.CustomerID
			inner join [Order Details] as od on o.OrderID=od.OrderID
			inner join Products as p on od.ProductID=p.ProductID
			inner join Suppliers as s on p.SupplierID=s.SupplierID
		Group by c.CompanyName,o.OrderID,o.OrderDate,od.ProductID,od.Quantity,
				 p.ProductName,s.CompanyName,s.Country,s.City order by c.CompanyName


/*48. Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, la fecha de la orden de compra, 
  el código del producto,cantidad pedida del producto, nombre del producto y el nombre de la compañía proveedora, usas JOIN.Solamente 
  las compañías proveedoras que comienzan con la letra de la A hasta la letra G,además la cantidad pedida del producto debe estar entre 23 y 187.*/
 
        -- Consultas iniciales
		select * from Customers;
		select * from Orders order by CustomerID;
		select * from [Order Details];
		select * from Products;
		select * from Suppliers;

		-- Consulta a la Pregunta
		Select c.CompanyName as 'Compañia del Cliente',
			c.ContactName as 'Nombre del contacto',
			o.OrderID as 'Codigo Orden de Compra',
			o.OrderDate as 'Fecha de la orden de compra',
			od.ProductID as 'Código del producto',
			od.Quantity as 'Cantidad pedida del producto',
			p.ProductName as 'Nombre del producto',
			s.CompanyName as 'Compañia Proveedora' from Customers as c
			inner join Orders as o on c.CustomerID=o.CustomerID
			inner join [Order Details] as od on o.OrderID=od.OrderID
			inner join Products as p on od.ProductID=p.ProductID
			inner join Suppliers as s on p.SupplierID=s.SupplierID
				Where (c.CompanyName like '[A-G]%') AND (od.Quantity between 23 and 187 )
		Group by c.CompanyName,c.ContactName,o.OrderID,o.OrderDate,od.ProductID,od.Quantity,
				 p.ProductName,s.CompanyName order by c.CompanyName ;