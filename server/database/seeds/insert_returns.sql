INSERT INTO Returns VALUES ((SELECT rid FROM Rent WHERE rid = 49480), 
                            '2019-05-11',
                            '17:00:00',
                            10000,
                            100,
                            40);

UPDATE Vehicle
SET odometer = odometer + 10000, status = 'available'
WHERE vlicense = 'SAV-EME';