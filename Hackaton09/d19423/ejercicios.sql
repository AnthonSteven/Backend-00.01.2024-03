-- 1.  Seleccionar los clientes que viven en el país de "usa"
select * from Customers
where Country = 'USA';
-- 29. Seleccionar los 5 productos mas 
select top 5 count(quantity) cantidad,OD.ProductID, P.ProductName from [Order Details] OD
inner join Products P on OD.ProductID = P.ProductID
group by OD.ProductID,  P.ProductName
order by count(quantity) desc