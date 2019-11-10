const db = require('../database');

class RentIncludes {
    static retrieveAll(callback) {
        db.query('SELECT * from rentIncludes', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (rid, eid, callback) {

        const insertQuery = {
            text: 'INSERT INTO rentIncludes(rid, eid) ' +
            'VALUES ($1, $2)',
            values: [rid, eid]
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = RentIncludes;