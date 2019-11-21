const express = require('express');
const rent = require('../models/rent');

const router = express.Router();


router.get('/', function (req, res) {
    rent.retrieveAll(function (err, rent) {
        if (err)
            return res.json(err);
        return res.json(rent);
    })
});


router.post('/', function (req, res) {
    const rid = req.body.rid;
    const vid = req.body.vid;
    const cellphone = req.body.cellphone;
    const fromDate = req.body.fromDate;
    const fromTime = req.body.fromTime;
    const toDate = req.body.toDate;
    const toTime = req.body.toTime;
    const odometer = req.body.odometer;
    const cardName = req.body.cardName;
    const cardNo = req.body.cardNo;
    const expDate = req.body.expDate;
    const confNo = req.body.confNo;

    rent.insert(rid, vid, cellphone, fromDate, fromTime,
        toDate, toTime, odometer, cardName,
        cardNo, expDate, confNo, function (err, result) {
            if(err)
                return res.json(err);
            return res.json(result);
        })
});

module.exports = router;