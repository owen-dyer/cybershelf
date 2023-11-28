--Database for a logged in consumer user to view items in their cart
CREATE TABLE cart (
    id PRIMARY KEY SERIAL,
    user INT,
    title VARCHAR(256),
    description VARCHAR(1000),
    price FLOAT NOT NULL,
);
