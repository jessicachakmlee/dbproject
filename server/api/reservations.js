const express = require('express');
const reservation = require('../models/reservation');

const router = express.Router();


router.get('/reservation/', function (req, res) {
    reservation.retrieveAll(function (err, reservation) {
        if (err)
            return res.json(err);
        return res.json(reservation);
    })
});


router.post('/reservation/', function (req, res) {
    const confNo = req.body.confNo;
    const vtname = req.body.vtname;
    const cellphone = req.body.cellphone;
    const fromDate = req.body.fromDate;
    const fromTime = req.body.fromTime;
    const toDate = req.body.toDate;
    const toTime = req.body.toTime;

    reservation.insert(confNo, vtname, cellphone, fromDate,
        fromTime, toDate, toTime, function (err, result) {
            if(err)
                return res.json(err);
            return res.json(result);
        })
});

module.exports = router;