-- CREATE TABLE
DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
    account_number INTEGER PRIMARY KEY,
    name VARCHAR NOT NULL,
    amount INTEGER NOT NULL,
    type VARCHAR NOT NULL,
    credit_limit INTEGER
);

ALTER TABLE accounts ADD CONSTRAINT verify_type
CHECK (type IN ('checking', 'savings', 'credit'));

-- LOAD DATAS
INSERT INTO accounts 
    (account_number, name, amount, type)
VALUES
    (1, 'Johns Checking', 1000, 'checking'),
    (2, 'Janes Savings', 2000, 'savings'),
    (4, 'Bobs Checking', 40000, 'checking'),
    (5, 'Bills Savings', 50000, 'savings'),
    (7, 'Nancy Checking', 70000, 'checking'),
    (8, 'Nancy Savings', 80000, 'savings');

INSERT INTO accounts
    (account_number, name, amount, type, credit_limit)
VALUES
    (3, 'Jills Credit', -3000, 'credit', 4000),
    (6, 'Bills Credit', -60000, 'credit', 60000),
    (9, 'Nancy Credit', -90000, 'credit', 100000);

-- CREATE TABLE
DROP TABLE IF EXISTS account_withdraw_summary;
CREATE TABLE account_withdraw_summary (
    account_number INTEGER PRIMARY KEY,
    withdraw_date DATE NOT NULL,
    total_amount INTEGER NOT NULL
);

-- LOAD DATA
INSERT INTO account_withdraw_summary 
    (account_number, withdraw_date, total_amount)
VALUES
    (1, CURRENT_DATE, 0),
    (2, CURRENT_DATE, 0),
    (3, CURRENT_DATE, 0),
    (4, CURRENT_DATE, 0),
    (5, CURRENT_DATE, 0),
    (6, CURRENT_DATE, 0),
    (7, CURRENT_DATE, 0),
    (8, CURRENT_DATE, 0),
    (9, CURRENT_DATE, 0);
