const express = require('express');
const _return = require('../models/return');

const router = express.Router();


router.get('/', function (req, res) {
    _return.retrieveAll(function (err, ret) {
        if (err)
            return res.json(err);
        return res.json(ret);
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