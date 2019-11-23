const db = require('../database');


class databaseManipulations {
    static retrieveAllTables(callback) {
        db.query('SELECT * from reservation, rent, vehicle, vehicleType, customer, returns, timeperiod;', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (cellphone, points, fees, callback) {
        const insertQuery = 'INSERT INTO clubMember(cellphone, points, fees) VALUES ($1, $2, $3);'

        db.query(insertQuery, [cellphone, points, fees,], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = databaseManipulations;