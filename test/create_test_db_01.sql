-- A test script to create tables in your local test server
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Customer;
CREATE TABLE Customer (
      cellphone       varchar(15),
      name            varchar(30),
      address         varchar(50),
      dlicense        varchar(10),
      PRIMARY KEY     (dlicense)
  );

INSERT INTO Customer(cellphone, name, address, dlicense) VALUES
	('778-456-7890', 'Cliff Wu', '123 Easy St', '8994255'),
	('604-452-9290', 'Oriana Yang', '4687 128 St', '4678555'),
	('604-535-1590', 'Alex Symons', '13750 100 Ave', '8246726');


DROP TABLE IF EXISTS Vehicle;
DROP TABLE IF EXISTS Vehicles;
CREATE TABLE Vehicle (
	vlicense VARCHAR(10),
	make VARCHAR(32),
	model VARCHAR(32),
	year INT,
	colour VARCHAR(32),
	odometer INT,
	status VARCHAR(32),
	vtname VARCHAR(32),
	location VARCHAR(32),
	city VARCHAR(32),
	PRIMARY KEY (vlicense)
);

INSERT INTO Vehicle(vlicense, make, model, year,
	colour, odometer, status, vtname, location, city) VALUES
	('V3TOL3', 'Honda', 'Civic', 2005, 'Silver',
		1000, 'available', 'Sedan', '1001 96 Ave', 'Surrey' ),
	('MSY600Y', 'BMW', 'X1', 2005, 'White',
		2000, 'available', 'SUV', '1001 96 Ave', 'Vancouver' ),
	('J8O2T4', 'Nissan', 'Leaf', 2010, 'Blue',
		30000, 'available', 'Coupe', '280 Semiahmoo Drive', 'Surrey' );
	('F1F8B8', 'Toyota', 'Sienna', 2005, 'Silver',
		10000, 'available', 'Sedan', 'asdfStreet', 'Surrey' );

DROP TABLE IF EXISTS Rent;
DROP TABLE IF EXISTS Rentals;
CREATE TABLE Rent (
	rid VARCHAR(10),
	vid VARCHAR(32),
	cellphone VARCHAR(32),
	fromDate DATE,
	fromTime TIME,
	toDate DATE,
	toTime TIME,
	odometer VARCHAR(32),
	cardName VARCHAR(32),
	cardNo VARCHAR(32),
	expDate VARCHAR(32),
	confNo VARCHAR(32),
	PRIMARY KEY (rid)
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

