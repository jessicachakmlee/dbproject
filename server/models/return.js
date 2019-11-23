const db = require('../database');

class Return {
    static retrieveAll(callback) {
        db.query('SELECT * from returns;', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (rid, date, time, odometer,
                   fulltank, value, callback) {

        const insertQuery = {
            text: 'INSERT INTO return(rid, date, time, odometer, ' +
            'fulltank, value) ' +
            'VALUES ($1, $2, $3, $4, $5, $6)',
            values: [rid, date, time, odometer,
                fulltank, value]
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = Return;