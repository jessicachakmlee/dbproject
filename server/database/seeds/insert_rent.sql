INSERT INTO Rent VALUES (66554, 
                        (SELECT vlicense FROM ForRent WHERE vlicense = 'BBB-123'),
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


INSERT INTO Rent VALUES (49480,
                        (SELECT vlicense FROM ForRent WHERE vlicense = 'SAV-EME'),
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