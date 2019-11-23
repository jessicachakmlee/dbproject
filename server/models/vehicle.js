const db = require('../database');

class Vehicle {
    static retrieveAll(callback) {
        db.query('SELECT * from vehicle;', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static retrieveAllVehiclesFromCurrentBranch(location, city, callback) {
        // const currBranchVehiclesQuery =
        //     `SELECT * FROM vehicle WHERE location LIKE '%${location.toString()}%' AND city LIKE '%${city.toString()}%';`

        const currBranchVehicleQuery = `SELECT * FROM vehicle WHERE location LIKE $1 AND city LIKE $2`;
        // need to add '%val%' strings here because sql doesn't understand placeholders inside quotes
        const values = [`%${location}%`, `%${city}%`];

        db.query(currBranchVehicleQuery, values, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // TODO: finish this kudasai
    // a method that retrieves list of all rented vehicles in the db
    static retrieveRentedByTimeInterval(fromDateTime, toDateTime, callback) {
        db.query('SELECT * FROM Vehicle ' +
            'WHERE status = \'rented\' ' +
            'AND ', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // a method that sums all rented vehicles in the db
    static retrieveRentedSum(callback) {
        db.query('SELECT COUNT(*) FROM Vehicle ' +
            'WHERE status = \'rented\' ', (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        })
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