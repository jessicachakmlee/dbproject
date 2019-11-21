CREATE VIEW ForSale AS 
    SELECT vid, vlicense, make, model, year, color, odometer, status, vtname, location, city
    FROM Vehicles
    WHERE status = "for_sale";