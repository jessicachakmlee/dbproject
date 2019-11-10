const db = require('../database');

class Reservation {
    static retrieveAll(callback) {
        db.query('SELECT * from reservation', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (confNo, vtname, cellphone, fromDate,
                   fromTime, toDate, toTime, callback) {

        const insertQuery = {
            text: 'INSERT INTO reservation(confNo, vtname, cellphone, ' +
            'fromDate, fromTime, toDate, toTime) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7)',
            values: [confNo, vtname, cellphone, fromDate,
                fromTime, toDate, toTime]
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = Reservation;