const db = require('../database');

class Rent {
    static retrieveAll(callback) {
        db.query('SELECT * from rent', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // a method that retrieves list of all rented vehicles in the db
    static retrieveByTimeInterval(fromTime, fromDate, toTime, toDate, callback) {

        const queryStatement = 'SELECT * FROM Rent ' +
            'WHERE fromTime <= $1 AND fromDate <= $2 ' +
            'AND toTime >= $3 AND toDate >= $4';

        const vals = [fromTime, fromDate, toTime, toDate];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // a method that retrieves list of rented vehicles within time interval in the db
    static retrieveVidByTimeInterval(fromTime, fromDate, toTime, toDate, callback) {

        const queryStatement = 'SELECT vlicense FROM Rent ' +
            'WHERE fromTime <= $1 AND fromDate <= $2 ' +
            'AND toTime >= $3 AND toDate >= $4';

        const vals = [fromTime, fromDate, toTime, toDate];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // gets all vehicles being rented at the time
    static retrieveVehiclesByTimeInterval(fromTime, fromDate, toTime, toDate, callback) {

        const queryStatement = 'SELECT * ' +
            'FROM Rent r, Vehicle v ' +
            'WHERE r.fromTime <= $1 AND r.fromDate <= $2 ' +
            'AND r.toTime >= $3 AND r.toDate >= $4 ' +
            'AND v.status = \'being_rented\'';

        const vals = [fromTime, fromDate, toTime, toDate];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (rid, vlicense, cellphone, fromDate, fromTime,
                   toDate, toTime, odometer, cardName,
                   cardNo, expDate, confNo, callback) {

        const insertQuery = {
            text: 'INSERT INTO rent(rid, vlicense, cellphone, fromDate, ' +
            'fromTime, toDate, toTime, odometer, cardName, ' +
            'cardNo, expDate, confNo) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
            values: [rid, vlicense, cellphone, fromDate, fromTime,
                toDate, toTime, odometer, cardName,
                cardNo, expDate, confNo]
        };

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = Rent;