create view ForRent as
    select vid, vlicense, make, model, year, color, odometer, status, vtname, location, city
    from Vehicles
    where status = "for_rent";