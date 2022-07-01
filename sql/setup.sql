-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS items cascade;

CREATE TABLE items (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    item VARCHAR NOT NULL,
    bought BOOLEAN DEFAULT FALSE,
    user_id BIGINT,
    amount INT NOT NULL
);

INSERT INTO items(
    item,
    amount,
    bought
)
VALUES 
('bread', '5', false),
('apples', '2', true);