CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    status ENUM('delivered', 'ongoing', 'pending') NOT NULL DEFAULT 'pending'
);
CREATE TABLE inventory (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    quantity INT NOT NULL DEFAULT 0,
    price DECIMAL(10,2) NOT NULL,
    supplier VARCHAR(100)
);
