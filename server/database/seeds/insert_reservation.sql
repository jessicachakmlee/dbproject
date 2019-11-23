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