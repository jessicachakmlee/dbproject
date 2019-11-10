const db = require('../database');

class TimePeriod {
    static retrieveAll(callback) {
        db.query('SELECT * from timePeriod', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (fromDate, fromTime, toDate, toTime, callback) {

        const insertQuery = {
            text: 'INSERT INTO timePeriod(fromDate, fromTime, toDate, toTime) ' +
            'VALUES ($1, $2, $3, $4)',
            values: [fromDate, fromTime, toDate, toTime]
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = TimePeriod;