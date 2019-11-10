const db = require('../database');

class EforV {
    static retrieveAll(callback) {
        db.query('SELECT * from eForV', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (etname, vtname, callback) {

        const insertQuery = {
            text: 'INSERT INTO eForV(etname, vtname) ' +
            'VALUES ($1, $2)',
            values: [etname, vtname]
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = EforV;