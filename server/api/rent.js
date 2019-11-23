const express = require('express');
const rent = require('../models/rent');

const router = express.Router();


router.get('/', function (req, res) {
    rent.retrieveAll(function (err, rentals) {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

router.get('/:fromTime/:fromDate/:toTime/:toDate', (req, res) => {
    const fromDate = req.params.fromDate;
    const fromTime = req.params.fromTime;
    const toDate = req.params.toDate;
    const toTime = req.params.toTime;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveByTimeInterval(fromTime, fromDate, toTime, toDate, (err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

router.get('/vid/:fromTime/:fromDate/:toTime/:toDate', (req, res) => {
    const fromDate = req.params.fromDate;
    const fromTime = req.params.fromTime;
    const toDate = req.params.toDate;
    const toTime = req.params.toTime;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveVidByTimeInterval(fromTime, fromDate, toTime, toDate, (err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
    })
});

router.get('/vehicle/:fromTime/:fromDate/:toTime/:toDate', (req, res) => {
    const fromDate = req.params.fromDate;
    const fromTime = req.params.fromTime;
    const toDate = req.params.toDate;
    const toTime = req.params.toTime;
    // console.log("The datetime parameters being passed are: " +
    //     fromTime + ", " + fromDate);
    rent.retrieveVehiclesByTimeInterval(fromTime, fromDate, toTime, toDate, (err, rentals) => {
        if (err)
            return res.json(err);
        return res.json(rentals);
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