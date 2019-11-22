const express = require('express');
const timePeriod = require('../models/timePeriod');
const router = express.Router();

router.get('/', function (req, res) {
    timePeriod.retrieveNow(function (err, vehicles) {
        if (err)
            return res.json(err);
        return res.json(vehicles);
    });
});

module.exports = router;