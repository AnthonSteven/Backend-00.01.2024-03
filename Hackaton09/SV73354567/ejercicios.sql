--HACKATON 09 - DESARROLLADOR BACKEND - KEVIN CARLOS TENAZOA CUBA
--1.Seleccionar los clientes que viven en el país de "usa"
SELECT * 
FROM Customers 
WHERE country = 'USA';

--2.Seleccionar los proveedores que viven en la ciudad de "BERLIN"
SELECT * 
FROM Suppliers 
WHERE city = 'Berlin';
        
--3.  Seleccionar los empleados con código 3,5 y 8
SELECT * 
FROM Employees 
WHERE EmployeeID = 3 OR EmployeeID = 5 OR EmployeeID = 8;

--4.  Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5
SELECT ProductID, ProductName, SupplierID, Unit
FROM Products
WHERE Unit > 0
AND SupplierID IN (1, 3, 5);

--5.  Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90
SELECT ProductID, ProductName, Price
FROM Products
WHERE Price >= 20 AND Price <= 90;

--6.  Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997
SELECT OrderID, OrderDate
FROM Orders
WHERE OrderDate BETWEEN '1997-01-01' AND '1997-07-15';

--7.  Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8
SELECT OrderID, OrderDate, EmployeeID
FROM Orders
WHERE YEAR(OrderDate) = 1997
AND EmployeeID IN (1, 3, 4, 8);

--8.  Mostrar las ordenes hechas en el año 1996
SELECT OrderID, OrderDate
FROM Orders
WHERE YEAR(OrderDate) = 1996;

--9.  Mostrar las ordenes hechas en el año 1997 ,del mes de abril
SELECT OrderID, OrderDate
FROM Orders
WHERE YEAR(OrderDate) = 1997 AND MONTH(OrderDate) = 04;

--10. Mostrar las ordenes hechas el primero de todos los meses, del año 1998
SELECT OrderID, OrderDate
FROM Orders
WHERE YEAR(OrderDate) = 1998 AND DAY(OrderDate) = 01;

--11. Mostrar todos los clientes que no tienen fax
SELECT *
FROM Customers
WHERE Fax IS NULL OR Fax = '';

--12. Mostrar todos los clientes que tienen fax
SELECT *
FROM Customers
WHERE Fax IS NOT NULL OR Fax <> '';

--13. Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece.
SELECT 
    Products.ProductName,
    Products.Price,
    Products.Unit,
    Categories.CategoryName
FROM 
    Products
JOIN 
    Categories ON Products.CategoryID = Categories.CategoryID;

--14. Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora.
SELECT 
    Products.ProductName,
    Products.Price,
    Products.SupplierID,
    Suppliers.SupplierName
FROM 
    Products
JOIN 
    Suppliers ON Products.SupplierID = Suppliers.SupplierID;

-- 15.	Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto. ]
SELECT 
    OrderDetails.OrderID,
    OrderDetails.ProductID,
    Products.Price,
    OrderDetails.Quantity,
    (Products.Price * OrderDetails.Quantity) AS TotalPaid
FROM 
    OrderDetails
JOIN 
    Products ON OrderDetails.ProductID = Products.ProductID;

-- 16.	Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo. 
SELECT 
    Orders.OrderID,
    Orders.OrderDate,
    OrderDetails.ProductID,
    Products.Price,
    Orders.EmployeeID,
    CONCAT(Employees.FirstName, ' ', Employees.LastName) AS EmployeeFullName
FROM 
    Orders
JOIN 
    OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN 
    Products ON OrderDetails.ProductID = Products.ProductID
JOIN 
    Employees ON Orders.EmployeeID = Employees.EmployeeID; 

-- 17.	Mostrar los 10 productos con menor stock 
SELECT ProductID, ProductName, Stock
FROM Products
ORDER BY Stock ASC
LIMIT 10; 

