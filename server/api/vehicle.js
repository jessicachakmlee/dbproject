const express = require('express');
const vehicle = require('../models/vehicle');
const router = express.Router();

// module.exports = getAllVehicles = (location, city) => {
//     router.get('/', function (req, res) {
//         vehicle.retrieveAllVehiclesFromCurrentBranch(location, city, function (err, vehicle) {
//             if (err)
//                 return res.json(err);
//             return res.json(vehicle);
//         })
//     });
// };

router.get('/', function (req, res) {
    vehicle.retrieveAll(function (err, vehicles) {
        if (err)
            return res.json(err);
        return res.json(vehicles);
    });
});

router.get('/:location/:city/all', function (req, res) {
    const location = req.params.location;
    const city = req.params.city;
    vehicle.retrieveAllVehiclesFromCurrentBranch(location, city, function (err, vehicle) {
        if (err)
            return res.json(err);
        return res.json(vehicle);
    })
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