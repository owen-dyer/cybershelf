-- Table to store order information
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    total_amount FLOAT,
    order_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES abstract_user (id)
);

-- Table to store order details
CREATE TABLE order_details (
    order_detail_id SERIAL PRIMARY KEY,
    order_id INTEGER,
    product_id INTEGER,
    quantity INT,
    price FLOAT,
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (product_id) REFERENCES product (id)
);
