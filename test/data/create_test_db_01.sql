-- A test script to create tables in your local test server

DROP SCHEMA public cascade;
CREATE SCHEMA public;

CREATE TABLE Customer (
    cellphone       varchar(15) UNIQUE NOT NULL,
    name            char(50),
    address         char(100),
    dlicense        int,
    points          int,
    fees            float,
    PRIMARY KEY     (dlicense)
);

INSERT INTO Customer(cellphone, name, address, dlicense) VALUES
	(7784567890, 'Cliff Wu', '123 Easy St', 8994255),
	(6044529290, 'Oriana Yang', '4687 128 St', 4678555),
	(6045351590, 'Alex Symons', '13750 100 Ave', 8246726);

INSERT INTO Customer VALUES (6041111234, 'Robbie Williams', '992  Brew Creek Rd', 1234567, NULL, NULL);
INSERT INTO Customer VALUES (7781234567, 'Baymax', '675 Robson St', 1111111, NULL, NULL);
INSERT INTO Customer VALUES (6043335555, 'Steven Hawkings', '3787 Mesa Vista Drive', 2222222, NULL, NULL);
INSERT INTO Customer VALUES (6045159278, 'Goku Son', '472 Essendene Avenue', 3333333, 100, 20);
INSERT INTO Customer VALUES (7787534890, 'Gandalf', '295 Sixth Street', 4444444, 1, 20);
INSERT INTO Customer VALUES (6048294312, 'Sherlock Holmes', '3966 Tchesinkut Lake Rd', 5555555, 3, 20);
INSERT INTO Customer VALUES (6044849278, 'James Bond', '3170 Roger Street', 6666666, 2000, 20);
INSERT INTO Customer VALUES (6047779999, 'Severus Snape', '3860 Coldstream Avenue', 7777777, 6000, 20);
INSERT INTO Customer VALUES (7785789982, 'Albus Dumbledore', '2860 Wallace Street', 8888888, NULL, NULL);
INSERT INTO Customer VALUES (7784813671, 'Fitzwilliam Darcy', '1061 Glover Road', 9999999, NULL, NULL);
INSERT INTO Customer VALUES (7785016092, 'Elizabeth Bennet', '408 Kinchant St', 1010101, 350, 20);
INSERT INTO Customer VALUES (6044949956, 'Jack Sparrow', '4331 Old Spallumcheen Rd', 2020202, 30, 20);
INSERT INTO Customer VALUES (7781558897, 'James T. Kirk', '3556 Blind Bay Road', 3030303, 8, 20);
INSERT INTO Customer VALUES (7783234565, 'Homer Simpson', '4450 Tchesinkut Lake Rd', 4040404, NULL, NULL);


CREATE TABLE VehicleType (
    vtname          char(50),
    features        char(100),
    wrate           float,
    drate           float,
    hrate           float,
    wirate          float,
    dirate          float,
    hirate          float,
    krate           float,
    PRIMARY KEY (vtname)
);

INSERT INTO VehicleType VALUES ('economy', 'small, lightweight, inexpensive', 100, 18, 1, 10, 1.50, 0.05, 10);
INSERT INTO VehicleType VALUES ('compact', 'built for safety and better fuel efficiency', 110, 19, 1.20, 11, 1.55, 0.07, 11.50);
INSERT INTO VehicleType VALUES ('mid-size', 'five-inch touchscreen infotainment system', 130, 21, 1.50, 15, 1.99, 0.10, 15);
INSERT INTO VehicleType VALUES ('standard', 'remote keyless entry', 119.99, 20, 1.30, 13, 1.29, 0.08, 12);
INSERT INTO VehicleType VALUES ('full-size', 'remote keyless entry', 140, 23, 1.70, 16, 2, 0.15, 17);
INSERT INTO VehicleType VALUES ('suv', 'touchscreen infotainment system', 150, 15, 1.90, 19, 2.20, 0.20, 19);
INSERT INTO VehicleType VALUES ('truck', 'has backseats', 170, 18, 2.10, 2.40, 0.30, 22);

