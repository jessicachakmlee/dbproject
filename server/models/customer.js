const db = require('../database');

class Customer {
    static retrieveAll(callback) {
        db.query('SELECT * from customer', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (cellphone, name, address, dlicense, callback) {

        const insertQuery = {
            text: 'INSERT INTO customer(cellphone, name, address, dlicense) ' +
            'VALUES ($1, $2, $3, $4)',
            values: [cellphone, name, address, dlicense]
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
}

module.exports = Customer;