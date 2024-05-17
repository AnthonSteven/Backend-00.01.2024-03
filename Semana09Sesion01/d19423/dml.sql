-- DML

/*

Insert  -> Create	-> Post 
Select	-> Read		-> Get
Update  -> Update	-> Update
Delete  -> Delete	-> Delete
*/

Select * from Customers;

Select companyName, ContactName from Customers;

select 
	CompanyName as [Nombre de la compañia],
	CustomerID as ID,
	Address as Direccion
from Customers;

select C.CustomerID,
c.City 
From Customers C;


select * from Customers
where City = 'London'

SELECT DISTINCT Country FROM Customers;


select * from Products
where UnitPrice <> 55


select * from Orders
where OrderDate >= '1996-08-01' and OrderDate <= '1996-08-31'

select * from Orders
where OrderDate between '1996-08-01' and  '1996-08-31';

SELECT * FROM Customers
WHERE city LIKE 'L_nd__';

SELECT * FROM Customers
WHERE city LIKE '%L%';


SELECT * FROM Customers
WHERE ContactName LIKE 'La%';

SELECT * FROM Customers
WHERE ContactName LIKE 'a%' OR ContactName LIKE 'b%';

SELECT * FROM Customers
WHERE ContactName LIKE '%a';

SELECT * FROM Customers
WHERE ContactName LIKE 'b%s';

SELECT * FROM Customers
WHERE ContactName LIKE '[bsp]%';


SELECT * FROM Products
where Discontinued = 0
ORDER BY CategoryID desc, UnitPrice;

SELECT * FROM Products
ORDER BY ProductName desc;


select * from Customers
where Fax is not null


SELECT top 5 * FROM Products
where Discontinued = 0
ORDER BY UnitPrice desc;

SELECT * FROM Customers
WHERE Country IN ('Germany', 'France', 'UK');
--= 'Germany' or Country = 'France' or Country ='UK'


/*Select all the columns
of all the records
in the Customers table:*/
SELECT * FROM Products
WHERE UnitPrice BETWEEN 10 AND 20;

