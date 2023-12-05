-- Table to store cart information
CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    product_id INTEGER,
    quantity INT,
    price FLOAT,
    created_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES abstract_user (id),
    FOREIGN KEY (product_id) REFERENCES product (id)
);
