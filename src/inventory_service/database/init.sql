CREATE TABLE
    category (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL UNIQUE,
        description VARCHAR(500)
    );

CREATE TABLE
    listing (
        id SERIAL PRIMARY KEY,
        title VARCHAR(256) NOT NULL,
        description VARCHAR(500),
        image_url VARCHAR(500),
        featured BOOLEAN DEFAULT FALSE,
        price REAL NOT NULL,
        category_id INTEGER,
        CONSTRAINT listings_categorys FOREIGN KEY (category_id) REFERENCES category (id),
        posted_at TIMESTAMP,
        updated_at TIMESTAMP
    );