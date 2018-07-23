DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	 item_id INTEGER NOT NULL AUTO_INCREMENT,
	 product_name VARCHAR(50) NOT NULL,
	 department_name VARCHAR(50) NOT NULL,
	 price FLOAT(50) NOT NULL,
	 stock_quantity INTEGER(50) NOT NULL,
	 product_sales INTEGER(50) DEFAULT 0,
	 PRIMARY KEY (item_id)
	);

CREATE TABLE departments(
	department_id INTEGER NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(50) NOT NULL,
	over_head_costs INTEGER(50) NOT NULL,
	PRIMARY KEY (department_id)
);
    
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("hat",  "clothing", 20, 100)
	,("shirt",  "clothing", 35, 50)
	, ("laptop", "electronics", 500, 100)
    , ("cat food", "pets", 10, 200)
    , ("milkbones", "pets", 15, 150)
    , ("Lord of the Rings BluRay Box Set", "electronics", 100, 50)
    , ("beef jerky", "food and grocery", 8, 100)
    , ("bread", "food and grocery", 5, 50)
    , ("mustard", "food and grocery", 2.50, 100)
    , ("1 tb solid state harddrive", "electronics", 200, 50)
    , ("Nvidia 1080 TI GPU", "electronics", 750, 4)
    , ("star trek box set", "electronics", 100, 2)
	, ("adult sized romper", "clothing", 2, 1);

INSERT INTO departments(department_name, over_head_costs)
VALUES("electronics", 5000)
	,("pets", 3000)
    ,("food and grocery", 6000)
    ,("clothing", 4000);

select * from products;


select department_name, department_id, over_head_costs from departments;

-- //   departments db  departments db    departments db    products db     over_head_costs - products sales 
-- // | department_id | department_name | over_head_costs | product_sales | total_profit |
-- // | ------------- | --------------- | --------------- | ------------- | ------------ |
-- // | 01            | Electronics     | 10000           | 20000         | 10000        |
-- // | 02            | Clothing        | 60000           | 100000        | 40000        |


-- THIS WORKS
SELECT d.department_id, d.department_name, d.over_head_costs, 
SUM(p.product_sales) as product_sales, SUM(p.product_sales) - d.over_head_costs as total_profit
FROM departments d, products p 
WHERE d.department_name = p.department_name
GROUP BY d.department_name, d.over_head_costs, d.department_id
ORDER BY d.department_id;


-- WORK AREA ---------------------------------------------------------------------------------------------

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




