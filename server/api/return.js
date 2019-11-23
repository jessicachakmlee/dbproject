const express = require('express');
const _return = require('../models/return');

const router = express.Router();

// http://localhost:5000/api/return/all
router.get('/all', function (req, res) {
    _return.retrieveAll(function (err, ret) {
        if (err)
            return res.json(err);
        return res.json(ret);
    })
});

// http://localhost:5000/api/return/all/12:00:00/2019-05-03/12:00:00/2019-05-13/
// a method that retrieves list of all returned vehicles in the db
router.get('/all/:fromTime/:fromDate/:toTime/:toDate', (req, res) => {
    const fromDate = req.params.fromDate;
    const fromTime = req.params.fromTime;
    const toDate = req.params.toDate;
    const toTime = req.params.toTime;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    _return.retrieveByTimeInterval(fromTime, fromDate, toTime, toDate, (err, returns) => {
        if (err)
            return res.json(err);
        return res.json(returns);
    })
});

// http://localhost:5000/api/return/vehicle/12:00:00/2019-05-03/12:00:00/2019-05-13/
// gets all vehicles being returned at the given time
router.get('/vehicle/:fromTime/:fromDate/:toTime/:toDate', (req, res) => {
    const fromDate = req.params.fromDate;
    const fromTime = req.params.fromTime;
    const toDate = req.params.toDate;
    const toTime = req.params.toTime;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    _return.retrieveVehiclesByTimeInterval(fromTime, fromDate, toTime, toDate, (err, returns) => {
        if (err)
            return res.json(err);
        return res.json(returns);
    })
});

// http://localhost:5000/api/return/vehicle/258%20Mesa%20Vista%20Drive/Boston%20Bar/12:00:00/2019-05-03/12:00:00/2019-05-20/
// gets all vehicles being returned at the time for one branch
router.get('/vehicle/:location/:city/:fromTime/:fromDate/:toTime/:toDate', (req, res) => {
    const fromDate = req.params.fromDate;
    const fromTime = req.params.fromTime;
    const toDate = req.params.toDate;
    const toTime = req.params.toTime;
    const location = req.params.location;
    const city = req.params.city;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    _return.retrieveBranchVehiclesByTimeInterval(fromTime, fromDate, toTime, toDate,
        location, city, (err, returns) => {
            if (err)
                return res.json(err);
            return res.json(returns);
        })
});

// 2 rows: http://localhost:5000/api/return/report/vehicle/2019-05-11
// get vehicles returned on given date
router.get('/report/vehicle/:fromDate', (req, res) => {
    const fromDate = req.params.fromDate;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    _return.retrieveVehiclesReturnedOnDate(fromDate, (err, returns) => {
        if (err)
            return res.json(err);
        return res.json(returns);
    })
});

// http://localhost:5000/api/return/branch_report/258%20Mesa%20Vista%20Drive/Boston%20Bar/2019-05-11
// get vehicles returned at branch on given date
router.get('/branch_report/:location/:city/:fromDate', (req, res) => {

    const location = req.params.location;
    const city = req.params.city;
    const fromDate = req.params.fromDate;
    console.log("The datetime parameters being passed are: " +
        fromDate + ", " + location + " , " + city);
    _return.retrieveVehiclesReturnedOnDateByBranch(fromDate, location, city, (err, returns) => {
        if (err)
            return res.json(err);
        return res.json(returns);
    })
});
// http://localhost:5000/api/return/report/sum/2019-05-11
// get sum of vehicles returned out on given date in whole company
router.get('/report/sum/:fromDate', (req, res) => {
    const fromDate = req.params.fromDate;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    _return.retrieveDaySum(fromDate, (err, returns) => {
        if (err)
            return res.json(err);
        return res.json(returns);
    })
});

// 2 rows: http://localhost:5000/api/return/report/sum_type/2019-05-11
// get count of each vehicle type returned on given date
router.get('/report/sum_type/:fromDate', (req, res) => {
    const fromDate = req.params.fromDate;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    _return.retrieveDaySumByVCategory(fromDate, (err, returns) => {
        if (err)
            return res.json(err);
        return res.json(returns);
    })
});

// 2 rows: http://localhost:5000/api/return/report/sum_branch/2019-05-11
// get count of vehicles returned on given date at each branch
router.get('/report/sum_branch/:fromDate', (req, res) => {
    const fromDate = req.params.fromDate;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    _return.retrieveDaySumByBranch(fromDate, (err, returns) => {
        if (err)
            return res.json(err);
        return res.json(returns);
    })
});

// 1 row: http://localhost:5000/api/return/branch_report/sum/1278%20Granville%20St/Vancouver/2019-05-11
// get count of all returns within a branch on a given date
router.get('/branch_report/sum/:location/:city/:fromDate', (req, res) => {

    const location = req.params.location;
    const city = req.params.city;
    const fromDate = req.params.fromDate;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    _return.retrieveDaySumInBranch(fromDate, location, city, (err, returns) => {
        if (err)
            return res.json(err);
        return res.json(returns);
    })
});

// 1 row: http://localhost:5000/api/return/branch_report/sum_type/1131%20Haaglund%20Rd/Oliver/2019-11-22
// get count of each vehicle type returned within a branch on given date
router.get('/branch_report/sum_type/:location/:city/:fromDate', (req, res) => {

    const location = req.params.location;
    const city = req.params.city;
    const fromDate = req.params.fromDate;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    _return.retrieveDaySumByVCategoryInBranch(fromDate, location, city, (err, returns) => {
        if (err)
            return res.json(err);
        return res.json(returns);
    })
});

router.post('/', function (req, res) {
    const rid = req.body.rid;
    const date = req.body.date;
    const time = req.body.time;
    const odometer = req.body.odometer;
    const fulltank = req.body.fulltank;
    const value = req.body.value;

    _return.insert(rid, date, time, odometer,
        fulltank, value, function (err, result) {
            if(err)
                return res.json(err);
            return res.json(result);
        })
});

module.exports = router;