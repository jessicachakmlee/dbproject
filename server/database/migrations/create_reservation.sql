CREATE TABLE Reservation (
    confNo          int,
    vtname          char(50),
    cellphone       varchar(15),
    fromDate        date,
    fromTime        time,
    toDate          date,
    toTime          time,
    PRIMARY KEY     (confNo),
    FOREIGN KEY     (vtname) REFERENCES VehicleType,
    FOREIGN KEY     (cellphone) REFERENCES Customer
);