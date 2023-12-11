CREATE TABLE
    cart (
        id SERIAL PRIMARY KEY,
        -- Users aren't stored in this database so not a "foreign key"
        user_id INTEGER NOT NULL,
        total_price REAL DEFAULT 0,
        last_updated TIMESTAMP NULL
    );

-- Multiple items can be linked to a single cart (many-to-one relationship)
CREATE TABLE
    cart_item (
        id SERIAL PRIMARY KEY,
        cart_id INTEGER,
        CONSTRAINT item_cart_id FOREIGN KEY (cart_id) REFERENCES cart (id) ON DELETE CASCADE,
        -- Products aren't stored in this database so not a "foreign key"
        listing_id INTEGER NOT NULL,
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