const db = require('../database');

class EquipType {
    static retrieveAll(callback) {
        db.query('SELECT * from equipType', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (etname, drate, hrate, callback) {

        const insertQuery = {
            text: 'INSERT INTO equipType(etname, drate, hrate) ' +
            'VALUES ($1, $2, $3)',
            values: [etname, drate, hrate]
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
}

module.exports = EquipType;