CREATE TABLE Vehicle (
    vid         int UNIQUE,
    vlicense    char(7),
    make        varchar(20),
    model       varchar(20),
    year        char(4),
    color       varchar(20),
    odometer    int,
    status      varchar(20),
    vtname      varchar(50),
    location    varchar(50) NOT NULL,
    city        varchar(50) NOT NULL,
    PRIMARY KEY (vlicense),
    FOREIGN KEY (vtname) REFERENCES VehicleType(vtname),
    CHECK (status = 'being_rented'
            or status = 'in_shop'
            or status = 'available')
);

INSERT INTO Vehicle VALUES (0, 'AAA-123', 'Ford', 'Convertible', 2019, 'red', 15000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'standard'), '1278 Granville St', 'Vancouver');
INSERT INTO Vehicle VALUES (1, 'BBB-123', 'Toyota', 'Corolla', 2009, 'silver', 2000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'economy'), '1131 Haaglund Rd', 'Oliver');
INSERT INTO Vehicle VALUES (2, 'CCC-123', 'Toyota', 'Corolla', 2000, 'red', 1000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'economy'), '258 Mesa Vista Drive', 'Boston Bar');
INSERT INTO Vehicle VALUES (3, 'DDD-123', 'BMW', 'SUV', 2010, 'blue', 12000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'suv'), '4190 Kinchant St', 'Haney');
INSERT INTO Vehicle VALUES (4, 'EEE-123', 'BMW', 'SUV', 2013, 'green', 12500, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'suv'), '4190 Kinchant St', 'Haney');
INSERT INTO Vehicle VALUES (5, 'FFF-123', 'Chevrolet', 'Colorado', 2014, 'black', 20000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'truck'), '1278 Granville St', 'Vancouver');
INSERT INTO Vehicle VALUES (6, 'ABB-223', 'Toyota', 'Yaris', 2019, 'blue', 30000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'compact'), '1131 Haaglund Rd', 'Oliver');
INSERT INTO Vehicle VALUES (7, 'ABC-232', 'Toyota', 'Corolla-Hybrid', 2019, 'silver', 40000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'compact'), '1278 Granville St', 'Vancouver');
INSERT INTO Vehicle VALUES (8, 'BBA-342', 'Toyota', 'Camry', 2019, 'green', 10000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'mid-size'),'1278 Granville St', 'Vancouver');
INSERT INTO Vehicle VALUES (9, 'BAC-456', 'Nissan', 'Altima', 2018, 'red', 50000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'full-size'), '258 Mesa Vista Drive', 'Boston Bar');
INSERT INTO Vehicle VALUES (10, 'BAB-888', 'Ford', 'Fiesta', 2015, 'blue', 80000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'full-size'), '4190 Kinchat St', 'Haney');
INSERT INTO Vehicle VALUES (11, 'DAC-484', 'Toyota', 'Corolla', 2010, 'black', 90000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'economy'), '1278 Granville St', 'Vancouver');
INSERT INTO Vehicle VALUES (12, 'SAV-EME', 'Toyota', 'Highlander', 2019, 'white', 10000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'suv'), '258 Mesa Vista Drive', 'Boston Bar');
INSERT INTO Vehicle VALUES (13, 'HEL-PME', 'Toyota', 'Corolla', 2018, 'white', 20000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'economy'), '1278 Granville St', 'Vancouver');


INSERT INTO Vehicle VALUES (14, 'BMW-123', 'BMW', 'X1', 2019, 'blue', 10000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'suv'), '1278 Granville St', 'Vancouver');
INSERT INTO Vehicle VALUES (15, 'FOR-WIN', 'Toyota', 'Corolla-Hybrid', 2019, 'red', 10000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'compact'), '1278 Granville St', 'Vancouver');
INSERT INTO Vehicle VALUES (16, 'BYE-BYE', 'Toyota', 'Corolla', 2002, 'green', 100000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'economy'), '1278 Granville St', 'Vancouver');
INSERT INTO Vehicle VALUES (17, 'CUL-8ER', 'Toyota', 'Yaris', 2018, 'black', 50000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'compact'), '1278 Granville St', 'Vancouver');

