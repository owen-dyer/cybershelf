CREATE TABLE
    category (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL UNIQUE,
        description VARCHAR(1000),
        slug VARCHAR(150) UNIQUE
    );

CREATE TABLE
    product (
        id SERIAL PRIMARY KEY,
        title VARCHAR(256),
        description VARCHAR(1000)
    );

CREATE TABLE
    listing (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        slug VARCHAR(300) UNIQUE NOT NULL,
        description VARCHAR(1000),
        category_id INTEGER,
        CONSTRAINT listings_categorys FOREIGN KEY (category_id) REFERENCES category (id),
        product_id INTEGER,
        CONSTRAINT listing_product FOREIGN KEY (product_id) REFERENCES product (id),
        vendor_id INTEGER,
        price FLOAT NOT NULL,
        quantity INT,
        sold INT,
        rating REAL,
        posted_at TIMESTAMP,
        updated_at TIMESTAMP
    );

-- Could definitely add more tables here