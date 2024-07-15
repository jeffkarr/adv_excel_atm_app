-- CREATE TABLE
DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
    account_number INTEGER PRIMARY KEY,
    name VARCHAR NOT NULL,
    amount INTEGER NOT NULL,
    type VARCHAR NOT NULL,
    credit_limit INTEGER,
    withdraw_date DATE NOT NULL, 
    total_withdraw_amt INTEGER NOT NULL
);

ALTER TABLE accounts ADD CONSTRAINT verify_type
CHECK (type IN ('checking', 'savings', 'credit'));

-- LOAD DATAS
INSERT INTO accounts 
    (account_number, name, amount, type, withdraw_date, total_withdraw_amt)
VALUES
    (1, 'Johns Checking', 1000, 'checking', '2024-07-14', 40),
    (2, 'Janes Savings', 2000, 'savings', CURRENT_DATE, 0),
    (4, 'Bobs Checking', 40000, 'checking', CURRENT_DATE, 0),
    (5, 'Bills Savings', 50000, 'savings', CURRENT_DATE, 0),
    (7, 'Nancy Checking', 70000, 'checking', CURRENT_DATE, 0),
    (8, 'Nancy Savings', 80000, 'savings', CURRENT_DATE, 0);

INSERT INTO accounts
    (account_number, name, amount, type, credit_limit, withdraw_date, total_withdraw_amt)
VALUES
    (3, 'Jills Credit', -3000, 'credit', 4000, CURRENT_DATE, 0),
    (6, 'Bills Credit', -60000, 'credit', 60000, CURRENT_DATE, 0),
    (9, 'Nancy Credit', -90000, 'credit', 100000, CURRENT_DATE, 0);
