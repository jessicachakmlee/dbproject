const express = require('express');
const vehicleType = require('../models/vehicleType');

const router = express.Router();

router.get('/:city/:location/:vehicleType/:startDate/:startTime/displayVehicleTypes', function (req, res) {
    const city = req.params.city;
    const location = req.params.location;
    const carType = req.params.vehicleType;
    const startDate = req.params.startDate;
    const startTime = req.params.startTime;

    vehicleType.retrieveVehicleTypesWithOptions(location, city, carType, startDate, startTime, function (err, vehicle) {
        if (err)
            return res.json(err);
        return res.json(vehicle);
    })
});

router.get('/', function (req, res) {
    vehicleType.retrieveAll(function (err, vehicleType) {
        if (err)
            return res.json(err);
        return res.json(vehicleType);
    })
});


router.post('/', function (req, res) {
    const vtname = req.body.vtname;
    const features = req.body.features;
    const wrate = req.body.wrate;
    const drate = req.body.drate;
    const hrate = req.body.hrate;
    const wirate = req.body.wirate;
    const dirate = req.body.dirate;
    const hirate = req.body.hirate;
    const krate = req.body.krate;

    vehicleType.insert(vtname, features, wrate, drate, hrate,
        wirate, dirate, hirate, krate, function (err, result) {
        if(err)
            return res.json(err);
        return res.json(result);
    })
});

module.exports = router;