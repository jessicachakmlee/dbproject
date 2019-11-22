const express = require('express');
const vehicle = require('../models/vehicle');
const router = express.Router();

router.get('/', function (req, res) {
    vehicle.retrieveAll(function (err, vehicles) {
        if (err)
            return res.json(err);
        return res.json(vehicles);
    });
});

router.post('/', function (req, res) {
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