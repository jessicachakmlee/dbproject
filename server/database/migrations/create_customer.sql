CREATE TABLE Customer (
cellphone       BIGINT NOT NULL,
name            varchar(30),
address         varchar(50),
dlicense        INT,
points          int,
fees            float,
PRIMARY KEY     (dlicense),
UNIQUE(dlicense, cellphone)
);