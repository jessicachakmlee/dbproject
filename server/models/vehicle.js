const db = require('../database');

class Vehicle {
    static retrieveAll(callback) {
        db.query('SELECT * from vehicle;', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static retrieveAllVehiclesFromCurrentBranch(location, city, callback) {
        // const currBranchVehiclesQuery =
        //     `SELECT * FROM vehicle WHERE location LIKE '%${location.toString()}%' AND city LIKE '%${city.toString()}%';`

        const currBranchVehicleQuery = `SELECT * FROM vehicle WHERE location LIKE $1 AND city LIKE $2`;
        // need to add '%val%' strings here because sql doesn't understand placeholders inside quotes
        const values = [`%${location}%`, `%${city}%`];

        db.query(currBranchVehicleQuery, values, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // TODO: finish this kudasai
    // a method that retrieves list of all rented vehicles within a time interval
    static retrieveRentedByTimeInterval(fromDateTime, toDateTime, callback) {
        db.query('SELECT * FROM Vehicle ' +
            'WHERE status = \'being_rented\' ', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // a method that retrieves list of all rented vehicles in the db
    static retrieveRented(callback) {
        db.query('SELECT * FROM Vehicle ' +
            'WHERE status = \'being_rented\' ', function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // http://localhost:5000/api/vehicle/rented/sum
    // a method that sums all rented vehicles in the db
    static retrieveRentedSum(callback) {
        db.query('SELECT COUNT(*) FROM Vehicle ' +
            'WHERE status = \'being_rented\' ', (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        })
    }

    // all parameters filled
    //
    // localhost:5000/api/vehicle/options?city=Boston Bar&location=258 Mesa Vista Drive&vehicleType=full-size&startDate=2019-11-23&startTime=12:00:00&toDate=2019-11-24&toTime=12:00:00
    // missing time interval and vtname
    // localhost:5000/api/vehicle/options?city=Boston Bar&location=258 Mesa Vista Drive
    // missing location and time interval
    // localhost:5000/api/vehicle/options?city=Vancouver&vehicleType=economy
    // missing location and vtname
    // localhost:5000/api/vehicle/options?city=Vancouver&startDate=2019-11-24&startTime=12:00:00&toDate=2019-11-25&toTime=12:00:00

    // missing all inputs
    // localhost:5000/api/vehicle/options/Vancouver
    static retrieveVehiclesWithOptions(city, location, vehicleType, startDate,
                                       startTime, toDate, toTime, callback) {

        const select = 'SELECT * ';
        const from = 'FROM vehicle v ';
        const where = 'WHERE v.status = \'available\' ';
        const order = 'ORDER BY v.location, v.city, v.vtname;';

        let query = select.concat(from, where);
        // initiate array to hold string values.
        let vals = [];

        if (city !== undefined && city !== null) {
            const cityClause = `AND city = $${vals.length + 1} `;
            query = query.concat(cityClause);
            vals.push(city);
        }

        // set the location value as the param or default value
        if (location !== undefined && location !== null) {
            // add location to values
            let locationClause = `AND location = $${vals.length + 1} `;
            query = query.concat(locationClause);
            vals.push(location);
        }

        // a variable for vehicle name
        var vtnameClause;

        // if vehicleType is not null
        if (vehicleType !== undefined && vehicleType !== null) {

            // add a value for vtname and add it to the string
            vtnameClause = `AND vtname = $${vals.length + 1} `;

            // add it to the query string
            query = query.concat(vtnameClause);

            // add vehicleType value to values
            vals.push(vehicleType);
        }

        // a variable for the time interval clause
        var timeIntClause;

        //check if time interval is not null
        if (startDate !== undefined && startTime !== null &&
            startTime !== undefined && startTime !== null &&
            toDate !== undefined && toDate !== null &&
            toTime !== undefined && toTime !== null) {
            // find the vehicles not rented during these times
            timeIntClause = 'AND NOT EXISTS( ' +
                'SELECT v2.vlicense ' +
                'FROM Vehicle v2 ' +
                'INNER JOIN Rent r ON v2.vlicense = r.vlicense ' +
                'WHERE v.vlicense = v2.vlicense ' +
                'AND ((r.fromdate + r.fromtime), (r.todate + r.totime)) ' +
                `OVERLAPS ($${vals.length + 1}, $${vals.length + 2}) )`;

            // add the clause the the query
            query = query.concat(timeIntClause)

            // add vals to the string value list
            vals.push(startDate + " " + startTime, toDate + " " + toTime);
        } else {
            // the time interval is not valid
            // console.warn("The time interval is undefined")
        }

        // add order to query string
        query.concat(order);

        // console.log("The query is: " + query);
        // console.log("The values are: " + vals);

        db.query(query, vals, function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (vid, vlicense, make, model, year, colour,
                   odometer, status, vtname, location, city, callback) {

        const insertQuery = {
            text: 'INSERT INTO vehicle(vid, vlicense, make, model, year, colour,' +
            ' odometer, status, vtname, location, city)' +
            '  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            values: [vid, vlicense, make, model, year, colour,
                odometer, status, vtname, location, city]
        }

        db.query(insertQuery, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // TODO: figure out how to use views with this

}

module.exports = Vehicle;