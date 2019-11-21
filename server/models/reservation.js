const db = require('../database');

class Reservation {
    constructor(confNo) {
        this.confNo = -1;
    }
    // Retrieve a list of all reservations in the database
    static retrieveAll(callback) {
        db.query('SELECT * from reservation', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // Insert reservation into database
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

    // Select a reservation entry from database by confirmation number
    static retrieveByConfNo(confNo, callback){
        const selectQuery = {
            text: 'SELECT * FROM reservation WHERE confNo = ?',
            values: [confNo]
        }
        db.query(selectQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        })
    }
}

module.exports = Reservation;