    CREATE TABLE Reservation (
    confNo          int,
    vtname          char(50) NOT NULL,
    cellphone       varchar(15) NOT NULL,
    dlicense        int NOT NULL,
    fromDate        date,
    fromTime        time,
    toDate          date,
    toTime          time,
    PRIMARY KEY     (confNo),
    FOREIGN KEY     (vtname) REFERENCES VehicleType(vtname),
    FOREIGN KEY     (cellphone) REFERENCES Customer(cellphone),
      FOREIGN KEY 	(dlicense) REFERENCES Customer(dlicense)
);