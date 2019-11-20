CREATE TABLE Customer (
<<<<<<< HEAD
cellphone       BIGINT NOT NULL,
name            varchar(30),
address         varchar(50),
dlicense        INT,
points          int,
fees            float,
PRIMARY KEY     (dlicense),
UNIQUE(dlicense, cellphone)
);
=======
<<<<<<< HEAD
      cellphone       varchar(15),
      name            char(50),
      address         char(100),
      dlicense        char(50),
      points          int,
      fees            int,
      PRIMARY KEY     (dlicense)
  );
=======
    cellphone       varchar(15),
    name            char(50),
    address         char(100),
    dlicense        char(50),
    points          int,
    fees            int,
    PRIMARY KEY     (dlicense)
);
>>>>>>> Implemented all tables given in D3 Description - Not yet double checked
>>>>>>> Implemented all tables given in D3 Description - Not yet double checked
