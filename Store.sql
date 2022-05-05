DROP DATABASE IF EXISTS Store;

CREATE DATABASE Store;

USE Store;

CREATE TABLE products (
    id INT NOT NULL auto_increment,
    name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    sale_price DECIMAL(8, 2),
	cost_price DECIMAL(8, 2),
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
    quantity INT NOT NULL,
    total DECIMAL(8,2),
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
    quantity INT NOT NULL,
    total DECIMAL(8,2),
    FOREIGN KEY (purchase_id)
        REFERENCES purchases (id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON DELETE CASCADE
)  ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;

INSERT INTO Store.products (name, quantity, sale_price, cost_price) VALUES
    ("Cadeira", 5, 35.00, 25.00),
    ("Chocolate em pó", 20, 12.00, 7.00),
    ("Refrigerante", 30, 4.80, 3.50);

INSERT INTO Store.sales (date) VALUES
    (NOW()),
    (NOW());

INSERT INTO Store.purchases (date) VALUES
    (NOW());

INSERT INTO Store.sales_products (sale_id, product_id, quantity, total) VALUES
    (1, 3, 10, 48.00),
    (2, 1, 2, 70.00);
    
INSERT INTO Store.purchases_products (purchase_id, product_id, quantity, total) VALUES
    (1, 1, 5, 125.00);
    


