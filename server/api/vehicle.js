const express = require('express');
const vehicle = require('../models/vehicle');
const router = express.Router();

// http://localhost:5000/api/vehicle/all
// gets all vehicles in the db
router.get('/all', function (req, res) {
    vehicle.retrieveAll(function (err, vehicles) {
        if (err)
            return res.json(err);
        return res.json(vehicles);
    });
});

// http://localhost:5000/api/vehicle/branch/asdfStreet/Surrey
// gets all vehicles in a branch
router.get('/branch/:location/:city', function (req, res) {
    const location = req.params.location;
    const city = req.params.city;
    vehicle.retrieveAllVehiclesFromCurrentBranch(location, city,function (err, vehicles) {
        if (err)
            return res.json(err);
        return res.json(vehicles);
    });
});

// http://localhost:5000/api/vehicle/rented
// Gets all vehicles that are currently rented
router.get('/rented', function(req, res) {
    vehicle.retrieveRented((err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
})

// http://localhost:5000/api/vehicle/rented/sum
// Gets count of all vehicles that are currently rented
router.get('/rented/sum', (req, res) => {
    vehicle.retrieveRentedSum((err, sum) => {
        if (err)
            return res.json(err);
        let result = res.json(count);
        result = result.getValue;
        return result;
    })
})

// localhost:5000/api/vehicle/options/Boston Bar?location=258 Mesa Vista Drive&vehicleType=full-size&startDate=2019-11-23&startTime=12:00:00&toDate=2019-11-24&toTime=12:00:00// gets list of vehicles with optional inputs
router.get('/:isCount/options', (req, res) => {
    const isCount = req.params.isCount;
    const city = req.query.city;
    const location = req.query.location;
    const vehicleType = req.query.vehicleType;
    const startDate = req.query.startDate;
    const startTime = req.query.startTime;
    const toDate = req.query.toDate;
    const toTime = req.query.toTime;

    vehicle.retrieveVehiclesWithOptions(isCount, city, location, vehicleType, startDate,
        startTime, toDate, toTime, (err, vehicles) => {
        if (err)
            return res.json(err);
        let result = res.json(count);
        return result;
    })
});

router.post('/new', (req, res) => {
    const vid = req.body.vid;
    const vlicense = req.body.vlicense;
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year;
    const colour = req.body.colour;
    const odometer = req.body.odometer;
    const stat = req.body.status;
    const vtname = req.body.vtname;
    const loc = req.body.location;
    const city = req.body.city;

    vehicle.insert(vid, vlicense, make, model, year, colour,
        odometer, stat, vtname, loc, city, function (err, result) {
            if(err)
                return res.json(err);
            return res.json(result);
        })
});


module.exports = router;