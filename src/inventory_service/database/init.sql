CREATE TABLE
    category (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL UNIQUE,
<<<<<<< HEAD
        description VARCHAR(1000),
        slug VARCHAR(150) UNIQUE
    );

CREATE TABLE
    product (
        id SERIAL PRIMARY KEY,
        title VARCHAR(256),
        description VARCHAR(1000),
        image_url VARCHAR(500),
        featured BOOLEAN DEFAULT FALSE
=======
        description VARCHAR(500)
>>>>>>> main
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