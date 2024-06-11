-- scripts/init.sql

-- Create Orders table
CREATE TABLE IF NOT EXISTS Orders (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) NOT NULL
);

-- Create Order_Items table
CREATE TABLE IF NOT EXISTS Order_Items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES Orders(id) ON DELETE CASCADE,
  product_id VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);

-- Create Inventories table
CREATE TABLE IF NOT EXISTS Inventories (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);

INSERT INTO Inventories (id, product_id, quantity, price) VALUES
(1, 10, 50, 999.99),
(2, 9, 150, 599.99),
(3, 8, 80, 399.99),
(4, 7, 200, 199.99),
(5, 6, 120, 149.99),
(6, 5, 300, 29.99),
(7, 4, 250, 49.99),
(8, 3, 70, 199.99),
(9, 2, 90, 89.99),
(10, 1, 400, 19.99);
