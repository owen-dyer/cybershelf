<<<<<<< HEAD
--Database for a logged in consumer user to view items in their cart
CREATE TABLE cart (
    id PRIMARY KEY SERIAL,
    user INT,
    title VARCHAR(256),
    description VARCHAR(1000),
    price FLOAT NOT NULL,
=======
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
>>>>>>> 7cbd618d521d2b6b240bad49d1af4bfb2f8fc55b
);
