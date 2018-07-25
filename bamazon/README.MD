# BAMAZON STOREFRONT

## Docker Set Up

For this project, I created a docker container for MySQL and configured node.js and the mysql node package to interact with docker.

![Docker Set Up](https://EpicureanHeron.github.io/bamazon/images/dockerMySQL.png)


# Customer View

## Database set up 
Created the database bamazon and table products 

```
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
```

and populated the database with the following items

```
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
    
```



![Customer Database](https://EpicureanHeron.github.io/bamazon/images/00%2000%20bamazonCustomerDBInit.png)

Here are the results of a 
 ```
SELECT * FROM products
```
run in MySQL Workbench

## bamazon customer node.js

After running

```
node bamazonCustomer.js 
```
the customer is prompted to chose one of the items from the products DB and the quantity of the order via the inquirier node package.

![Customer Place Order Cannot Fill](https://EpicureanHeron.github.io/bamazon/images/00%2001%20bamazonCustomerPlaceOrderCannotFill.png)

If the customer selected s an amount that is greater than the current stock, the order fails and the customer is alerted.

![Customer Place Order Success](https://EpicureanHeron.github.io/bamazon/images/00%2002bamazonCustomerPlaceOrderSuccess.png)

If the quantity is a viable amount, the user is given their total bill. In this case, the customer is purchasing 5 Solid State Drives. 

![DB After Order](https://EpicureanHeron.github.io/bamazon/images/00%2003%20bamazonCustomerDBAfterOrder.png)

And the associated stock_quantity value is decreased by that amount. The intial stock of SSDs was 50, now it is decreased by 5 to be 45. 

# Manager View

## bamazon manager node.js

After running
```
node bamazonCustomer.js 
```

![Manager Options](https://EpicureanHeron.github.io/bamazon/images/01%2001%20bamazonManagerOptions.png)

The manager is offered 4 options via an inquirier prompt

- View Products for Sale
- View Low Inventory
- Add to Inventory
- Add New Product

![Manager Show Stock](https://EpicureanHeron.github.io/bamazon/images/01%2002%20bamazonManagerShowStock.png)

Selecting "View Products for Sale" displays the product ID, the product name, the unit price, and the current stock.

![Manager Show Low Stock](https://EpicureanHeron.github.io/bamazon/images/01%2003%20bamazonManagerShowLowStock.png)

Selecting "View Low Inventory" shows any item that has less than 5 in stock. Items #11 Nvidia 1080, #12 star trek box set, and #13 adult sized rompers  are low. 

![Manager Add To Stock](https://EpicureanHeron.github.io/bamazon/images/01%2004%20bamazonManagerAddToStock.png)

Selecting  "Add to Inventory" offers the manager the option to select and ID and add a quantity. In this case, the manager selects #11 Nvidia 1080 and adds 10 units to it. Now when "View Low Inventory" is selected, number 11 now longer shows. 

![Manager Add Item](https://EpicureanHeron.github.io/bamazon/images/01%2005%20bamazonManagerAddItem.png)

"Add New Product" prompts the manager to input a new product name, department, cost, and quantity. 

![DB After](https://EpicureanHeron.github.io/bamazon/images/01%2006%20bamazonManagerDBAfter.png)

The database is updated with the new product

![Manager Add Item Dept](https://EpicureanHeron.github.io/bamazon/images/01%2007%20bamazonManagerAddItemDept.png)

Leveraging the validate function within inquirer insures that the data being inserted into the table is valid. I also use a list of departments rather than letting the manager to enter any department. 

# Supervisor View

## Database set up 

A new database must be created for this step, I created one use the following SQL

```
CREATE TABLE departments(
	department_id INTEGER NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(50) NOT NULL,
	over_head_costs INTEGER(50) NOT NULL,
	PRIMARY KEY (department_id)
);

```

and data is inserted for the purpose of this project with the following command

```
INSERT INTO departments(department_name, over_head_costs)
VALUES("electronics", 5000)
	,("pets", 3000)
    ,("food and grocery", 6000)
    ,("clothing", 4000);

```

![Department DB Init](https://EpicureanHeron.github.io/bamazon/images/02%2000%20bamazonSupervisorDepartmentsDBInit.png)

Running the below command returns the above image
```
SELECT * FROM departments
```

And for this step of the project, a new column is required, so we rewrite the products database in the following way and populate it with the below data 
```
CREATE TABLE products(
	 item_id INTEGER NOT NULL AUTO_INCREMENT,
	 product_name VARCHAR(50) NOT NULL,
	 department_name VARCHAR(50) NOT NULL,
	 price FLOAT(50) NOT NULL,
	 stock_quantity INTEGER(50) NOT NULL,
	 product_sales INTEGER(50) DEFAULT 0,
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
    , ("1 tb solid state harddrive", "electronics", 200, 50)
    , ("Nvidia 1080 TI GPU", "electronics", 750, 4)
    , ("star trek box set", "electronics", 100, 2)
	, ("adult sized romper", "clothing", 2, 1);

```

![Products DB Addition](https://EpicureanHeron.github.io/bamazon/images/02%2001%20bamazonSupervisorProductsDBInit.png)

The result of the SQL on the products table.

## bamazon supervisor node.js
To begin with, I run bamazonCustomer.js to buy some products in order to populate the product_sales column in products

![Customer Buys](https://EpicureanHeron.github.io/bamazon/images/02%2002%20bamazonSupervisorCustomerBuys.png)

Customer is buying 3 laptops.

![Product DB Post Purchase](https://EpicureanHeron.github.io/bamazon/images/02%2003%20bamazonSupervisorProductsDBPostPurchase.png)

The products database updates with the sales.

![Supervisor View Product](https://EpicureanHeron.github.io/bamazon/images/02%2004%20bamazonSupervisorViewProduct.png)

Running
```
node bamazonSupervisor.js
```
offers two options

- View Product Sales by Department
- Create New Department

![Supervisor Add Department](https://EpicureanHeron.github.io/bamazon/images/02%2005%20bamazonSupervisorAddDepartment.png)

Selecting "View Product Sales by Department" shows the above table

The SQL to generate the above table is below, it utilizes alias, join, and group bys. 

```
SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) as product_sales, SUM(p.product_sales) - d.over_head_costs as total_profit
FROM departments d
LEFT JOIN products p ON d.department_name = p.department_name
GROUP BY d.department_name, d.department_id, d.over_head_costs
ORDER BY d.department_id;
```

![Manager Add Item Dept](https://EpicureanHeron.github.io/bamazon/images/02%2006%20bamazonSupervisorManagerAddProduct.png)

Updated the bamazonManager.js to read the departments from 

![Post Supervisor Manager Add Item Dept](https://EpicureanHeron.github.io/bamazon/images/02%2007%20bamazonSupervisorManagerAddViewProducts.png)

![Customer Buys New Product New Department](https://EpicureanHeron.github.io/bamazon/images/02%2008%20bamazonSupervisorCustomerBuyNewDeptNewProduct.png)

![New Deparment Supervisor View](https://EpicureanHeron.github.io/bamazon/images/02%2009%20bamazonSupervisorViewDeptPostNewDeptCustomerBuy.png)