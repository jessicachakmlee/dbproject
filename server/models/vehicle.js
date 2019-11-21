const db = require('../database');

class Vehicle {
    static retrieveAll(callback) {
        db.query('SELECT * from Vehicle', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static retrieveAllVehiclesFromCurrentBranch(location, city, callback) {
        const currBranchVehiclesQuery =
            'SELECT * FROM Vehicle ' +
            'WHERE location = $1 AND city = $2';

        db.query(currBranchVehiclesQuery, [location, city], function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (vid, vlicense, make, model, year, colour,
                   odometer, status, vtname, location, city, callback) {

        const insertQuery = {
            text: 'INSERT INTO vehicle(vid, vlicense, make, model, year, colour,' +
            ' odometer, status, vtname, location, city)' +
            '  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            values: [vid, vlicense, make, model, year, colour,
                odometer, status, vtname, location, city]
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // TODO: figure out how to use views with this

}

module.exports = Vehicle;