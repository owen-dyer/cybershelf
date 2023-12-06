<<<<<<< HEAD
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
=======
CREATE TABLE
    cart (
        id SERIAL PRIMARY KEY,
        -- Users aren't stored in this database so not a "foreign key"
        user_id INTEGER NOT NULL,
        total_price REAL,
        last_updated TIMESTAMP NULL
    );

-- Multiple items can be linked to a single cart (many-to-one relationship)
CREATE TABLE
    cart_item (
        id SERIAL PRIMARY KEY,
        cart_id INTEGER,
        CONSTRAINT item_cart_id FOREIGN KEY (cart_id) REFERENCES cart (id),
        -- Products aren't stored in this database so not a "foreign key"
        product_id INTEGER NOT NULL,
        price REAL,
        quantity SMALLINT NOT NULL,
        created_at TIMESTAMP
    );

-- CREATE OR REPLACE FUNCTION ts_now() RETURNS TRIGGER AS $$
--     BEGIN
--         -- Set the 'created_at' field to the current timestamp
--         NEW.created_at := CURRENT_TIMESTAMP;
--         RETURN NEW;
--     END;
-- $$ LANGUAGE plpgsql;


-- CREATE OR REPLACE TRIGGER ts_now BEFORE INSERT ON cart_item FOR EACH ROW EXECUTE FUNCTION ts_now();
>>>>>>> 68203df381738dbb08a01762123302ac902dc063