INSERT INTO Vehicle(vid, vlicense, make, model, year,
	color, odometer, status, vtname, location, city) VALUES
	(18, 'V3TOL3', 'Honda', 'Civic', 2005, 'Silver', 1000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'truck'), '1001 96 Ave', 'Surrey' ),
	(19, 'MSY600Y', 'BMW', 'X1', 2005, 'White', 2000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'suv'), '1001 96 Ave', 'Vancouver' ),
	(20, 'J8O2T4', 'Nissan', 'Leaf', 2010, 'Blue', 30000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'economy'), '280 Semiahmoo Drive', 'Surrey' ),
	(21, 'F1F8B8', 'Toyota', 'Sienna', 2005, 'Silver', 10000, 'available', (SELECT vtname FROM VehicleType WHERE vtname = 'mid-size'), 'asdfStreet', 'Surrey' );

CREATE VIEW ForRent AS
    SELECT vid, vlicense, make, model, year, color, odometer, status, vtname, location, city
    FROM Vehicle v
    WHERE status = 'available';

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
INSERT INTO Reservation VALUES (172525,
                                (SELECT vtname FROM VehicleType WHERE vtname = 'economy'),
                                (SELECT cellphone FROM Customer WHERE dlicense = 1234567),
                                (SELECT dlicense FROM Customer WHERE dlicense = 1234567),
                                '2019-11-22',
                                '17:00:00',
                                '2019-12-22',
                                '17:00:00');

INSERT INTO Reservation VALUES (113554,
                                (SELECT vtname FROM VehicleType WHERE vtname = 'compact'),
                                (SELECT cellphone FROM Customer WHERE dlicense = 3333333),
                                (SELECT dlicense FROM Customer WHERE dlicense = 3333333),
                                '2020-01-01',
                                '10:30:00',
                                '2020-01-15',
                                '20:00:00');

INSERT INTO Reservation VALUES (241756,
                                (SELECT vtname FROM VehicleType WHERE vtname = 'suv'),
                                (SELECT cellphone FROM Customer WHERE dlicense = 5555555),
                                (SELECT dlicense FROM Customer WHERE dlicense = 5555555),
                                '2019-12-12',
                                '13:30:00',
                                '2019-01-05',
                                '16:45:00');

INSERT INTO Reservation VALUES (437664,
                               (SELECT vtname FROM VehicleType WHERE vtname = 'suv'),
                               (SELECT cellphone FROM Customer WHERE dlicense = 7777777),
                               (SELECT dlicense FROM Customer WHERE dlicense = 7777777),
                               '2020-02-02',
                               '09:00:00',
                               '2020-02-03',
                               '21:00:00');

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

INSERT INTO Rent(vlicense, dlicense, fromDate, fromTime, toDate, toTime,
    odometer, cardName, cardNo, ExpDate, confNo)
    VALUES ((SELECT vlicense FROM ForRent WHERE vlicense = 'BBB-123'),
                        (SELECT dlicense FROM Customer WHERE dlicense = 1234567),
                        '2019-11-22',
                        '17:00:00',
                        '2019-12-22',
                        '17:00:00',
                        (SELECT odometer FROM ForRent WHERE vlicense = 'BBB-123'),
                        'mastercard',
                        '5221 2233 3672 9298',
                        '12/22',
                        (SELECT confNo FROM Reservation WHERE confNo = 172525));

UPDATE Vehicle
SET status = 'being_rented'
WHERE vlicense = 'BBB-123';


INSERT INTO Rent(vlicense, dlicense, fromDate, fromTime, toDate, toTime,
    odometer, cardName, cardNo, ExpDate, confNo)
    VALUES ((SELECT vlicense FROM ForRent WHERE vlicense = 'SAV-EME'),
                        (SELECT dlicense FROM Customer WHERE dlicense = 2020202),
                        '2019-05-03',
                        '10:00:00',
                        '2019-05-10',
                        '15:00:00',
                        (SELECT odometer FROM ForRent WHERE vlicense = 'SAV-EME'),
                        'mastercard',
                        '5127 1771 7400 1290',
                        '12/21',
                        NULL);

UPDATE Vehicle
SET status = 'being_rented'
WHERE vlicense = 'SAV-EME';

INSERT INTO Rent(vlicense, dlicense, fromDate, fromTime, toDate, toTime,
    odometer, cardName, cardNo, ExpDate, confNo)
    VALUES ((SELECT vlicense FROM Vehicle WHERE vlicense = 'AAA-123'),
                        (SELECT dlicense FROM Customer WHERE dlicense = 2020202),
                        '2019-05-03',
                        '10:00:00',
                        '2019-05-15',
                        '15:00:00',
                        (SELECT odometer FROM Vehicle WHERE vlicense = 'AAA-123'),
                        'visa',
                        '5127 1771 1234 1290',
                        '12/20',
                        NULL);

