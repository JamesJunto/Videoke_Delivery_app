CREATE TABLE customer (
  customer_id   INT AUTO_INCREMENT PRIMARY KEY,
  first_name    VARCHAR(50) NOT NULL,
  last_name     VARCHAR(50) NOT NULL,
  phone         VARCHAR(20) NOT NULL,
  address       TEXT NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product (
  product_id     INT AUTO_INCREMENT PRIMARY KEY,
  product_name   VARCHAR(100) NOT NULL,
  description    TEXT,
  price          DECIMAL(10, 2) NOT NULL,
  stock          INT DEFAULT 0,
  status         VARCHAR(50) NOT NULL DEFAULT 'available';
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  order_id       INT AUTO_INCREMENT PRIMARY KEY,
  customer_id    INT NOT NULL,
  subtotal       DECIMAL(10, 2) NOT NULL,
  total          DECIMAL(10, 2) NOT NULL,
  status         VARCHAR(20) DEFAULT 'pending',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE order_items (
  item_id      INT AUTO_INCREMENT PRIMARY KEY,
  order_id     INT NOT NULL,
  product_id   INT NOT NULL,
  quantity     INT DEFAULT 1,
  price        DECIMAL(10, 2) NOT NULL,
  subtotal     DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id)   REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE deliveries (
  delivery_id        INT AUTO_INCREMENT PRIMARY KEY,
  order_id           INT NOT NULL,
  delivery_address   TEXT NOT NULL,
  delivery_schedule  VARCHAR(100),
  delivery_fee       DECIMAL(10, 2) DEFAULT 0,
  delivered_at       TIMESTAMP NULL,
  status             VARCHAR(20) DEFAULT 'pending',
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE payments (
  payment_id      INT AUTO_INCREMENT PRIMARY KEY,
  order_id        INT NOT NULL,
  amount_paid     DECIMAL(10, 2) NOT NULL,
  payment_method  VARCHAR(20),
  payment_status  VARCHAR(20) DEFAULT 'Unpaid',
  paid_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

ALTER TABLE product
MODIFY COLUMN product_name VARCHAR(100)
  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
  
  ALTER TABLE product ADD UNIQUE (product_name);
