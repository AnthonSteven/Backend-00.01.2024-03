-- 1.  Seleccionar los clientes que viven en el país de "usa"
	SELECT * FROM Customers WHERE country = 'USA'

-- 2.  Seleccionar los proveedores que viven en la ciudad de "BERLIN"
	SELECT * FROM Suppliers WHERE city = 'BERLIN'

-- 3.  Seleccionar los empleados con código 3,5 y 8
	SELECT * FROM Employees WHERE employeeID IN (3,5,8)

-- 4.  Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5
	SELECT a.*,b.supplierID,b.companyName 
	       FROM Products a INNER JOIN Suppliers b ON a.supplierID=b.supplierID 
	       WHERE a.unitsInStock>0 And b.supplierID IN (1,3,5)

-- 5.  Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90
	SELECT * FROM Products WHERE unitPrice>=20 And unitPrice<=90 ORDER BY unitPrice

-- 6.  Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997
	SELECT * FROM Orders WHERE orderDate BETWEEN '01-01-1997' And '15-07-1997' ORDER BY orderDate

-- 7.  Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8
	SELECT * FROM Orders WHERE Year(orderDate)=1997 And employeeId IN (1,3,4,8) ORDER BY employeeId

-- 8.  Mostrar las ordenes hechas en el año 1996
	SELECT * FROM Orders WHERE Year(orderDate)=1996 ORDER BY orderDate

-- 9.  Mostrar las ordenes hechas en el año 1997 ,del mes de abril
	SELECT * FROM Orders WHERE Year(orderDate)=1997 And Month(orderDate)=4 ORDER BY orderDate

-- 10. Mostrar las ordenes hechas el primero de todos los meses, del año 1998
	SELECT * FROM Orders WHERE Year(orderDate)=1998 And Day(orderDate)=1 ORDER BY orderDate

-- 11. Mostrar todos los clientes que no tienen fax
	SELECT * FROM Customers WHERE fax='' Or fax IS NULL

-- 12. Mostrar todos los clientes que tienen fax
	SELECT * FROM Customers WHERE fax!='' Or fax IS NOT NULL

-- 13. Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece.
	SELECT productName,unitPrice,unitsInStock,b.categoryName 
	       FROM Products a INNER JOIN Categories b ON a.categoryId=b.categoryId 
	       ORDER BY productName

-- 14. Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora.
	SELECT productName,unitPrice,a.supplierID,b.companyName
	       FROM Products a INNER JOIN Suppliers b ON a.supplierID=b.supplierID 
	       ORDER BY productName

-- 15. Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto.
	SELECT a.orderId   As 'Nro.Orden',
	       b.productId As 'Producto',
	       quantity    As 'Cantidad',
	       unitPrice   As 'Precio',
	       discount    As 'Descuento',
	       (unitPrice - unitPrice*discount) * quantity AS 'Total Pagado'
	       FROM Orders a INNER JOIN [Order Details] b ON a.orderId=b.orderId

-- 16. Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo.
	SELECT a.orderId    As 'Nro.Orden',
	       orderDate    As 'Fecha',
	       b.productId  As 'Producto',
	       unitPrice    As 'Precio',
	       a.employeeID As 'Cod.Empleado',
	       c.firstname+' '+c.lastname As 'Nombre Empleado'
	       FROM Orders a INNER JOIN [Order Details] b ON a.orderId=b.orderId
	                     INNER JOIN Employees c       ON a.employeeID=c.employeeID
	                     
-- 17. Mostrar los 10 productos con menor stock
	SELECT TOP 10 * FROM Products ORDER BY unitsInStock

-- 18. Mostrar los 10 productos con mayor stock
	SELECT TOP 10 * FROM Products ORDER BY unitsInStock DESC

-- 19. Mostrar los 10 productos con menor precio
	SELECT TOP 10 * FROM Products ORDER BY unitPrice

-- 20. Mostrar los 10 productos con mayor precio
	SELECT TOP 10 * FROM Products ORDER BY unitPrice DESC

-- 21. Mostrar los 10 productos más baratos
	SELECT TOP 10 * FROM Products ORDER BY unitPrice

-- 22. Mostrar los 10 productos más caros
	SELECT TOP 10 * FROM Products ORDER BY unitPrice DESC

