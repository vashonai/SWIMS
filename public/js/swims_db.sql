-- PostgreSQL Database: Inventory Management System

-- Create Users Table for Authentication
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    company_code VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
    company_name VARCHAR(25) NOT NULL,
    email VARCHAR(25) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Suppliers Table
CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    contact_person VARCHAR(25),
    phone VARCHAR(7),
    email VARCHAR(20) UNIQUE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Inventory Table
CREATE TABLE inventory (
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(15) NOT NULL,
    description TEXT,
    quantity INT NOT NULL CHECK (quantity >= 0),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    supplier_id INT REFERENCES suppliers(supplier_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Procurement Records Table
CREATE TABLE procurement_records (
    procurement_id SERIAL PRIMARY KEY,
    item_id INT REFERENCES inventory(item_id) ON DELETE CASCADE,
    supplier_id INT REFERENCES suppliers(supplier_id) ON DELETE SET NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    total_cost DECIMAL(10,2) NOT NULL CHECK (total_cost >= 0),
    procurement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for Performance
CREATE INDEX idx_inventory_supplier ON inventory(supplier_id);
CREATE INDEX idx_procurement_item ON procurement_records(item_id);
CREATE INDEX idx_procurement_supplier ON procurement_records(supplier_id);

-- Sample Data for Users Table (for testing login)
INSERT INTO users (company_code, password, company_name, email) VALUES
('COMP123', 'password123', 'Widget Corp', 'contact@widgetcorp.com'),
('COMP456', 'password456', 'Gadget Inc', 'support@gadgetinc.com');

-- Sample Data for Suppliers Table
INSERT INTO suppliers (name, contact_person, phone, email, address) VALUES
('Supplier A', 'John Doe', '123-456-7890', 'supplierA@example.com', '123 Market St'),
('Supplier B', 'Jane Smith', '987-654-3210', 'supplierB@example.com', '456 Industrial Ave');

-- Sample Data for Inventory Table
INSERT INTO inventory (name, description, quantity, price, supplier_id) VALUES
('Widget A', 'High-quality widget', 100, 9.99, 1),
('Gadget B', 'Advanced gadget', 50, 19.99, 2);

-- Sample Data for Procurement Records Table
INSERT INTO procurement_records (item_id, supplier_id, quantity, total_cost) VALUES
(1, 1, 20, 199.80),
(2, 2, 10, 199.90);
