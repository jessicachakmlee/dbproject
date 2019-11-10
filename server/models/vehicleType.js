const db = require('../database');

class VehicleType {
    static retrieveAll(callback) {
        db.query('SELECT * from vehicleType', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (vtname, features, wrate, drate, hrate, wirate, dirate,
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