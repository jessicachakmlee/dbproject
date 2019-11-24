const express = require('express');
const vehicleType = require('../models/vehicleType');

const router = express.Router();

router.get('/', function (req, res) {
    vehicleType.retrieveAll(function (err, vehicleType) {
        if (err)
            return res.json(err);
        return res.json(vehicleType);
    })
});


router.post('/new', function (req, res) {
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