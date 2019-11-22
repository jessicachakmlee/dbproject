CREATE TABLE Reservation (
    confNo          int,
    vehicleType     char(50),
    cellphone       varchar(15),
    fromDate        date,
    fromTime        time,
    toDate          date,
    toTime          time,
    PRIMARY KEY     (confNo),
    FOREIGN KEY     (vehicleType) REFERENCES VehicleType,
    FOREIGN KEY     (cellphone) REFERENCES Customer
);