-- 18.	Mostrar los 10 productos con mayor stock 
SELECT ProductID, ProductName, Stock
FROM Products
ORDER BY Stock DESC
LIMIT 10;

-- 19.	Mostrar los 10 productos con menor precio 
SELECT ProductID, ProductName, Price
FROM Products
ORDER BY Price ASC
LIMIT 10;

-- 20.	Mostrar los 10 productos con mayor precio 
SELECT ProductID, ProductName, Price
FROM Products
ORDER BY Price DESC
LIMIT 10; 

-- 21.	Mostrar los 10 productos más baratos 
SELECT ProductID, ProductName, Price
FROM Products
ORDER BY Price ASC
LIMIT 10; 

-- 22.	Mostrar los 10 productos más caros    
SELECT ProductID, ProductName, Price
FROM Products
ORDER BY Price DESC
LIMIT 10;

-- 23.	Seleccionar todos los campos de la tabla clientes,ordenar por compañia 
SELECT Customers.*, Suppliers.SupplierName
FROM Customers
INNER JOIN Suppliers
ORDER BY Suppliers.SupplierName;

-- 24.	Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania 
SELECT Customers.*, Suppliers.SupplierName AS NombreCompañia
FROM Customers
JOIN Suppliers
WHERE Suppliers.SupplierName LIKE 'B%' AND Customers.Country = 'UK'
ORDER BY Suppliers.SupplierName;

-- 25.	Seleccionar todos los campos de productos de las categorias 1,3 y 5 ,ordenar por categoria 
SELECT *
FROM Products
WHERE CategoryID IN (1, 3, 5)
ORDER BY CategoryID;

-- 26.	Seleccionar los productos cuyos precios unitarios estan entre 50 y 200 
SELECT *
FROM Products
WHERE Price BETWEEN 50 AND 200; 

-- 27.	Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden 
SELECT * 
FROM Customers;

-- 28.	Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria. 
SELECT 
    Categories.CategoryName,
    COUNT(Products.ProductID) AS NumeroDeProductos
FROM 
    Categories
JOIN 
    Products ON Categories.CategoryID = Products.CategoryID
GROUP BY 
    Categories.CategoryName; 

-- 29.	Seleccionar los 5 productos mas vendidos 
SELECT 
    OrderDetails.ProductID,
    Products.ProductName,
    SUM(Quantity) AS TotalVendido
FROM 
    OrderDetails
JOIN 
    Products ON OrderDetails.ProductID = Products.ProductID
GROUP BY 
    ProductID, ProductName
ORDER BY 
    TotalVendido DESC
LIMIT 5; 

-- 30.	Seleccionar los jefes de los empleados 
SELECT * 
FROM Employees
WHERE Title LIKE 'Jefe';

--31 Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129
SELECT * 
FROM Products 
WHERE Productname LIKE 'M%' AND Price BETWEEN 28 AND 129;

--32 Obtener todos los clientes del Pais de USA,Francia y UK
SELECT * 
FROM Customers 
WHERE Country in('USA','France','UK');

--33 Obtener todos los productos descontinuados o con stock cero.
SELECT * 
FROM Products 
WHERE Stock=0;

--34 Obtener todas las ordenes hechas por el empleado King Robert
SELECT e.lastname, e.firstname, o.orderid, o.orderdate, o.shipperid 
FROM Orders o INNER JOIN employees e ON o.employeeid=e.employeeid 
WHERE e.employeeid=7;

--35 Obtener todas las ordenes por el cliente cuya compania es "Que delicia"
SELECT * 
FROM ORDERS o INNER JOIN Customers c on o.customerid=c.customerid 
WHERE c.company="Que delicia";

--36 Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew
SELECT * 
FROM orders 
WHERE employeeid in(1,2,7);

--37 Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257
SELECT p.productid,p.productname,p.price,p.stock,o.orderid 
FROM products p INNER JOIN orderdetails o ON p.productid=o.productid WHERE orderid=10257;

