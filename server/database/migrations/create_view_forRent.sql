CREATE VIEW ForRent AS 
    SELECT vid, vlicense, make, model, year, color, odometer, status, vtname, location, city
<<<<<<< HEAD
    FROM Vehicles
    WHERE status = 'available';
=======
    FROM Vehicle v
    WHERE status = 'available';
>>>>>>> migrations: fixed data type & inconsistencies
