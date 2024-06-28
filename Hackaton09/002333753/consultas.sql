
Select * from Customers where country = 'USA';

Select * from suppliers where city = 'Berlin';


Select * from employees where EmployeeID in (3,5,8);


SELECT *
FROM products
WHERE stock > 0
AND suppliers IN (1, 3, 5);


SELECT *
FROM products
WHERE price >= 20 AND price <= 90;


SELECT *
FROM orders
WHERE OrderDate BETWEEN '1997-01-01' AND '1997-07-15';

SELECT orders.*
FROM ordenes_compra OC
JOIN empleados E ON OC.codigo_empleado = E.codigo
WHERE OC.fecha_orden >= '1997-01-01' AND OC.fecha_orden <= '1997-12-31'
AND E.codigo IN (1, 3, 4, 8);


SELECT *
FROM orders
WHERE YEAR(OrderDate) = 1996;

-
SELECT *
FROM orders
WHERE YEAR(OrderDate) = 1997 AND MONTH(OrderDate) = 4;

SELECT *
FROM orders
WHERE YEAR(OrderDate) = 1998 AND DAY(OrderDate) = 1;

SELECT *
FROM customers
WHERE Fax IS NULL;

SELECT *
FROM customers
WHERE Fax IS NOT NULL;

SELECT p.ProductName, p.Price, p.Stock, c.CategoryName
FROM products p
JOIN categories c ON p.CategoryID = c.CategoryID;

SELECT pr.ProductName, pr.Price, pr.SupplierID, su.SupplierName
FROM products pr
JOIN suppliers su ON pr.SupplierID = su.SupplierID;

SELECT od.OrderID, od.ProductID, p.Price, od.Quantity, (p.Price * od.Quantity) AS TotalPaid
FROM orderdetails od
JOIN products p ON od.ProductID = p.ProductID;

SELECT o.OrderID, o.OrderDate, od.ProductID, p.Price, o.EmployeeID, CONCAT(e.FirstName, ' ', e.LastName) AS FullName
FROM orders o
JOIN orderdetails od ON o.OrderID = od.OrderID
JOIN products p ON od.ProductID = p.ProductID
JOIN employees e ON o.EmployeeID = e.EmployeeID;

SELECT *
FROM products
ORDER BY Stock
LIMIT 10;

SELECT *
FROM products
ORDER BY Stock DESC
LIMIT 10;

SELECT *
FROM products
ORDER BY Price
LIMIT 10;

SELECT *
FROM products
ORDER BY Price DESC
LIMIT 10;
SELECT *
FROM products
ORDER BY Price
LIMIT 10;

SELECT *
FROM products
ORDER BY Price DESC
LIMIT 10;

SELECT *
FROM customers
ORDER BY CompanyName;

SELECT *
FROM customers
WHERE CompanyName LIKE 'B%' AND Country = 'UK'
ORDER BY CompanyName;

SELECT *
FROM products
WHERE CategoryID IN (1, 3, 5)
ORDER BY CategoryID;

SELECT *
FROM products
WHERE Price BETWEEN 50 AND 200;

SELECT c.CustomerID, c.CustomerName, o.OrderDate, od.UnitPrice, p.ProductName
FROM customers c
JOIN orders o ON c.CustomerID = o.CustomerID
JOIN orderdetails od ON o.OrderID = od.OrderID
JOIN products p ON od.ProductID = p.ProductID;

SELECT c.CategoryName, COUNT(p.ProductID) AS NumProductos
FROM categories c
JOIN products p ON c.CategoryID = p.CategoryID
GROUP BY c.CategoryName;

SELECT p.ProductName, SUM(od.Quantity) AS TotalVendido
FROM products p
JOIN orderdetails od ON p.ProductID = od.ProductID
GROUP BY p.ProductID
ORDER BY TotalVendido DESC
LIMIT 5;

