-- A test script to create tables in your local test server
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Customer;
CREATE TABLE Customer (
      cellphone       BIGINT NOT NULL,
      name            varchar(30),
      address         varchar(50),
      dlicense        INT,
      points          int,
      fees            float,
      PRIMARY KEY     (dlicense),
      UNIQUE(dlicense, cellphone)
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

DROP TABLE IF EXISTS VehicleType;
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

DROP TABLE IF EXISTS Vehicle;
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
    location    char(50) NOT NULL,
    city        char(50) NOT NULL,
    PRIMARY KEY (vlicense),
    FOREIGN KEY (vtname) REFERENCES VehicleType(vtname),
    CHECK (status = 'being_rented'
            or status = 'in_shop'
            or status = 'available')
);

INSERT INTO Vehicle(vlicense, make, model, year,
	color, odometer, status, vtname, location, city) VALUES
	('V3TOL3', 'Honda', 'Civic', 2005, 'Silver',
		1000, 'available', 'standard', '1001 96 Ave', 'Surrey' ),
	('MSY600Y', 'BMW', 'X1', 2005, 'White',
		2000, 'available', 'suv', '1001 96 Ave', 'Vancouver' ),
	('J8O2T4', 'Nissan', 'Leaf', 2010, 'Blue',
		30000, 'available', 'economy', '280 Semiahmoo Drive', 'Surrey' ),
	('F1F8B8', 'Toyota', 'Sienna', 2005, 'Silver',
		10000, 'available', 'standard', 'asdfStreet', 'Surrey' );
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

DROP TABLE IF EXISTS Reservation;
CREATE TABLE Reservation (
    confNo          int,
    vtname          char(50) NOT NULL,
    cellphone       BIGINT NOT NULL,
    dlicense        INT NOT NULL,
    fromDate        date,
    fromTime        time,
    toDate          date,
    toTime          time,
    PRIMARY KEY     (confNo),
    FOREIGN KEY     (vtname) REFERENCES VehicleType(vtname),
    FOREIGN KEY     (dlicense, cellphone) REFERENCES Customer(dlicense, cellphone)
);
INSERT INTO Reservation VALUES (172525,
                                (SELECT vtname FROM VehicleType WHERE vtname = 'economy'),
                                (SELECT cellphone FROM Customer WHERE cellphone = 6041111234),
                                (SELECT dlicense FROM Customer WHERE dlicense = 1234567),
                                '2019-11-22',
                                '17:00:00',
                                '2019-12-22',
                                '17:00:00');

INSERT INTO Reservation VALUES (113554,
                                (SELECT vtname FROM VehicleType WHERE vtname = 'compact'),
                                (SELECT cellphone FROM Customer WHERE cellphone = 6045159278),
                                (SELECT dlicense FROM Customer WHERE dlicense = 3333333),
                                '2020-01-01',
                                '10:30:00',
                                '2020-01-15',
                                '20:00:00');

INSERT INTO Reservation VALUES (241756,
                                (SELECT vtname FROM VehicleType WHERE vtname = 'suv'),
                                (SELECT cellphone FROM Customer WHERE cellphone = 6048294312),
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

DROP TABLE IF EXISTS Rent;
CREATE TABLE Rent (
    rid             int,
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
    FOREIGN KEY     (vlicense) REFERENCES Vehicle,
    FOREIGN KEY     (dlicense) REFERENCES Customer(dlicense),
    FOREIGN KEY     (confNo) REFERENCES Reservation(confNo)
);

INSERT INTO Rent VALUES (66554,
                        (SELECT vlicense FROM Vehicle WHERE vlicense = 'BBB-123'),
                        (SELECT dlicense FROM Customer WHERE dlicense = 1234567),
                        '2019-11-22',
                        '17:00:00',
                        '2019-12-22',
                        '17:00:00',
                        (SELECT odometer FROM Vehicle WHERE vlicense = 'BBB-123'),
                        'mastercard',
                        '5221 2233 3672 9298',
                        '12/22',
                        (SELECT confNo FROM Reservation WHERE confNo = 172525));

UPDATE Vehicle
SET status = 'being_rented'
WHERE vlicense = 'BBB-123';


INSERT INTO Rent VALUES (49480,
                        (SELECT vlicense FROM Vehicle WHERE vlicense = 'SAV-EME'),
                        (SELECT dlicense FROM Customer WHERE dlicense = 2020202),
                        '2019-05-03',
                        '10:00:00',
                        '2019-05-10',
                        '15:00:00',
                        (SELECT odometer FROM Vehicle WHERE vlicense = 'SAV-EME'),
                        'mastercard',
                        '5127 1771 7400 1290',
                        '12/21',
                        NULL);

UPDATE Vehicle
SET status = 'being_rented'
WHERE vlicense = 'SAV-EME';

DROP TABLE IF EXISTS TimePeriod;
CREATE TABLE TimePeriod (
      fromDate       DATE,
      fromTime       TIME,
      toDate         DATE,
      toTime         TIME,
      PRIMARY KEY     (fromDate, fromTime, toDate, toTime)
  );

--INSERT INTO Rent(rid, vid, cellphone, fromDate, fromTime,
--                 toDate, toTime, odometer, cardName,
--                 cardNo, expDate, confNo) VALUES
--	('12345', 'Honda', 'Civic', 2005, 'Silver',
--		1000, 'available', 'Sedan', '1001 96 Ave', 'Surrey' ),
--	('MSY600Y', 'BMW', 'X1', 2005, 'White',
--		2000, 'available', 'SUV', '1001 96 Ave', 'Vancouver' ),
--	('J8O2T4', 'Nissan', 'Leaf', 2010, 'Blue',
--		30000, 'available', 'Coupe', '280 Semiahmoo Drive', 'Surrey' );
--	('F1F8B8', 'Toyota', 'Sienna', 2005, 'Silver',
--		10000, 'available', 'Sedan', 'asdfStreet', 'Surrey' );



-- SELECT * FROM Customers;
-- SELECT * FROM Vehicles;

