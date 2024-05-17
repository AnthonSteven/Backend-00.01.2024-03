SELECT Min(UnitsInStock)
FROM Products;
SELECT MAX(UnitsInStock)
FROM Products;

SELECT MIN(UnitPrice) AS SmallestPrice, CategoryID
FROM Products
GROUP BY CategoryID;

Select * from Products;
Select * from Products
where CategoryID = 1;
Select min (UnitPrice) from Products
where CategoryID = 1;
Select min (UnitPrice) from Products
where CategoryID = 2;

SELECT COUNT(*)
FROM Products;

SELECT COUNT(*) AS [Number of records], CategoryID
FROM Products
GROUP BY CategoryID;

select * from [Order Details]

SELECT SUM(Quantity)
FROM [Order Details]
WHERE ProductId = 11;

SELECT OrderID, SUM(Quantity) AS [Total Quantity]
FROM [Order Details]
GROUP BY OrderID;

SELECT AVG(UnitPrice)
FROM Products;

SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
order by COUNT(CustomerID);


Select 
o.OrderID as [Numero Factura],
O.OrderDate as Fecha,
C.CompanyName 'Nombre Cliente',
'Contacto del Clente'= C.ContactName ,
E.Title + ' '+ E.FirstName + ' ' + E.LastName as Vendedor,
S.CompanyName as 'Enviado por',
O.ShipAddress as 'Enviado a'
from Orders O 
inner join Customers C on O.CustomerID = C.CustomerID
inner join Employees E on O.EmployeeID = E.EmployeeID
inner join Shippers S on O.ShipVia = S.ShipperID