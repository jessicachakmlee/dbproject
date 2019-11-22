const db = require('../database');

class TimePeriod {
    static retrieveAll(callback) {
        db.query('SELECT * from timePeriod', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // gets date and time from postgres server
    static retrieveNow(callback) {
        let currentTime;
        currentTime = db.query('SELECT NOW()', (err, res) => {
            if (err.error)
                return callback(err);
            // console.log("received from select now(): " + res[0].now);
            // console.log("received from select now() type: " + typeof res[0].now);
            // return the first row of query result which has timestamp
            return callback(res);
        });
        // console.log("received from query: " + currentTime);
        return currentTime;
    }

    // TODO: Reminder postgres uses the following format for DATE: yyyy-mm-dd
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