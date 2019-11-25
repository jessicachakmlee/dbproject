CREATE TABLE Rent (
    rid             SERIAL,
    vlicense        char(7),
    dlicense        int,
    fromDate        date,
    fromTime        time,
    toDate          date,
    toTime          time,
    odometer        int,
    cardName        varchar(20),
    cardNo          varchar NOT NULL,
    ExpDate         varchar(5) NOT NULL,
    confNo          int,
    PRIMARY KEY     (rid),
    FOREIGN KEY     (vlicense) REFERENCES Vehicle ON DELETE CASCADE,
    FOREIGN KEY     (dlicense) REFERENCES Customer(dlicense) ON DELETE CASCADE,
    FOREIGN KEY     (confNo) REFERENCES Reservation(confNo) ON DELETE CASCADE
);