SELECT e1.FirstName AS Empleado, e2.FirstName AS Jefe
FROM employees e1
JOIN employees e2 ON e1.ReportsTo = e2.EmployeeID;

SELECT *
FROM products
WHERE ProductName LIKE 'M%' AND Price BETWEEN 28 AND 129;

SELECT *
FROM customers
WHERE Country IN ('USA', 'France', 'UK');

SELECT *
FROM products
WHERE Discontinued = 1 OR Stock = 0;


SELECT *
FROM orders
WHERE EmployeeID = (
    SELECT EmployeeID
    FROM employees
    WHERE FirstName = 'King' AND LastName = 'Ana');




SELECT ProductID, ProductName, Price
FROM products
ORDER BY Price DESC
LIMIT 15;


SELECT ProductID, ProductName, Price
FROM products
ORDER BY Price
LIMIT 5;


SELECT c.CategoryName, p.ProductName, p.Price, p.Stock
FROM categories c
JOIN products p ON c.CategoryID = p.CategoryID;


SELECT c.CategoryName, p.ProductName
FROM categories c
JOIN products p ON c.CategoryID = p.CategoryID
WHERE p.ProductName NOT LIKE 'P%';


SELECT c.CategoryName, SUM(p.Stock) AS TotalStock
FROM categories c
JOIN products p ON c.CategoryID = p.CategoryID
GROUP BY c.CategoryName;


SELECT cu.CustomerName, su.SupplierName, CONCAT(em.FirstName, ' ', em.LastName) AS EmployeeName, p.ProductName
FROM orders o
JOIN customers cu ON o.CustomerID = cu.CustomerID
JOIN employees em ON o.EmployeeID = em.EmployeeID
JOIN orderdetails od ON o.OrderID = od.OrderID
JOIN products p ON od.ProductID = p.ProductID
JOIN suppliers su ON p.SupplierID = su.SupplierID
WHERE o.OrderID = 10794;


    CustomerID,
    YEAR(OrderDate) AS Year,
    COUNT(*) AS OrderCount
FROM 
    orders
GROUP BY 
    CustomerID, YEAR(OrderDate)
ORDER BY 
    CustomerID, YEAR(OrderDate);


    YEAR(OrderDate) AS Year,
    MONTH(OrderDate) AS Month,
    COUNT(*) AS OrderCount
FROM 
    orders
GROUP BY 
    YEAR(OrderDate), MONTH(OrderDate)
ORDER BY 
    YEAR(OrderDate), MONTH(OrderDate);


SELECT 
    c.CustomerName AS CompanyName,
    o.OrderID AS OrderCode,
    o.OrderDate AS OrderDate,
    od.ProductID AS ProductCode,
    od.Quantity AS QuantityOrdered,
    p.ProductName AS ProductName,
    s.SupplierName AS SupplierCompanyName,
    s.City AS SupplierCity
FROM 
    orders o
JOIN 
    customers c ON o.CustomerID = c.CustomerID
JOIN 
    orderdetails od ON o.OrderID = od.OrderID
JOIN 
    products p ON od.ProductID = p.ProductID
JOIN 
    suppliers s ON p.SupplierID = s.SupplierID;


SELECT 
    c.CustomerName AS CompanyName,
    c.ContactName AS ContactName,
    o.OrderID AS OrderCode,
    o.OrderDate AS OrderDate,
    od.ProductID AS ProductCode,
    od.Quantity AS QuantityOrdered,
    p.ProductName AS ProductName,
    s.SupplierName AS SupplierCompanyName
FROM 
    orders o
JOIN 
    customers c ON o.CustomerID = c.CustomerID
JOIN 
    orderdetails od ON o.OrderID = od.OrderID
JOIN 
    products p ON od.ProductID = p.ProductID
JOIN 
    suppliers s ON p.SupplierID = s.SupplierID
WHERE 
    s.SupplierName BETWEEN 'A' AND 'G'
    AND od.Quantity BETWEEN 23 AND 187;