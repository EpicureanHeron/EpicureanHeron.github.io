-- run first
USE bamazon;

-- grabs all the products 

select * from products;

-- grabs all the departments  

select * from departments;


-- //   departments db  departments db    departments db    products db     over_head_costs - products sales 
-- // | department_id | department_name | over_head_costs | product_sales | total_profit |
-- // | ------------- | --------------- | --------------- | ------------- | ------------ |
-- // | 01            | Electronics     | 10000           | 20000         | 10000        |
-- // | 02            | Clothing        | 60000           | 100000        | 40000        |


SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) as product_sales, SUM(p.product_sales) - d.over_head_costs as total_profit
FROM departments d
LEFT JOIN products p ON d.department_name = p.department_name
GROUP BY d.department_name, d.department_id, d.over_head_costs
ORDER BY d.department_id;