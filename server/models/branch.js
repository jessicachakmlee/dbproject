const db = require('../database');

class Branch {
    static retrieveAll(callback) {
        db.query('SELECT location from branch', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (location, city, callback) {
        db.query('INSERT INTO branch (location) VALUES ($1)', [location], '(city) VALUES ($1)', [city], function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = Branch;