CREATE TABLE Returns (
    rid         int,
    date        date,
    time        time,
    odometer    int,
    fulltank    int, 
    value       float,
    PRIMARY KEY (rid),
    FOREIGN KEY (rid) REFERENCES Rent
);