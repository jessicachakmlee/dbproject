const db = require('../database');

class ReserveIncludes {
    static retrieveAll(callback) {
        db.query('SELECT * from reserveIncludes', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (confNo, etname, callback) {

        const insertQuery = {
            text: 'INSERT INTO reserveIncludes(confNo, etname) ' +
            'VALUES ($1, $2)',
            values: [confNo, etname]
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = ReserveIncludes;