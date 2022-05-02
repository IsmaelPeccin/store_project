DROP DATABASE IF EXISTS Store;

CREATE DATABASE Store;

USE Store;

CREATE TABLE products (
    id INT NOT NULL auto_increment,
    name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    cost_price FLOAT NOT NULL,
    sale_price FLOAT NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales (
    id INT NOT NULL auto_increment,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE purchases (
    id INT NOT NULL auto_increment,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales_products (
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    price FLOAT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY(price) 
        REFERENCES products (sale_price),
        ON DELETE CASCADE,
    FOREIGN KEY (sale_id)
        REFERENCES sales (id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON DELETE CASCADE
)  ENGINE=INNODB;

CREATE TABLE purchases_products (
    purchase_id INT NOT NULL,
    product_id INT NOT NULL,
    price FLOAT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY(price) 
        REFERENCES products (cost_price),
        ON DELETE CASCADE,
    FOREIGN KEY (purchase_id)
        REFERENCES purchases (id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON DELETE CASCADE
)  ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;

INSERT INTO StoreManager.products (name, quantity, cost_price, sale_price) VALUES
    ("Cadeira", 5, 25.00, 35.00),
    ("Chocolate em pó", 20, 7.00, 12.00),
    ("Refrigerante", 30, 3.50, 4.80);

INSERT INTO StoreManager.sales (date) VALUES
    (NOW()),
    (NOW());

INSERT INTO StoreManager.purchases (date) VALUES
    (NOW()),
    (NOW());

INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity, price) VALUES
    (1, 3, 10, 48.00),
    (2, 1, 2, 70.00);

INSERT INTO StoreManager.purchases_products (purchase_id, product_id, quantity, price) VALUES
    (1, 1, 5, 125.00);
  
