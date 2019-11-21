const db = require('../database/index');

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

    /* TODO find out how to inject values into the sql query
        don't know how to use parameterized queries*/
    // currently returns all rows
    // Select a reservation entry from database by confirmation number
    static retrieveByLicense(dlicense, callback){
        console.log("The driver's license passed in is: " + dlicense);
        const selectQuery = "SELECT * FROM customer WHERE dlicense = $1";
        const values = [dlicense];
        const selectQuery2 = {
            text: 'SELECT * FROM customer WHERE dlicense = $1',
            values: [dlicense]
        }

        console.log("The select query text is: " + selectQuery2.text);
        db.query(selectQuery2, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        })
    }
}

module.exports = Customer;