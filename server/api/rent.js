const express = require('express');
const rent = require('../models/rent');
const router = express.Router();

// http://localhost:5000/api/rent/all
router.get('/all', function (req, res) {
    rent.retrieveAll(function (err, rentals) {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

// http://localhost:5000/api/rent/all/12:00:00/2019-05-03/12:00:00/2019-05-03/
// a method that retrieves list of all rented vehicles in the db
router.get('/all/:fromTime/:fromDate/:toTime/:toDate', (req, res) => {
    const fromDate = req.params.fromDate;
    const fromTime = req.params.fromTime;
    const toDate = req.params.toDate;
    const toTime = req.params.toTime;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveByTimeInterval(fromTime, fromDate, toTime, toDate, (err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

// http://localhost:5000/api/rent/vid/12:00:00/2019-05-03/12:00:00/2019-05-03/
// a method that retrieves list of rented vehicle licenses within time interval in the db
router.get('/vid/:fromTime/:fromDate/:toTime/:toDate', (req, res) => {
    const fromDate = req.params.fromDate;
    const fromTime = req.params.fromTime;
    const toDate = req.params.toDate;
    const toTime = req.params.toTime;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveVidByTimeInterval(fromTime, fromDate, toTime, toDate, (err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

//http://localhost:5000/api/rent/vehicle/12:00:00/2019-05-03/12:00:00/2019-05-03/
// gets all vehicles being rented at the given time
router.get('/vehicle/:fromTime/:fromDate/:toTime/:toDate', (req, res) => {
    const fromDate = req.params.fromDate;
    const fromTime = req.params.fromTime;
    const toDate = req.params.toDate;
    const toTime = req.params.toTime;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveVehiclesByTimeInterval(fromTime, fromDate, toTime, toDate, (err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

// http://localhost:5000/api/rent/vehicle/258%20Mesa%20Vista%20Drive/Boston%20Bar/12:00:00/2019-05-03/12:00:00/2019-05-03/
// gets all vehicles being rented at the time for one branch
router.get('/vehicle/:location/:city/:fromTime/:fromDate/:toTime/:toDate', (req, res) => {
    const fromDate = req.params.fromDate;
    const fromTime = req.params.fromTime;
    const toDate = req.params.toDate;
    const toTime = req.params.toTime;
    const location = req.params.location;
    const city = req.params.city;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveBranchVehiclesByTimeInterval(fromTime, fromDate, toTime, toDate,
        location, city, (err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

// 0 rows: http://localhost:5000/api/rent/report/2019-12-22
// 1 row: http://localhost:5000/api/rent/report/2019-11-22
// get vehicles rented on given date
router.get('/report/:fromDate', (req, res) => {
    const fromDate = req.params.fromDate;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveVehiclesRentedOnDate(fromDate, (err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

// http://localhost:5000/api/rent/branch_report/1131%20Haaglund%20Rd/Oliver/2019-11-22
// get vehicles rented at branch on given date
router.get('/branch_report/:location/:city/:fromDate', (req, res) => {

    const location = req.params.location;
    const city = req.params.city;
    const fromDate = req.params.fromDate;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveVehiclesRentedOnDateByBranch(fromDate, location, city, (err, rentals) => {
            if (err)
                return res.json(err);
            return res.json(rentals);
        })
});
// http://localhost:5000/api/rent/report/sum/2019-10-22
// get sum of vehicles rented out on given date in whole company
router.get('/report/sum/:fromDate', (req, res) => {
    const fromDate = req.params.fromDate;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveDaySum(fromDate, (err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

// 0 rows: http://localhost:5000/api/rent/report/sum_type/2019-12-22
// 1 row: http://localhost:5000/api/rent/report/sum_type/2019-11-22
// get count of each vehicle type rented on given date
router.get('/report/sum_type/:fromDate', (req, res) => {
    const fromDate = req.params.fromDate;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveDaySumByVCategory(fromDate, (err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

// 0 rows: http://localhost:5000/api/rent/report/sum_branch/2019-12-22
// 1 row: http://localhost:5000/api/rent/report/sum_branch/2019-11-22
// get count of vehicles rented on given date at each branch
router.get('/report/sum_branch/:fromDate', (req, res) => {
    const fromDate = req.params.fromDate;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveDaySumByBranch(fromDate, (err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

// 1 row: http://localhost:5000/api/rent/branch_report/sum/1131%20Haaglund%20Rd/Oliver/2019-11-22
// get count of all rentals within a branch on a given date
router.get('/branch_report/sum/:location/:city/:fromDate', (req, res) => {

    const location = req.params.location;
    const city = req.params.city;
    const fromDate = req.params.fromDate;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveDaySumInBranch(fromDate, location, city, (err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

// 1 row: http://localhost:5000/api/rent/branch_report/sum_type/1131%20Haaglund%20Rd/Oliver/2019-11-22
// get count of each vehicle type rented within a branch on given date
router.get('/branch_report/sum_type/:location/:city/:fromDate', (req, res) => {

    const location = req.params.location;
    const city = req.params.city;
    const fromDate = req.params.fromDate;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveDaySumByVCategoryInBranch(fromDate, location, city, (err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

// see here for how to send a post request and use this router
// https://www.freecodecamp.org/news/here-is-the-most-popular-ways-to-make-an-http-request-in-javascript-954ce8c95aaa/
// add a new rent row (Clerk transaction)
router.post('/new', function (req, res) {
    const rid = req.body.rid;
    const vlicense = req.body.vlicense;
    const dlicense = req.body.dlicense;
    const fromDate = req.body.fromDate;
    const fromTime = req.body.fromTime;
    const toDate = req.body.toDate;
    const toTime = req.body.toTime;
    const odometer = req.body.odometer;
    const cardName = req.body.cardName;
    const cardNo = req.body.cardNo;
    const expDate = req.body.expDate;
    const confNo = req.body.confNo;

    // console.log("in router, the req is: " + JSON.stringify(req.body));
    rent.insert(rid, vlicense, dlicense, fromDate, fromTime,
        toDate, toTime, odometer, cardName,
        cardNo, expDate, confNo, function (err, result) {
            if(err)
                return res.json(err);
            return res.json(result);
        })
});

module.exports = router;