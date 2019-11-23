CREATE TABLE Vehicle (
    vid         int,
    vlicence    char(7),
    make        char(20),
    model       char(20),
    year        date,
    color       char(20),
    odometer    int,
    status      char(8),
    vehicleType char(50),
    location    char(50),
    city        char(50),
    PRIMARY KEY (vid),
    FOREIGN KEY (vehicleType)    REFERENCES VehicleType(vehicleType)
);