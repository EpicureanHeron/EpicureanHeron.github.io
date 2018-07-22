DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	 item_id INTEGER NOT NULL AUTO_INCREMENT,
	 product_name VARCHAR(50) NOT NULL,
	 department_name VARCHAR(50) NOT NULL,
	 price FLOAT(50) NOT NULL,
	 stock_quantity INTEGER(50) NOT NULL,
	 PRIMARY KEY (item_id)
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
    , ("1 tb solid state harddrive", "electronics", 200, 50);



select * from products;