-- 23. Seleccionar todos los campos de la tabla clientes,ordenar por compania
	SELECT * FROM Customers ORDER BY companyName

-- 24. Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania
	SELECT * FROM Customers WHERE Left(companyName,1)='B' And country='UK' ORDER BY companyName

-- 25. Seleccionar todos los campos de productos de las categorias 1,3 y 5,ordenar por categoria
	SELECT * FROM Products WHERE categoryID IN (1,3,5) ORDER BY categoryID

-- 26. Seleccionar los productos cuyos precios unitarios estan entre 50 y 200
	SELECT * FROM Products WHERE unitPrice BETWEEN 50 And 200 ORDER BY unitPrice

-- 27. Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden
	SELECT c.companyName As 'Nombre',
	       a.customerId  As 'Id Compañia',
	       a.orderDate   As 'Fecha',
           unitPrice     As 'Precio',
	       b.productId   As 'Producto'
	       FROM Orders a INNER JOIN [Order Details] b ON a.orderId=b.orderId	
	                     INNER JOIN Customers       c ON a.customerId=c.customerId
	
-- 28. Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria.
	SELECT b.categoryName,Count(*) 
	       FROM Products a INNER JOIN Categories b ON a.categoryID=b.categoryID
	       GROUP BY b.categoryName

-- 29. Seleccionar los 5 productos mas vendidos
	SELECT TOP 5 OD.ProductID, P.ProductName,count(quantity) cantidad
		   FROM [Order Details] OD	INNER JOIN Products P ON OD.ProductID = P.ProductID
		   GROUP BY OD.ProductID,  P.ProductName
	       ORDER BY count(quantity) DESC

-- 30. Seleccionar los jefes de los empleados
	SELECT * FROM Employees WHERE title='Sales Manager' Or title='Vice President, Sales'

-- 31. Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129
	SELECT * FROM Products WHERE Left(productName,1)='M' And unitPrice BETWEEN 28 And 129 ORDER BY unitPrice

-- 32. Obtener todos los clientes del Pais de USA,Francia y UK
	SELECT * FROM Customers WHERE country IN ('USA','FRANCE','UK') ORDER BY country

-- 33. Obtener todos los productos descontinuados o con stock cero.
	SELECT * FROM Products WHERE discontinued=1 Or unitsInStock=0

-- 34. Obtener todas las ordenes hechas por el empleado King Robert
	SELECT b.lastname,b.firstname,a.*
	       FROM Orders a INNER JOIN Employees b ON a.employeeID=b.employeeID
	       WHERE b.lastname='KING' And b.firstname='ROBERT'

-- 35. Obtener todas las ordenes por el cliente cuya compania es "Que delicia"
	SELECT b.companyName,a.*
	       FROM Orders a INNER JOIN Customers b ON a.customerId=b.customerId
	       WHERE b.companyName='Que Delícia'

-- 36. Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew
	SELECT b.lastname,b.firstname,a.*
	       FROM Orders a INNER JOIN Employees b ON a.employeeID=b.employeeID
	       WHERE (b.lastname='KING'    And b.firstname='ROBERT') Or
	             (b.lastname='DAVOLIO' And b.firstname='NANCY') Or
	             (b.lastname='FULLER'  And b.firstname='ANDREW')
	       ORDER BY b.lastname,b.firstname

-- 37. Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257
	SELECT a.productId    As 'Cod.Producto',
		   b.productName  As 'Nombre Prod.',
		   b.unitPrice    As 'Precio',
		   b.unitsInStock As 'Stock',
		   a.OrderId      As 'Nro.Order'
	       FROM [Order Details] a INNER JOIN Products b ON a.productId=b.productId 
	       WHERE a.orderId='10257'

-- 38. Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy.
	SELECT b.productId    As 'Cod.Producto',
		   c.productName  As 'Nombre Prod.',
		   c.unitPrice    As 'Precio',
		   c.unitsInStock As 'Stock',
		   a.orderDate    As 'Fecha Ord.',
		   a.OrderId      As 'Nro.Order'		   
	       FROM Orders a INNER JOIN [Order Details] b ON a.orderID  =b.orderID
	                     INNER JOIN Products        c ON b.productId=c.productId 
	       WHERE Year(a.orderDate) >= 1997
	       ORDER BY a.orderDate

