CREATE TABLE Customer (
    cellphone       varchar(15) UNIQUE NOT NULL,
    name            char(50),
    address         char(100),
    dlicense        int,
    points          int,
    fees            float,
    PRIMARY KEY     (dlicense)
);
