const db = require('../database');

class Rent {
    static retrieveAll(callback) {
        db.query('SELECT * from rent', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static retrieveVid

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
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = Rent;