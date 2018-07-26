DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	 item_id INTEGER NOT NULL AUTO_INCREMENT,
	 product_name VARCHAR(50) NOT NULL,
	 department_name VARCHAR(50) NOT NULL,
	 price DECIMAL(10,4) NOT NULL,
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









