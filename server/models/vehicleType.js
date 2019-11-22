const db = require('../database');

class VehicleType {
    static retrieveVehicleTypesWithOptions(city, location, vehicleType, startDate, startTime, callback) {
        console.log(startDate, startTime);
        const defaultVehicleTypeQuery =
            `SELECT * FROM vehicleType INNER JOIN vehicle ON (vehicle.vehicleType = vehicleType.vehicleType) INNER JOIN reservation ON (reservation.vtname = vehicleType.vehicleType) WHERE location LIKE '%${location.toString()}%' AND city LIKE '%${city.toString()}%'`;
        const stringForVehicleType = vehicleType != 'null' ? ` AND vehicleType.vehicleType LIKE '%${vehicleType}%'` : '';
        const stringForStartDateTime = startDate != 'null' && startTime != 'null' ? ` AND toDate::date <= date '${startDate}' AND toTime::time < time '${startTime}'` : '';
        const stringForEnd = ';'
        const finalQueryString = defaultVehicleTypeQuery.concat(stringForVehicleType).concat(stringForStartDateTime).concat(stringForEnd);

        db.query(finalQueryString, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static retrieveAll(callback) {
        db.query('SELECT * from vehicleType', function (err, res) {
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