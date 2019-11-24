const db = require('../database');

class Rent {
    // http://localhost:5000/api/rent/
    // a method that retrieves all rent rows
    static retrieveAll(callback) {
        db.query('SELECT * from rent;', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // http://localhost:5000/api/rent/rid/66554
    // a method that retrieves a rent and corresponding vehicle row by rent id
    static retrieveByRid(rid, callback) {

        const queryStatement = 'SELECT * ' +
            'FROM Rent NATURAL JOIN Vehicle ' +
            'WHERE rid = $1 ';

        const vals = [rid];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // http://localhost:5000/api/rent/12:00:00/2019-05-03/12:00:00/2019-05-03/
    // a method that retrieves list of all rented vehicles in the db
    static retrieveByTimeInterval(fromTime, fromDate, toTime, toDate, callback) {

        const queryStatement = 'SELECT * FROM Rent ' +
            'WHERE fromTime <= $1 AND fromDate <= $2 ' +
            'AND toTime >= $3 AND toDate >= $4';

        const vals = [fromTime, fromDate, toTime, toDate];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // http://localhost:5000/api/rent/vid/12:00:00/2019-05-03/12:00:00/2019-05-03/
    // a method that retrieves list of rented vehicle licenses within time interval in the db
    static retrieveVidByTimeInterval(fromTime, fromDate, toTime, toDate, callback) {

        const queryStatement = 'SELECT vlicense FROM Rent ' +
            'WHERE fromTime <= $1 AND fromDate <= $2 ' +
            'AND toTime >= $3 AND toDate >= $4';

        const vals = [fromTime, fromDate, toTime, toDate];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    //http://localhost:5000/api/rent/vehicle/12:00:00/2019-05-03/12:00:00/2019-05-03/
    // gets all vehicles being rented at the time interval
    static retrieveVehiclesByTimeInterval(fromTime, fromDate, toTime, toDate, callback) {

        const queryStatement = 'SELECT * ' +
            'FROM Rent r NATURAL JOIN Vehicle v ' +
            'WHERE r.fromTime <= $1 AND r.fromDate <= $2 ' +
            'AND r.toTime >= $3 AND r.toDate >= $4 ' +
            'AND v.status = \'being_rented\' ' +
            'ORDER BY v.city, v.location, v.vtname';

        const vals = [fromTime, fromDate, toTime, toDate];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // http://localhost:5000/api/rent/vehicle/258%20Mesa%20Vista%20Drive/Boston%20Bar/12:00:00/2019-05-03/12:00:00/2019-05-03/
    // gets all vehicles being rented at the time for one branch
    static retrieveBranchVehiclesByTimeInterval(fromTime, fromDate, toTime, toDate,
                                                location, city, callback) {

        const queryStatement = 'SELECT * ' +
            'FROM Rent r NATURAL JOIN Vehicle v ' +
            'WHERE r.fromTime <= $1 AND r.fromDate <= $2 ' +
            'AND r.toTime >= $3 AND r.toDate >= $4 ' +
            'AND v.status = \'being_rented\' ' +
            'AND v.location = $5 AND v.city = $6 ' +
            'ORDER BY v.vtname';

        const vals = [fromTime, fromDate, toTime, toDate, location, city];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // 0 rows: http://localhost:5000/api/rent/report/2019-12-22
    // 1 row: http://localhost:5000/api/rent/report/2019-11-22
    // gets all vehicles being rented at the given time
    static retrieveVehiclesRentedOnDate(fromDate, callback) {

        const queryStatement = 'SELECT * ' +
            'FROM Rent r NATURAL JOIN Vehicle v ' +
            'WHERE r.fromDate = $1 ' +
            'AND v.status = \'being_rented\' ' +
            'ORDER BY v.city, v.location, v.vtname';

        const vals = [fromDate];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // http://localhost:5000/api/rent/branch_report/1131%20Haaglund%20Rd/Oliver/2019-11-22
    // gets all vehicles being rented at the time for one branch
    static retrieveVehiclesRentedOnDateByBranch(fromDate, location, city, callback) {

        const queryStatement = 'SELECT * ' +
            'FROM Rent r NATURAL JOIN Vehicle v ' +
            'WHERE r.fromDate = $1 ' +
            'AND v.status = \'being_rented\' ' +
            'AND v.location = $2 AND v.city = $3 ' +
            'ORDER BY v.city, v.location, v.vtname';

        const vals = [fromDate, location, city];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // http://localhost:5000/api/rent/report/sum/2019-10-22
    // gets sums of all rentals in the company
    static retrieveDaySum(fromDate, callback) {

        const queryStatement = 'SELECT COUNT(*) ' +
            'FROM Rent r NATURAL JOIN Vehicle v ' +
            'WHERE r.fromDate = $1 ' +
            'AND v.status = \'being_rented\''

        const vals = [fromDate];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // 0 rows: http://localhost:5000/api/rent/report/sum_type/2019-12-22
    // 1 row: http://localhost:5000/api/rent/report/sum_type/2019-11-22
    // gets sums of all rentals grouped by vehicle category (vtname)
    static retrieveDaySumByVCategory(fromDate, callback) {

        const queryStatement = 'SELECT v.vtname, COUNT(*) ' +
            'FROM Rent r NATURAL JOIN Vehicle v ' +
            'WHERE r.fromDate = $1 ' +
            'AND v.status = \'being_rented\' ' +
            'GROUP BY v.city, v.location, v.vtname';

        const vals = [fromDate];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // 0 rows: http://localhost:5000/api/rent/report/sum_branch/2019-12-22
    // 1 row: http://localhost:5000/api/rent/report/sum_branch/2019-11-22
    // gets sums of all rentals grouped by branch
    static retrieveDaySumByBranch(fromDate, callback) {

        const queryStatement = 'SELECT v.location, v.city, COUNT(*) ' +
            'FROM Rent r NATURAL JOIN Vehicle v ' +
            'WHERE r.fromDate = $1 ' +
            'AND v.status = \'being_rented\' ' +
            'GROUP BY v.city, v.location';

        const vals = [fromDate];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // http://localhost:5000/api/rent/branch_report/sum/2019-10-22
    // gets sums of all rentals in the company
    static retrieveDaySumInBranch(fromDate, location, city, callback) {

        const queryStatement = 'SELECT COUNT(*) ' +
            'FROM Rent r NATURAL JOIN Vehicle v ' +
            'WHERE r.fromDate = $1 ' +
            'AND v.status = \'being_rented\' ' +
            'AND v.location = $2 AND v.city = $3 ';

        const vals = [fromDate, location, city];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // http://localhost:5000/api/rent/branch_report/sum_type/1131%20Haaglund%20Rd/Oliver/2019-11-22
    // gets sums of all rentals in a branch grouped by vehicle category (vtname)
    static retrieveDaySumByVCategoryInBranch(fromDate, location, city, callback) {

        const queryStatement = 'SELECT v.vtname, COUNT(*) ' +
            'FROM Rent r NATURAL JOIN Vehicle v ' +
            'WHERE r.fromDate = $1 ' +
            'AND v.status = \'being_rented\' ' +
            'AND v.location = $2 AND v.city = $3 ' +
            'GROUP BY v.city, v.location, v.vtname';

        const vals = [fromDate, location, city];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // a method that inserts new rent row into the database
    static insert (rid, vlicense, dlicense, fromDate, fromTime,
                   toDate, toTime, odometer, cardName,
                   cardNo, expDate, confNo, callback) {

        console.log("the rid is: " + rid);
        const insertQuery = 'INSERT INTO rent(rid, vlicense, dlicense, fromdate, fromtime, todate, totime, odometer, cardname, cardno, expdate, confno) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
        const values = [rid, vlicense, dlicense, fromDate, fromTime,
                toDate, toTime, odometer, cardName,
                cardNo, expDate, confNo];

        db.query(insertQuery, values, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = Rent;