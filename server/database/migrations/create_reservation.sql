CREATE TABLE Reservation (
    confNo          int,
<<<<<<< HEAD
    vehicleType     char(50),
<<<<<<< HEAD
    cellphone       BIGINT,
=======
    cellphone       varchar(15),
=======
    vtname          char(50) NOT NULL,
    cellphone       varchar(15) NOT NULL,
    dlicense        char(50) NOT NULL,
>>>>>>> Implemented all tables given in D3 Description - Not yet double checked
>>>>>>> Implemented all tables given in D3 Description - Not yet double checked
    fromDate        date,
    fromTime        time,
    toDate          date,
    toTime          time,
    PRIMARY KEY     (confNo),
<<<<<<< HEAD
    FOREIGN KEY     (vehicleType) REFERENCES VehicleType,
    FOREIGN KEY     (cellphone) REFERENCES Customer
=======
    FOREIGN KEY     (vtname) REFERENCES VehicleType,
    FOREIGN KEY     (cellphone, dlicense) REFERENCES Customer,
    FOREIGN KEY     (fromDate, fromTime, toDate, toTime) REFERENCES TimePeriod
>>>>>>> Implemented all tables given in D3 Description - Not yet double checked
);