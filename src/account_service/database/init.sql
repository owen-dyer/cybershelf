CREATE TABLE abstract_user (
    id PRIMARY KEY SERIAL,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NULL, -- Normally NOT NULL but NULL for development purposes
    password_hash VARCHAR(256) NOT NULL,
    created_at DATETIME,
    last_login DATETIME,
);

CREATE TABLE consumer (
    id PRIMARY KEY SERIAL,
    base_user INTEGER,
    CONSTRAINT base_abstract_user
        FOREIGN KEY (base_user)
        REFERENCES abstract_user (id),
    -- No foreign keys to order or cart services because this service doesn't depend on them.
    street_address VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(100), -- This should really be linked to a states table or something and just have a foreign key
    zipcode VARCHAR(5), -- Need to add zero padding on the left side of this
    -- Probably some other stuff idc
);

CREATE TABLE vendor (
    id PRIMARY KEY SERIAL,
    base_user INTEGER,
    CONSTRAINT base_abstract_user
        FOREIGN KEY (base_user)
        REFERENCES abstract_user (id),
    slug VARCHAR(150) NOT NULL UNIQUE,
);

CREATE TABLE administrator (
    id PRIMARY KEY SERIAL,
    base_user INTEGER,
    CONSTRAINT base_abstract_user
        FOREIGN KEY (base_user)
        REFERENCES abstract_user (id),
    security_phrase VARCHAR(100) NOT NULL, -- Something like this, maybe 2FA, just for extra "admin" security
);