const db = require('../database');

class VehicleType {
    static retrieveVehicleTypesWithOptions(city, location, vehicleType, startDate, startTime, callback) {
        const defaultVehicleTypeQuery =
            `SELECT * FROM vehicleType INNER JOIN vehicle ON (vehicle.vtname = vehicleType.vtname) LEFT OUTER JOIN reservation ON (vehicle.status = '%being_rented%' AND reservation.vtname = vehicle.vtname) WHERE status`;
        const statusQuery = startDate != 'null' && startTime != 'null' ? ` <> 'in_shop'` : ` LIKE '%available%'`;
        const stringForCity = city != 'null' ? ` AND city LIKE '%${city.toString()}%'` : '';
        const stringForLocation = location != 'null' ? ` AND location LIKE '%${location.toString()}%'` : '';
        const stringForVehicleType = vehicleType != 'null' ? ` AND vehicleType.vtname LIKE '%${vehicleType}%'` : '';
        const stringForStartDateTime = startDate != 'null' && startTime != 'null' ? ` AND toDate::date <= date '${startDate}' AND toTime::time < time '${startTime}'` : '';
        const stringForEnd = ' ORDER BY location ASC, vehicleType.vtname ASC;';
        const finalQueryString = defaultVehicleTypeQuery.concat(statusQuery).concat(stringForCity).concat(stringForLocation).concat(stringForVehicleType).concat(stringForStartDateTime).concat(stringForEnd);

        db.query(finalQueryString, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static retrieveAll(callback) {
        db.query('SELECT * from vehicleType;', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert(vtname, features, wrate, drate, hrate, wirate, dirate,
                  hirate, krate, callback) {

        const insertQuery = {
            text: 'INSERT INTO vehicleType(vtname, features, wrate,' +
                ' drate, hrate, wirate, dirate, hirate, krate) VALUES ($1,' +
                ' $2, $3, $4, $5, $6, $7, $8, $9)',
            values: [vtname, features, wrate, drate, hrate, wirate, dirate,
                hirate, krate]
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
}

module.exports = VehicleType;