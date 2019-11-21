const db = require('../database');

class Branch {
    // retrieves all entries in branch table
    static retrieveAll(callback) {
        db.query('SELECT * from branch', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // Inserts entry into branch table
    static insert (location, city, callback) {
        db.query('INSERT INTO branch (location, city) VALUES ($1, $2)', [location, city], function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = Branch;