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



