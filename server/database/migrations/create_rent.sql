CREATE TABLE Rent (
    rid             int,
    vid             int,
    cellphone       varchar(15),
    fromDate        date,
    fromTime        time,
    toDate          date,
    toTime          time,
    odometer        int,
    cardName        varchar(20),
    cardNo          int NOT NULL,
    ExpDate         date NOT NULL,
    confNo          int,
    PRIMARY KEY     (rid),
    FOREIGN KEY     (vid) REFERENCES ForRent,
    FOREIGN KEY     (cellphone) REFERENCES Customer,
    FOREIGN KEY     (fromDate, fromTime, toDate, toTime) REFERENCES TimePeriod,
    FOREIGN KEY     (confNo) REFERENCES Reservation
);