--38 Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy.*/
SELECT p.productid,p.productname,p.price,p.stock,o.orderid,r.orderdate 
FROM products p 
INNER JOIN orderdetails o ON p.productid=o.productid 
INNER JOIN orders r ON o.orderid=r.orderid 
WHERE year(r.orderdate) BETWEEN 1997 AND 2024;

--39 Calcular los 15 productos mas caros
SELECT * 
FROM Products 
ORDER BY Price DES LIMIT 15;

--40 Calcular los 5 productos mas baratos
SELECT * 
FROM Products 
ORDER BY Price ASC LIMIT 15;

--41 Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock.
SELECT c.categoryname, p.productname, p.price, p.stock 
FROM Categories c INNER JOIN products p ON c.categoryid=p.categoryid;

--42 Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P*/
SELECT c.categoryname, p.productname, p.price, p.stock 
FROM Categories c INNER JOIN products p ON c.categoryid=p.categoryid 
WHERE p.productname NOT LIKE 'P%'; 

--43 Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria..*/
SELECT c.categoryname,sum(p.stock) AS 'stock total' 
FROM PRODUCTS p 
INNER JOIN categories c ON p.categoryid=c.categoryid;

--44 Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794
SELECT c.customername, s.suppliername,e.lastname,e.firstname, p.productname,o.orderid FROM Customers c 
INNER JOIN orders o ON c.customerid=o.customerid
INNER JOIN employees e ON o.employeeid=e.employeeid
INNER JOIN orderdetails d ON o.orderid=d.orderid
INNER JOIN products p ON d.productid=p.productid
INNER JOIN suppliers s ON p.supplierid=s.supplierid WHERE o.ORDERID=10294;

--45 Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año.
SELECT c.customerid, YEAR(o.orderdate) AS 'Año', COUNT(*) AS num_ordenes
FROM orders o
JOIN customers c ON o.customerid = c.customerid
GROUP BY c.customerid, YEAR(o.orderdate)
ORDER BY c.customerid, YEAR(o.orderdate);

--46 Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes.
SELECT YEAR(orderdate) AS 'Año', MONTH(orderdate) AS 'Mes', COUNT(*) AS 'Nro Ordenes'
FROM orders
GROUP BY YEAR(orderdate), MONTH(orderdate)
ORDER BY YEAR(orderdate), MONTH(orderdate);

/*47 Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la
orden de compra, código del producto, cantidad pedida del producto,nombre del producto, el nombre
de la compañía proveedora y la ciudad del proveedor ,usar Join*/
SELECT c.company, o.orderid, o.orderdate, d.productid, d.quantity, p.productname, s.suppliername,s.city FROM Customers c 
INNER JOIN orders o ON o.customerid=c.customerid
INNER JOIN orderdetails d ON o.orderid=d.orderid
INNER JOIN products p ON d.productid=d.productid
INNER JOIN Suppliers s ON p.supplierid=s.supplierid;

/*48 Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la 
orden de compra, la fecha de la orden de compra, el código del producto,cantidad pedida del
producto, nombre del producto y el nombre de la compañía proveedora, usas JOIN.Solamente las
compañías proveedoras que comienzan con la letra de la A hasta la letra G,además la cantidad
pedida del producto debe estar entre 23 y 187..*/
SELECT c.company,c.contactname, o.orderdate, d.orderid, d.productid, d.quantity, p.productname, s.suppliername FROM customers c
INNER JOIN orders o ON c.customerid=o.customerid
INNER JOIN orderdetails d ON o.orderid=d.orderid
INNER JOIN products p ON d.productid=p.productid
INNER JOIN suppliers s ON p.supplierid=s.supplierid
WHERE suppliername LIKE 'A%' OR suppliername LIKE 'B%' OR suppliername LIKE 'C%' OR 
suppliername LIKE 'D%' OR suppliername LIKE 'E%' OR suppliername LIKE 'F%' OR suppliername LIKE 'G%' AND d.quantity BETWEEN 23 AND 187