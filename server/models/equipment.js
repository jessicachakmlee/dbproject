const db = require('../database');

class Equipment {
    static retrieveAll(callback) {
        db.query('SELECT * from equipment', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (eid, etname, status, location, city, callback) {

        const insertQuery = {
            text: 'INSERT INTO equipment(eid, etname, status, location, city) ' +
            'VALUES ($1, $2, $3, $4, $5)',
            values: [eid, etname, status, location, city]
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // TODO: figure out how to use views with this

}

module.exports = Equipment;