const db = require('../database');

class Reservation {
    constructor(confNo) {
        this.confNo = -1;
    }
    // Retrieve a list of all reservations in the database
    static retrieveAll(callback) {
        db.query('SELECT * from reservation;', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // TODO: type checking?
    // Insert reservation into database
    static insert (confNo, vtname, cellphone, dlicense, fromDate,
                   fromTime, toDate, toTime, callback) {
        const insertQuery = `INSERT INTO reservation(confNo, vtname, cellphone, dlicense, 
        fromDate, fromTime, toDate, toTime) VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *;`
        db.query(insertQuery, [confNo, vtname, cellphone, dlicense, fromDate,
            fromTime, toDate, toTime], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // Select a reservation entry from database by confirmation number
    static retrieveByConfNo(confNo, callback){
        const selectQuery = `SELECT * FROM reservation WHERE confNo = $1;`

        db.query(selectQuery, [confNo],(err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        })
    }
}

module.exports = Reservation;