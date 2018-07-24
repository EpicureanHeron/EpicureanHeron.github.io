-- WORK AREA ---------------------------------------------------------------------------------------------

-- THIS WORKS but if the department does not exist on the products table, it is not shown
SELECT d.department_id, d.department_name, d.over_head_costs, 
SUM(p.product_sales) as product_sales, SUM(p.product_sales) - d.over_head_costs as total_profit
FROM departments d, products p 
WHERE d.department_name = p.department_name
GROUP BY d.department_name, d.over_head_costs, d.department_id
ORDER BY d.department_id;

SELECT Customers.CustomerName, Orders.OrderID,
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
ORDER BY Customers.CustomerName;

SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) as product_sales, SUM(p.product_sales) - d.over_head_costs as total_profit
FROM departments d
LEFT JOIN products p ON d.department_name = p.department_name
GROUP BY d.department_name, d.department_id, d.over_head_costs
ORDER BY d.department_id;

SELECT d.department_id, d.department_name, d.over_head_costs, 
FROM departments d
LEFT JOIN (
	SELECT p.product_sales as product_sales, p.product_sales FROM products p
    ON d.department_name = p.deparment_name
    )
GROUP BY d.department_name
ORDER BY d.department_id;

SELECT d.department_id, d.department_name, d.over_head_costs, 
SUM(p.product_sales) as product_sales, SUM(p.product_sales) - d.over_head_costs as total_profit
FROM departments d, products p 
WHERE d.department_name = p.department_name
GROUP BY d.department_name, d.over_head_costs, d.department_id
ORDER BY d.department_id;

SELECT departments.department_name, departments.department_id, departments.over_head_costs, products.product_sales, products.item_id
FROM products
FULL JOIN deparments ON products.item_id=departments.department_id;
GROUP BY products.department_name


-- grabs unique department_names from products and adds all the stocks together (group by)
-- sum is being used
-- the "AS" is an alias which shows a different display name 

-- so should be able to use GROUP BY to flatten the data being pulled from products then do a join based on the departments and pull in the total sales 
-- then I will toss in the alias for total_profit 

SELECT  department_name, SUM(stock_quantity) as total_quantity 
FROM products
GROUP BY department_name


-- SELECT title, firstName, lastName
-- FROM books
-- LEFT JOIN authors ON books.authorId = authors.id;

-- the below sorta worked 

SELECT departments.department_name, departments.over_head_costs, products.stock_quantity, products.department_name
FROM departments
LEFT JOIN products ON departments.department_name = products.department_name;

-- this returns the one department_name and alias works with the join 

SELECT departments.department_name, departments.over_head_costs, products.stock_quantity as whatever
FROM departments
LEFT JOIN products ON departments.department_name = products.department_name;


-- how to do group by after join? or should I group by all the income on the products table FIRST then group by all the overhead costs on the departments table THEN display

-- this works to show total stock 
SELECT  department_name, SUM(stock_quantity) as total_quantity 
FROM products
GROUP BY department_name;
-- this shows the tables 
SELECT department_name, over_head_costs as total_costs
from departments;
-- combined they do not work
SELECT  products.department_name, SUM(products.stock_quantity) as total_quantity, departments.department_name, departments.over_head_costs as total_costs
FROM products, departments
GROUP BY department_name;
-- THIS WORKS PRETTY WELL
SELECT d.department_name, d.over_head_costs, p.department_name, p.stock_quantity

FROM departments d
-- GROUP BY p.department_name

LEFT JOIN products p ON d.department_name = p.department_name;
-- -----------