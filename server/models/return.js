const db = require('../database');

class Return {
    static retrieveAll(callback) {
        db.query('SELECT * FROM Returns', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // http://localhost:5000/api/return/rid/49480
    // a method that retrieves a return and corresponding rent row by rid
    static retrieveByRid(rid, callback) {

        const queryStatement = 'SELECT * ' +
            'FROM Returns r INNER JOIN Rent re ' +
            'ON r.rid = re.rid ' +
            'WHERE r.rid = $1 ';

        const vals = [rid];

        db.query(queryStatement, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // http://localhost:5000/api/return/all/12:00:00/2019-05-03/12:00:00/2019-05-13/
    // a method that retrieves list of all returned vehicles in the db
        static retrieveByTimeInterval(fromTime, fromDate, toTime, toDate, callback) {

            const queryStatement = 'SELECT * FROM Returns r ' +
                'WHERE (date + time) ' +
                'BETWEEN $1 AND $2';

            const vals = [fromDate + " " + fromTime,
                    toDate + " " + toTime];

            db.query(queryStatement, vals, function (err, res) {
                if (err.error)
                    return callback(err);
                callback(res);
            });
        }

    // http://localhost:5000/api/return/vehicle/12:00:00/2019-05-03/12:00:00/2019-05-13/
    // gets all vehicles being returned at the time interval
        static retrieveVehiclesByTimeInterval(fromTime, fromDate, toTime, toDate, callback) {


            // SELECT *
            // FROM Returns r INNER JOIN Rent re ON r.rid = re.rid
            // INNER JOIN Vehicle v ON re.vlicense = v.vlicense
            const queryStatement = 'SELECT v.vlicense ' +
                'FROM Returns r INNER JOIN Rent re ON r.rid = re.rid ' +
                'INNER JOIN Vehicle v ON re.vlicense = v.vlicense ' +
                'WHERE (date + time) ' +
                'BETWEEN $1 AND $2';


            const vals = [fromDate + " " + fromTime,
                toDate + " " + toTime];

            db.query(queryStatement, vals, function (err, res) {
                if (err.error)
                    return callback(err);
                callback(res);
            });
        }

    // http://localhost:5000/api/return/vehicle/258%20Mesa%20Vista%20Drive/Boston%20Bar/12:00:00/2019-05-03/12:00:00/2019-05-20/
    // gets all vehicles being returned at the time for one branch
        static retrieveBranchVehiclesByTimeInterval(fromTime, fromDate, toTime, toDate,
                                                    location, city, callback) {

            const queryStatement = 'SELECT v.vlicense ' +
                'FROM Returns r INNER JOIN Rent re ON r.rid = re.rid ' +
                'INNER JOIN Vehicle v ON re.vlicense = v.vlicense ' +
                'WHERE (date + time) ' +
                'BETWEEN $1 AND $2 ' +
                'AND v.location = $3 AND v.city = $4 ' +
                'ORDER BY v.vtname';

            const vals = [fromDate + " " + fromTime,
                toDate + " " + toTime, location, city];

            db.query(queryStatement, vals, function (err, res) {
                if (err.error)
                    return callback(err);
                callback(res);
            });
        }

    // 2 rows: http://localhost:5000/api/return/report/vehicle/2019-05-11
    // gets all vehicles being returned at the given time
        static retrieveVehiclesReturnedOnDate(fromDate, callback) {

            const queryStatement = 'SELECT * ' +
                'FROM Returns r INNER JOIN Rent re ON r.rid = re.rid ' +
                'INNER JOIN Vehicle v ON re.vlicense = v.vlicense ' +
                'WHERE date = $1 ' +
                'ORDER BY v.city, v.location, v.vtname';

            const vals = [fromDate];

            db.query(queryStatement, vals, function (err, res) {
                if (err.error)
                    return callback(err);
                callback(res);
            });
        }

    // http://localhost:5000/api/return/branch_report/258%20Mesa%20Vista%20Drive/Boston%20Bar/2019-05-11
    // gets all vehicles being returned at the time for one branch
        static retrieveVehiclesReturnedOnDateByBranch(fromDate, location, city, callback) {

            const queryStatement = 'SELECT * ' +
                'FROM Returns r INNER JOIN Rent re ON r.rid = re.rid ' +
                'INNER JOIN Vehicle v ON re.vlicense = v.vlicense ' +
                'WHERE date = $1 ' +
                'AND v.location = $2 AND v.city = $3 ' +
                'ORDER BY v.city, v.location, v.vtname';

            const vals = [fromDate, location, city];

            db.query(queryStatement, vals, function (err, res) {
                if (err.error)
                    return callback(err);
                callback(res);
            });
        }

    // http://localhost:5000/api/return/report/sum/2019-05-11
    // gets sums of all Returnsals in the company
        static retrieveDaySum(fromDate, callback) {

            const queryStatement = 'SELECT COUNT(*) ' +
                'FROM Returns r ' +
                'WHERE date = $1 ';

            const vals = [fromDate];

            db.query(queryStatement, vals, function (err, res) {
                if (err.error)
                    return callback(err);
                callback(res);
            });
        }

    // 2 rows: http://localhost:5000/api/return/report/sum_type/2019-05-11
    // gets sums of all returns grouped by vehicle category (vtname)
        static retrieveDaySumByVCategory(fromDate, callback) {

            const queryStatement = 'SELECT v.vtname, COUNT(*) ' +
                'FROM Returns r INNER JOIN Rent re ON r.rid = re.rid ' +
                'INNER JOIN Vehicle v ON re.vlicense = v.vlicense ' +
                'WHERE date = $1 ' +
                'GROUP BY v.city, v.location, v.vtname';

            const vals = [fromDate];

            db.query(queryStatement, vals, function (err, res) {
                if (err.error)
                    return callback(err);
                callback(res);
            });
        }

    // 2 rows: http://localhost:5000/api/return/report/sum_branch/2019-05-11
    // gets sums of all returns grouped by branch
        static retrieveDaySumByBranch(fromDate, callback) {

            const queryStatement = 'SELECT v.location, v.city, COUNT(*) ' +
                'FROM Returns r INNER JOIN Rent re ON r.rid = re.rid ' +
                'INNER JOIN Vehicle v ON re.vlicense = v.vlicense ' +
                'WHERE date = $1 ' +
                'GROUP BY v.city, v.location';

            const vals = [fromDate];

            db.query(queryStatement, vals, function (err, res) {
                if (err.error)
                    return callback(err);
                callback(res);
            });
        }

    // http://localhost:5000/api/return/branch_report/sum/1278%20Granville%20St/Vancouver/2019-05-11
    // gets sums of all returns in the company
        static retrieveDaySumInBranch(fromDate, location, city, callback) {

            const queryStatement = 'SELECT COUNT(*) ' +
                'FROM Returns r INNER JOIN Rent re ON r.rid = re.rid ' +
                'INNER JOIN Vehicle v ON re.vlicense = v.vlicense ' +
                'WHERE date = $1 ' +
                'AND v.location = $2 AND v.city = $3 ';

            const vals = [fromDate, location, city];

            db.query(queryStatement, vals, function (err, res) {
                if (err.error)
                    return callback(err);
                callback(res);
            });
        }

    // http://localhost:5000/api/return/branch_report/sum_type/1131%20Haaglund%20Rd/Oliver/2019-11-22
    // gets sums of all returns in a branch grouped by vehicle category (vtname)
        static retrieveDaySumByVCategoryInBranch(fromDate, location, city, callback) {

            const queryStatement = 'SELECT v.vtname, COUNT(*) ' +
                'FROM Returns r INNER JOIN Rent re ON r.rid = re.rid ' +
                'INNER JOIN Vehicle v ON re.vlicense = v.vlicense ' +
                'WHERE date = $1 ' +
                'AND v.location = $2 AND v.city = $3 ' +
                'GROUP BY v.city, v.location, v.vtname';

            const vals = [fromDate, location, city];

            db.query(queryStatement, vals, function (err, res) {
                if (err.error)
                    return callback(err);
                callback(res);
            });
        }

    static insert (rid, date, time, odometer,
                   fulltank, value, callback) {

        const insertQuery = 'INSERT INTO return(rid, date, time, odometer, ' +
            'fulltank, value) ' +
            'VALUES ($1, $2, $3, $4, $5, $6) ' +
            'RETURNING *';
        const values = [rid, date, time, odometer, fulltank, value]

        db.query(insertQuery, values, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

}

module.exports = Return;