# BAMAZON STOREFRONT

## Don't want to read? 

## [Click here for the video demo](https://youtu.be/Eihr9f7bxhA)

## TABLE OF CONTENTS

-------
1. [Docker Set Up](https://github.com/EpicureanHeron/EpicureanHeron.github.io/tree/master/bamazon#docker-set-up)
2.  [Customer View](https://github.com/EpicureanHeron/EpicureanHeron.github.io/tree/master/bamazon#customer-view)
	* [Database Set Up](https://github.com/EpicureanHeron/EpicureanHeron.github.io/tree/master/bamazon#database-set-up)
	* [Bamazon Customer Node.js](https://github.com/EpicureanHeron/EpicureanHeron.github.io/tree/master/bamazon#bamazon-customer-nodejs)
3. [Manager View](https://github.com/EpicureanHeron/EpicureanHeron.github.io/tree/master/bamazon#manager-view)
	* [Bamazon Manager Node.js](https://github.com/EpicureanHeron/EpicureanHeron.github.io/tree/master/bamazon#bamazon-manager-nodejs)
4. [Supervisor View](https://github.com/EpicureanHeron/EpicureanHeron.github.io/tree/master/bamazon#supervisor-view)
	* [Database Set Up](https://github.com/EpicureanHeron/EpicureanHeron.github.io/tree/master/bamazon#database-set-up-1)
	* [Bamazon Supervisor Node.js](https://github.com/EpicureanHeron/EpicureanHeron.github.io/tree/master/bamazon#bamazon-supervisor-nodejs)
	

# Docker Set Up

For this project, a [Docker](https://www.docker.com/) container for MySQL is configured with [node.js](https://nodejs.org/en/about/) and the [mysql node package](https://www.npmjs.com/package/mysql).


![Docker Set Up](https://EpicureanHeron.github.io/bamazon/images/dockerMySQL.png)

To set up this container, run the following command once Docker is installed:

```
docker run -ti -p 33063306 -e MYSQL_ALLOW_EMPTY_PASSWORD=yes mysql5
```


# Customer View

## Database Set Up 
Create the database "bamazon" and the table "products"

```
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	 item_id INTEGER NOT NULL AUTO_INCREMENT,
	 product_name VARCHAR(50) NOT NULL,
	 department_name VARCHAR(50) NOT NULL,
	 price DECIMAL(10,4) NOT NULL,
	 stock_quantity INTEGER(50) NOT NULL,
	 PRIMARY KEY (item_id)
	);
```

and populate the database with the following items

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

Above are the results from MySQL Workbench when the following command is executed
 ```
SELECT * FROM products
```


## Bamazon Customer Node.js

After running

```
node bamazonCustomer.js 
```
the customer is prompted to chose one of the items from the products DB and the quantity of the order via the [inquirer node package](https://www.npmjs.com/package/inquirer).

![Customer Place Order Cannot Fill](https://EpicureanHeron.github.io/bamazon/images/00%2001%20bamazonCustomerPlaceOrderCannotFill.png)

If the customer selects an amount that is greater than the current stock, the order fails and the customer is alerted.

![Customer Place Order Success](https://EpicureanHeron.github.io/bamazon/images/00%2002bamazonCustomerPlaceOrderSuccess.png)

If the quantity is a viable amount, the user is given their total bill. In this case, the customer is purchasing 5 Solid State Drives. 

![DB After Order](https://EpicureanHeron.github.io/bamazon/images/00%2003%20bamazonCustomerDBAfterOrder.png)

And the associated stock_quantity value is decreased by that amount. The intial stock of SSDs was 50, now it is decreased by 5 to be 45. 

# Manager View

## Bamazon Manager Node.js

After running
```
node bamazonManager.js 
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

Selecting  "Add to Inventory" offers the manager the option to select an ID and add a quantity. In this case, the manager selects #11 Nvidia 1080 and adds 10 units to it. Now when "View Low Inventory" is selected, number 11 now longer shows. 

![Manager Add Item](https://EpicureanHeron.github.io/bamazon/images/01%2005%20bamazonManagerAddItem.png)

"Add New Product" prompts the manager to input a new product name, department, cost, and quantity. 

![DB After](https://EpicureanHeron.github.io/bamazon/images/01%2006%20bamazonManagerDBAfter.png)

The database is updated with the new product

![Manager Add Item Dept](https://EpicureanHeron.github.io/bamazon/images/01%2007%20bamazonManagerAddItemDept.png)

Leveraging the validate function within inquirer insures that the data being inserted into the table is valid. A list of departments displayed rather than letting the manager enter any department. 

# Supervisor View

## Database Set Up 

A new database "departments" is created with the following SQL

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

The "products" table used in the bamazonCustomer.js and bamazonManager.js needs to be updated with a new column. This is done by dropping the "products" table then running the following commands to create a new schema and seed it with data. 
```
CREATE TABLE products(
	 item_id INTEGER NOT NULL AUTO_INCREMENT,
	 product_name VARCHAR(50) NOT NULL,
	 department_name VARCHAR(50) NOT NULL,
	 price DECIMAL(10,4) NOT NULL,
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

## Bamazon Supervisor Node.js
The supervisor view shows an overview of data that is affected by both the customer and manager views. To exemplify this interactivty, first run bamazonCustomer.js and purchase some items. 

![Customer Buys](https://EpicureanHeron.github.io/bamazon/images/02%2002%20bamazonSupervisorCustomerBuys.png)

In this case, the customer is buying 3 laptops.

![Product DB Post Purchase](https://EpicureanHeron.github.io/bamazon/images/02%2003%20bamazonSupervisorProductsDBPostPurchase.png)

The products database updates with the new "product_sales" column.

![Supervisor View Product](https://EpicureanHeron.github.io/bamazon/images/02%2004%20bamazonSupervisorViewProduct.png)

Now, running
```
node bamazonSupervisor.js
```
offers two options

- View Product Sales by Department
- Create New Department

Selecting "View Product Sales by Deparment" generates the above table in the command line. This table is generated using the [tableify node package](https://www.npmjs.com/package/tableify). 

The SQL to generate the above table is as follows. It uses alias, join, and group bys commands. 

```
SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) as product_sales, SUM(p.product_sales) - d.over_head_costs as total_profit
FROM departments d
LEFT JOIN products p ON d.department_name = p.department_name
GROUP BY d.department_name, d.department_id, d.over_head_costs
ORDER BY d.department_id;
```


![Supervisor Add Department](https://EpicureanHeron.github.io/bamazon/images/02%2005%20bamazonSupervisorAddDepartment.png)

Running "Create New Deparment" asks the supervisor for the name of the department and the overhead costs. 

In this case,  the deparment, "auto" is added and estimated the over head costs to be $6000.


By selecting "View Product Sales by Department" again, it shows the above table with the new department. 

However, because the columns product_sales and total_profit rely on data from the products table, which has no items with the department "auto" within it, we receive NULL values for these columns.



![Manager Add Item Dept](https://EpicureanHeron.github.io/bamazon/images/02%2006%20bamazonSupervisorManagerAddProduct.png)

Instead of just a list of departments being the options for bamazonManager.js, it was updated s to read the "department_name" which are unique on the "departments" table. This is done by using the following SQL

```
SELECT department_name FROM departments

```

![Post Supervisor Manager Add Item Dept](https://EpicureanHeron.github.io/bamazon/images/02%2007%20bamazonSupervisorManagerAddViewProducts.png)

In order to get a proper calculation in the overhead cost, the manager adds an item which will be featured in the department "auto", in this case it is windshield wipers. 


![Customer Buys New Product New Department](https://EpicureanHeron.github.io/bamazon/images/02%2008%20bamazonSupervisorCustomerBuyNewDeptNewProduct.png)

The customer view is able to see the new item windshield wipers. In this example, the customer buys 10 of these. 

![New Deparment Supervisor View](https://EpicureanHeron.github.io/bamazon/images/02%2009%20bamazonSupervisorViewDeptPostNewDeptCustomerBuy.png)

Running the supervisor view and selecting "view product sales by department" now shows the not null values associated with the manager creating an item and a customer buying that item in the new department. The "total_profit" column, which is dymanically created and displayed via the SQL join displays, shows the proper calculation. 