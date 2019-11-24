const express = require('express');
const reservation = require('../models/reservation');

const router = express.Router();

router.get('/', function (req, res) {
    reservation.retrieveAll(function (err, reservation) {
        if (err)
            return res.json(err);
        return res.json(reservation);
    })
});

router.post('/new', function (req, res) {
    const confNo = req.body.confNo;
    const vtname = req.body.vtname;
    const cellphone = req.body.cellphone;
    const dlicense = req.body.dlicense;
    const fromDate = req.body.fromDate;
    const fromTime = req.body.fromTime;
    const toDate = req.body.toDate;
    const toTime = req.body.toTime;

    reservation.insert(confNo, vtname, cellphone, dlicense, fromDate,
        fromTime, toDate, toTime, function (err, result) {
            if(err)
                return res.json(err);
            return res.json(result);
        })
});

router.get('/', function (req, res) {
    const confNo = req.body.confNo;
    reservation.retrieveByConfNo(confNo, function(err, reservation) {
        if (err)
            return res.json(err);
        return res.json(reservation);
    })
})

module.exports = router;