UPDATE Vehicle
SET status = 'being_rented'
WHERE vlicense = 'AAA-123';

INSERT INTO Rent(vlicense, dlicense, fromDate, fromTime, toDate, toTime,
    odometer, cardName, cardNo, ExpDate, confNo)
     VALUES ((SELECT vlicense FROM Vehicle WHERE vlicense = 'CCC-123'),
                        (SELECT dlicense FROM Customer WHERE dlicense = 2020202),
                        '2019-05-03',
                        '10:00:00',
                        '2019-05-20',
                        '03:00:00',
                        (SELECT odometer FROM Vehicle WHERE vlicense = 'CCC-123'),
                        'american express',
                        '4809 1771 1234 1290',
                        '12/21',
                        NULL);

UPDATE Vehicle
SET status = 'being_rented'
WHERE vlicense = 'CCC-123';

INSERT INTO Rent(vlicense, dlicense, fromDate, fromTime, toDate, toTime,
    odometer, cardName, cardNo, ExpDate, confNo)
     VALUES ((SELECT vlicense FROM Vehicle WHERE vlicense = 'DDD-123'),
                        (SELECT dlicense FROM Customer WHERE dlicense = 2020202),
                        '2019-05-03',
                        '10:00:00',
                        '2019-05-20',
                        '03:00:00',
                        (SELECT odometer FROM Vehicle WHERE vlicense = 'DDD-123'),
                        'mastercard',
                        '4809 1771 1234 0001',
                        '12/21',
                        NULL);

UPDATE Vehicle
SET status = 'being_rented'
WHERE vlicense = 'DDD-123';

INSERT INTO Rent(vlicense, dlicense, fromDate, fromTime, toDate, toTime,
    odometer, cardName, cardNo, ExpDate, confNo)
     VALUES ((SELECT vlicense FROM Vehicle WHERE vlicense = 'BYE-BYE'),
                        (SELECT dlicense FROM Customer WHERE dlicense = 1010101),
                        '2019-05-01',
                        '10:00:00',
                        '2019-05-20',
                        '03:00:00',
                        (SELECT odometer FROM Vehicle WHERE vlicense = 'BYE-BYE'),
                        'mastercard',
                        '3506 4658 1234 0001',
                        '08/20',
                        NULL);

UPDATE Vehicle
SET status = 'being_rented'
WHERE vlicense = 'BYE-BYE';

CREATE TABLE TimePeriod (
      fromDate       DATE,
      fromTime       TIME,
      toDate         DATE,
      toTime         TIME,
      PRIMARY KEY     (fromDate, fromTime, toDate, toTime)
  );

CREATE TABLE Returns (
    rid         int,
    date        date,
    time        time,
    odometer    int,
    fulltank    int,
    value       float,
    PRIMARY KEY (rid),
    FOREIGN KEY (rid) REFERENCES Rent ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO Returns
    VALUES ((SELECT rid FROM Rent WHERE vlicense = 'SAV-EME'),
        '2019-05-11', '17:00:00',
        (SELECT odometer FROM Rent WHERE vlicense = 'SAV-EME') + 10000,
        100, 40.00);

UPDATE Vehicle
SET odometer = odometer + 10000, status = 'available'
WHERE vlicense = 'SAV-EME';

INSERT INTO Returns
    VALUES ((SELECT rid FROM Rent WHERE vlicense = 'AAA-123'),
        '2019-05-11', '14:00:00',
        (SELECT odometer FROM Rent WHERE vlicense = 'AAA-123')+ 314,
        90, 30.64);

UPDATE Vehicle
SET odometer = odometer + 314, status = 'available'
WHERE vlicense = 'AAA-123';

INSERT INTO Returns
    VALUES ((SELECT rid FROM Rent WHERE vlicense = 'CCC-123'),
        '2019-05-15', '12:00:00',
        (SELECT odometer FROM Rent WHERE vlicense = 'CCC-123')+ 6054,
        90, 30.64);

UPDATE Vehicle
SET odometer = odometer + 6054, status = 'available'
WHERE vlicense = 'CCC-123';


-- SELECT * FROM Customers;
-- SELECT * FROM Vehicles;

