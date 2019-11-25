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