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
    FOREIGN KEY     (vtname) REFERENCES VehicleType(vtname) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY     (cellphone) REFERENCES Customer(cellphone) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY 	(dlicense) REFERENCES Customer(dlicense) ON DELETE CASCADE ON UPDATE CASCADE
);