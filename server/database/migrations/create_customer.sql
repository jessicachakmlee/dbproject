CREATE TABLE Customer (
      cellphone       varchar(15),
      name            char(50),
      address         char(100),
      dlicense        char(50),
      points          int,
      fees            int,
      PRIMARY KEY     (dlicense)
  );