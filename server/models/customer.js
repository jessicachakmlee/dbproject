const db = require('../database/index');
const client = require('pg');

class Customer {
    static retrieveIndividualCustomerByPhoneNumber(phoneNumber, callback) {
        db.query(`SELECT * from customer WHERE cellphone = $1;`, [phoneNumber],  function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // TODO need to test if this works
    static insert (cellphone, name, address, dlicense, callback) {
        const insertQuery = 'INSERT INTO customer(cellphone, name, address, dlicense) VALUES ($1, $2, $3, $4);'

        db.query(insertQuery, [cellphone, name, address, dlicense], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static retrieveAll(callback) {
        db.query('SELECT * from customer;', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // Select a reservation entry from database by confirmation number
    static retrieveByLicense(dlicense, callback){
        db.query("SELECT * FROM customer WHERE dlicense = $1", [dlicense], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        })
    }
}

module.exports = Customer;