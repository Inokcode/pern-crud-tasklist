CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

-- psql -U postgres
-- \l === list database
-- \c perntodo === connect to data base
--  \dt === show table