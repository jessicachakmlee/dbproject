CREATE TABLE Vehicle (
    vid         int UNIQUE,
    vlicense    char(7),
    make        char(20),
    model       char(20),
    year        char(4),
    color       char(20),
    odometer    int,
    status      varchar(20),
    vtname      char(50),
    location    char(50),
    city        char(50),
<<<<<<< HEAD
    PRIMARY KEY (vid),
    FOREIGN KEY (vehicleType)    REFERENCES VehicleType(vehicleType)
=======
    PRIMARY KEY (vlicense),
    FOREIGN KEY (vtname) REFERENCES VehicleType(vtname),
    CHECK (status = 'being_rented' 
            or status = 'in_shop' 
            or status = 'available')
>>>>>>> Implemented all tables given in D3 Description - Not yet double checked
);