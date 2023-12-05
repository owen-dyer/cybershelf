CREATE TABLE category (
    id PRIMARY KEY SERIAL,
    title VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(1000),
    slug VARCHAR(150) UNIQUE,
);

CREATE TABLE product (
    id PRIMARY KEY SERIAL,
    title VARCHAR(256),
    description VARCHAR(1000),
);

CREATE TABLE listing (
    id PRIMARY KEY SERIAL,
    title VARCHAR(100) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    description VARCHAR(1000),
    category INTEGER,
    CONSTRAINT listings_categorys
        FOREIGN KEY (category)
        REFERENCES category (id),
    product INTEGER,
    CONSTRAINT listing_product
        FOREIGN KEY (product)
        REFERENCES product (id),
    vendor_id INTEGER,
    price FLOAT NOT NULL,
    quantity INT,
    sold INT,
    rating FLOAT,
    posted_at DATETIME,
    updated_at DATETIME,
);

-- Could definitely add more tables here