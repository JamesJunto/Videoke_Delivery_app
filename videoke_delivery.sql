CREATE TABLE admin_acc (
  admin_id      INT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customer (
  customer_id   INT AUTO_INCREMENT PRIMARY KEY,
  first_name    VARCHAR(50) NOT NULL,
  last_name     VARCHAR(50) NOT NULL,
  phone         VARCHAR(20) NOT NULL,
  address       TEXT NOT NULL,
  status        VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product (
  product_id     INT AUTO_INCREMENT PRIMARY KEY,
  product_name   VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL UNIQUE,
  description    TEXT,
  price          DECIMAL(10, 2) NOT NULL,
  stock          INT NOT NULL DEFAULT 0,
  status         VARCHAR(50) NOT NULL DEFAULT 'available',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  order_id       VARCHAR(20) PRIMARY KEY,
  customer_id    INT NOT NULL,
  subtotal       DECIMAL(10, 2) NOT NULL,
  total          DECIMAL(10, 2) NOT NULL,
  status         VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE order_items (
  item_id        INT AUTO_INCREMENT PRIMARY KEY,
  order_id       VARCHAR(20) NOT NULL,
  product_id     INT NOT NULL,
  quantity       INT NOT NULL DEFAULT 1,
  price          DECIMAL(10, 2) NOT NULL,
  subtotal       DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);
