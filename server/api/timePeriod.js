const express = require('express');
const timePeriod = require('../models/timePeriod.js');
const router = express.Router();

router.get('/', function (req, res) {
    timePeriod.retrieveAll(function (err, vehicles) {
        if (err)
            return res.json(err);
        return res.json(vehicles);
    });
});

router.get('/now', function (req, res) {
    timePeriod.retrieveNow(function (err, vehicles) {
        if (err)
            return res.json(err);
        return res.json(vehicles);
    });
});

router.get('/now/date', function (req, res) {
    timePeriod.retrieveNowDate(function (err, vehicles) {
        if (err)
            return res.json(err);
        return res.json(vehicles);
    });
});

router.get('/now/time', function (req, res) {
    timePeriod.retrieveNowTime(function (err, vehicles) {
        if (err)
            return res.json(err);
        return res.json(vehicles);
    });
});

module.exports = router;