CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    admin BOOLEAN
);  

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    path TEXT,
    description TEXT,
    created_by INTEGER REFERENCES users
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE
);

CREATE TABLE image_tags (
    image_id INTEGER REFERENCES images,
    tag_id INTEGER REFERENCES tags
);