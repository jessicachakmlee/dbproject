const db = require('../database');

class ClubMember {
    static retrieveAll(callback) {
        db.query('SELECT * from clubMember', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (cellphone, points, fees, callback) {

        const insertQuery = {
            text: 'INSERT INTO clubMember(cellphone, points, fees) ' +
            'VALUES ($1, $2, $3)',
            values: [cellphone, points, fees]
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = ClubMember;