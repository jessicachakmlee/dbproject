const db = require('../database');

class TimePeriod {
    static retrieveAll(callback) {
        db.query('SELECT * from timePeriod', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // TODO: try to get this working for use in other methods - but not essential
    static async retrieveNow() {
        let currentTime;
        // gets date and time from postgres server
        currentTime = await db.query('SELECT NOW()', (err, res) => {
            if (err.error)
                return console.log(err.error);
            console.log("received from select now(): " + res[0].now);
            console.log("received from select now() type: " + typeof res[0].now);
            // return the first row of query result which has timestamp
            return res[0].now;
        });
        console.log("received from query: " + currentTime);
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