-- 39. Calcular los 15 productos mas caros
	SELECT TOP 15 * FROM Products ORDER BY unitPrice DESC

-- 40. Calcular los 5 productos mas baratos
	SELECT TOP 5 * FROM Products ORDER BY unitPrice 

-- 41. Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock.
	SELECT b.categoryName,productName,unitPrice,unitsInStock
	       FROM Products a INNER JOIN Categories b ON a.categoryId=b.categoryId 
	       ORDER BY b.categoryName,productName

-- 42. Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P
	SELECT b.categoryName,productName
	       FROM Products a INNER JOIN Categories b ON a.categoryId=b.categoryId 
	       WHERE Left(productName,1)<>'P'
	       ORDER BY b.categoryName,productName

-- 43. Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria.
	SELECT a.categoryName,SUM(b.unitsInStock) As 'Total Stock'
	       FROM Categories a INNER JOIN Products b ON a.categoryId=b.categoryId 
	       GROUP BY a.categoryName

-- 44. Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794
	SELECT d.companyName  As 'Nombre del Cliente',
		   e.companyName  As 'Nombre del Proveedor',
           f.firstname+' '+f.LastName As 'Nombre del Empleado',
		   c.productname  As 'Nombre del Producto',
		   a.orderID      As 'Nro.Order.'
	       FROM Orders a INNER JOIN [Order Details] b ON a.orderId=b.orderId
	                     INNER JOIN Products        c ON b.productId=c.productId 
	                     INNER JOIN Customers       d ON a.customerID=d.customerID
	                     INNER JOIN Suppliers       e ON c.supplierId=e.supplierId
	                     INNER JOIN Employees       f ON a.employeeID=f.employeeID
	       WHERE a.orderId='10794'

-- 45. Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año.
	SELECT a.customerID,a.companyName,Year(b.orderDate),Count(*)  
	       FROM Customers a INNER JOIN Orders  b ON a.customerID=b.customerID
	       GROUP BY a.customerID,a.companyName,Year(b.orderDate)
	       ORDER BY a.customerID,Year(b.orderDate)

-- 46. Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes.
	SELECT Year(OrderDate)  As 'Año',
	       Month(OrderDate) As 'Mes',
	       Count(*)         As 'Num.Ordenes'
	       FROM Orders 
	       GROUP BY Year(OrderDate),Month(OrderDate)
	       ORDER BY Año,Mes

-- 47. Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra,
--     código del producto, cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora y la
--     ciudad del proveedor ,usar Join

	SELECT a.companyName As 'Cliente',
	       b.orderID     As 'Nro.Orden',
	       b.orderDate   As 'Fecha',
	       c.productId   As 'Cod.Prod',
	       c.quantity    As 'Cantidad',
	       d.productName As 'Producto',
	       e.companyName As 'Provedor',
	       e.city        As 'Ciudad Prov' 
	       FROM Customers a INNER JOIN Orders          b ON a.customerId=b.customerId
	                        INNER JOIN [Order Details] c ON b.orderID=c.orderID
	                        INNER JOIN Products        d ON c.productID=d.productID
	                        INNER JOIN Suppliers       e ON d.supplierID=e.supplierID

-- 48. Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, la fecha de la orden de
--     compra, el código del producto,cantidad pedida del producto, nombre del producto y el nombre de la compañía proveedora, usas JOIN.
--     Solamente las compañías proveedoras que comienzan con la letra de la A hasta la letra G,además la cantidad pedida del producto
--     debe estar entre 23 y 187.

	SELECT a.companyName As 'Cliente',
	       a.contactName As 'Contacto',
	       b.orderID     As 'Nro.Orden',
	       b.orderDate   As 'Fecha Ord.',
	       c.productId   As 'Cod.Producto',
	       c.quantity    As 'Cantidad',
	       d.productName As 'Producto',
	       e.companyName As 'Provedor'
	       FROM Customers a INNER JOIN Orders          b ON a.customerId=b.customerId
	                        INNER JOIN [Order Details] c ON b.orderID=c.orderID
	                        INNER JOIN Products        d ON c.productID=d.productID
						    INNER JOIN Suppliers       e ON d.supplierID=e.supplierID
           WHERE (Left(e.companyName,1) BETWEEN 'A' And 'G') And (c.quantity BETWEEN 23 And 187)
           ORDER BY e.companyName
