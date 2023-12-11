CREATE TABLE
    orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        total_price REAL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW ()
    );

CREATE TABLE
    order_item (
        id SERIAL PRIMARY KEY,
        order_id INTEGER,
        CONSTRAINT item_order_id FOREIGN KEY (order_id) REFERENCES orders (id),
        listing_id INTEGER NOT NULL,
        price REAL,
        quantity SMALLINT NOT NULl
    );