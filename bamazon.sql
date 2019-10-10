Drop DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products
(
    item_id INTEGER NOT NULL
    auto_increment,
    product_name VARCHAR
    (50) NOT NULL,
    product_sales INTEGER DEFAULT 0,
    department_name VARCHAR
    (50) NOT NULL,
    price INTEGER NOT null,
    stock_qauntity INTEGER NOT null,
    PRIMARY KEY
    (item_id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_qauntity)
    VALUES
        ("skyrim", "games", 50, 100),
        ("Football", "Sporting goods", 5, 300),
        ("Gameboy", "games", 200, 50),
        ("Jersey", "clothing", 75, 20),
        ("Toothbrush", "hygiene", 2, 800),
        ("Basketball", "Sporting goods", 4, 350),
        ("Jeans", "Clothing", 25, 100),
        ("TV", "Electronics", 500, 85),
        ("Candy", "food", 1, 1000),
        ("Bannanas", "Food", 2, 750);

    SELECT *
    FROM products;