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
the customer is prompted to chose one of the items from the products DB and the quantity of the order.

![Customer Place Order Cannot Fill](https://EpicureanHeron.github.io/bamazon/images/00%2001%20bamazonCustomerPlaceOrderCannotFill.png)

If the customer selected s an amount that is greater than the current stock, the order fails and the customer is alerted.

![Customer Place Order Success](https://EpicureanHeron.github.io/bamazon/images/00%2002bamazonCustomerPlaceOrderSuccess.png)

If the quantity is a viable amount, the user is given their total bill. In this case, the customer is purchasing 5 Solid State Drives. 

![DB After Order](https://EpicureanHeron.github.io/bamazon/images/00%2003%20bamazonCustomerDBAfterOrder.png)

And the associated stock_quantity value is decreased by that amount. The intial stock of SSDs was 50, now it is decreased by 5 to be 45. 

# Manager View

## bamazon manager node.js


![Manager Options](https://EpicureanHeron.github.io/bamazon/images/01%2001%20bamazonManagerOptions.png)

![Manager Show Stock](https://EpicureanHeron.github.io/bamazon/images/01%2002%20bamazonManagerShowStock.png)

![Manager Show Low Stock](https://EpicureanHeron.github.io/bamazon/images/01%2003%20bamazonManagerShowLowStock.png)

![Manager Add To Stock](https://EpicureanHeron.github.io/bamazon/images/01%2004%20bamazonManagerAddToStock.png)

![Manager Add Item](https://EpicureanHeron.github.io/bamazon/images/01%2005%20bamazonManagerAddItem.png)

![DB After](https://EpicureanHeron.github.io/bamazon/images/01%2006%20bamazonManagerDBAfter.png)

![Manager Add Item Dept](https://EpicureanHeron.github.io/bamazon/images/01%2007%20bamazonManagerAddItemDept.png)

# Supervisor View

## Database set up 

![Department DB Init](https://EpicureanHeron.github.io/bamazon/images/02%2000%20bamazonSupervisorDepartmentsDBInit.png)

![Products DB Addition](https://EpicureanHeron.github.io/bamazon/images/02%2001%20bamazonSupervisorProductsDBInit.png)

## bamazon supervisor node.js


![Customer Buys](https://EpicureanHeron.github.io/bamazon/images/02%2002%20bamazonSupervisorCustomerBuys.png)

![Product DB Post Purchase](https://EpicureanHeron.github.io/bamazon/images/02%2003%20bamazonSupervisorProductsDBPostPurchase.png)

![Supervisor View Productt](https://EpicureanHeron.github.io/bamazon/images/02%2004%20bamazonSupervisorViewProduct.png)

![Supervisor Add Department](https://EpicureanHeron.github.io/bamazon/images/02%2005%20bamazonSupervisorAddDepartment.png)

![Manager Add Item Dept](https://EpicureanHeron.github.io/bamazon/images/02%2006%20bamazonSupervisorManagerAddProduct.png)

![Post Supervisor Manager Add Item Dept](https://EpicureanHeron.github.io/bamazon/images/02%2007%20bamazonSupervisorManagerAddViewProducts.png)

![Customer Buys New Product New Department](https://EpicureanHeron.github.io/bamazon/images/02%2008%20bamazonSupervisorCustomerBuyNewDeptNewProduct.png)

![New Deparment Supervisor View](https://EpicureanHeron.github.io/bamazon/images/02%2009%20bamazonSupervisorViewDeptPostNewDeptCustomerBuy.png)