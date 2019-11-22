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

        query = 'SELECT * FROM rent ' +
            'WHERE fromTime <= $1 AND fromDate <= $2, ' +
            'AND toTime >= $3 AND toDate >= $4';
        vals = [fromTime, fromDate, toTime, toDate];

        db.query(query, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (rid, vid, cellphone, fromDate, fromTime,
                   toDate, toTime, odometer, cardName,
                   cardNo, expDate, confNo, callback) {

        const insertQuery = {
            text: 'INSERT INTO rent(rid, vid, cellphone, fromDate, ' +
            'fromTime, toDate, toTime, odometer, cardName, ' +
            'cardNo, expDate, confNo) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
            values: [rid, vid, cellphone, fromDate, fromTime,
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