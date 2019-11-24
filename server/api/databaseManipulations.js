const express = require('express');
const router = express.Router();
const databaseManipulations = require('../models/databaseManipulations');

router.get('/allTables', function (req, res) {
    databaseManipulations.retrieveAllTables(function (err, allTables) {
        if (err)
            return res.json(err);
        return res.json(allTables);
    })
});

// all deletes
router.delete('/customer/delete', function (req, res) {
    const cellphone = req.query.cellphone;
    const name = req.query.name;
    const address = req.query.address;
    const dlicense = req.query.dlicense;
    const points = req.query.points;
    const fees = req.query.fees;

    const tableName = 'Customer';
    const allvars = [{cellphone}, {name}, {address}, {dlicense},{points}, {fees}];

    databaseManipulations.delete(tableName, allvars, function (err, result) {
        if(err)
            return res.json(err);
        return res.json(result)
    })
});

router.delete('/rent/delete', function(req, res) {
    const rid = req.query.rid;
    const vlicense = req.query.vlicense;
    const dlicense = req.query.dlicense;
    const fromDate = req.query.fromDate;
    const fromTime = req.query.fromTime;
    const toDate = req.query.toDate;
    const toTime = req.query.toTime;
    const odometer = req.query.odometer;
    const cardName = req.query.cardName;
    const cardNo =  req.query.cardNo;
    const ExpDate = req.query.ExpDate;
    const confNo =  req.query.confNo;

    const tableName = 'Rent';
    const allvars = [{rid}, {vlicense}, {dlicense}, {fromDate}, {fromTime}, {toDate}, {toTime}, {odometer}, {cardName}, {cardNo},
        {ExpDate}, {confNo}];

    databaseManipulations.delete(tableName, allvars,function (err, result) {
            if(err)
                return res.json(err);
            return res.json(result)
    })
});


router.delete('/reservation/delete', function (req, res) {
    const confNo = req.query.confNo;
    const vtname = req.query.vtname;
    const cellphone = req.query.cellphone;
    const dlicense = req.query.address;
    const fromDate = req.query.fromDate;
    const fromTime = req.query.fromTime;
    const toDate = req.query.toDate;
    const toTime = req.query.toTime;

    const tableName = 'Reservation';
    const allvars = [{confNo}, {vtname}, {cellphone}, {dlicense}, {fromDate}, {fromTime}, {toDate}, {toTime}];

    databaseManipulations.delete(tableName, allvars, function (err, result) {
        if(err)
            return res.json(err);
        return res.json(result)
    })
});

router.delete('/returns/delete', function (req, res) {
    const rid = req.query.rid;
    const date = req.query.date;
    const time = req.query.time;
    const odometer = req.query.odometer;
    const fulltank = req.query.fulltank;
    const value = req.query.value;

    const tableName = 'Returns';
    const allvars = [{rid}, {date}, {time}, {odometer}, {fulltank}, {value}];

    databaseManipulations.delete(tableName, allvars, function (err, result) {
        if(err)
            return res.json(err);
        return res.json(result)
    })
});

router.delete('/vehicle/delete', function (req, res) {
    const vid = req.query.vid;
    const vlicense = req.query.vlicense;
    const make = req.query.make;
    const model = req.query.model;
    const year = req.query.year;
    const color = req.query.color;
    const odometer = req.query.odometer;
    const status = req.query.status;
    const vtname = req.query.vtname;
    const location = req.query.location;
    const city = req.query.city;

    const tableName = 'Vehicle';
    const allvars = [{vid}, {vlicense}, {make}, {model}, {year}, {color},
        {odometer}, {status}, {vtname}, {location}, {city}];

    databaseManipulations.delete(tableName, allvars, function (err, result) {
        if(err)
            return res.json(err);
        return res.json(result)
    })
});

router.delete('/vehicleType/delete', function (req, res) {
    const vtname = req.query.vtname;
    const features = req.query.features;
    const wrate = req.query.wrate;
    const drate = req.query.drate;
    const hrate = req.query.hrate;
    const wirate = req.query.wirate;
    const dirate = req.query.dirate;
    const hirate = req.query.hirate;
    const krate = req.query.krate;

    const tableName = 'VehicleType';
    const allvars = [{vtname}, {features}, {wrate}, {drate}, {hrate}, {wirate},
        {dirate}, {hirate}, {krate}];

    databaseManipulations.delete(tableName, allvars, function (err, result) {
        if(err)
            return res.json(err);
        return res.json(result)
    })
});

//All put methods
router.put('/customer/update', function (req, res) {
    const cellphone = req.query.cellphone;
    const name = req.query.name;
    const address = req.query.address;
    const dlicense = req.query.dlicense;
    const points = req.query.points;
    const fees = req.query.fees;

    const scellphone = req.body.cellphone;
    const sname = req.body.name;
    const saddress = req.body.address;
    const sdlicense = req.body.address;
    const spoints = req.body.points;
    const sfees = req.body.fees;

    const tableName = 'Customer';
    const setVar = [{scellphone}, {sname}, {saddress}, {sdlicense},{spoints}, {sfees}]
    const whereVar = [{cellphone}, {name}, {address}, {dlicense},{points}, {fees}];

    databaseManipulations.delete(tableName, setVar, whereVar, function (err, result) {
        if(err)
            return res.json(err);
        return res.json(result)
    })
});

router.put('/rent/update', function(req, res) {
    const rid = req.query.rid;
    const vlicense = req.query.vlicense;
    const dlicense = req.query.dlicense;
    const fromDate = req.query.fromDate;
    const fromTime = req.query.fromTime;
    const toDate = req.query.toDate;
    const toTime = req.query.toTime;
    const odometer = req.query.odometer;
    const cardName = req.query.cardName;
    const cardNo =  req.query.cardNo;
    const ExpDate = req.query.ExpDate;
    const confNo =  req.query.confNo;

    const srid = req.body.rid;
    const svlicense = req.body.vlicense;
    const sdlicense = req.body.dlicense;
    const sfromDate = req.body.fromDate;
    const sfromTime = req.body.fromTime;
    const stoDate = req.body.toDate;
    const stoTime = req.body.toTime;
    const sodometer = req.body.odometer;
    const scardName = req.body.cardName;
    const scardNo =  req.body.cardNo;
    const sExpDate = req.body.ExpDate;
    const sconfNo =  req.body.confNo;

    const tableName = 'Rent';
    const setVar = [{srid}, {svlicense}, {sdlicense}, {sfromDate}, {sfromTime}, {stoDate}, {stoTime}, {sodometer}, {scardName}, {scardNo},
        {sExpDate}, {sconfNo}];
    const whereVar = [{rid}, {vlicense}, {dlicense}, {fromDate}, {fromTime}, {toDate}, {toTime}, {odometer}, {cardName}, {cardNo},
        {ExpDate}, {confNo}];

    databaseManipulations.delete(tableName, setVar, whereVar, function (err, result) {
        if(err)
            return res.json(err);
        return res.json(result)
    })
});


router.put('/reservation/update', function (req, res) {
    const confNo = req.query.confNo;
    const vtname = req.query.vtname;
    const cellphone = req.query.cellphone;
    const dlicense = req.query.address;
    const fromDate = req.query.fromDate;
    const fromTime = req.query.fromTime;
    const toDate = req.query.toDate;
    const toTime = req.query.toTime;

    const sconfNo = req.body.confNo;
    const svtname = req.body.vtname;
    const scellphone = req.body.cellphone;
    const sdlicense = req.body.address;
    const sfromDate = req.body.fromDate;
    const sfromTime = req.body.fromTime;
    const stoDate = req.body.toDate;
    const stoTime = req.body.toTime;

    const tableName = 'Reservation';
    const setVar = [{sconfNo}, {svtname}, {scellphone}, {sdlicense}, {sfromDate}, {sfromTime}, {stoDate}, {stoTime}];
    const whereVar = [{confNo}, {vtname}, {cellphone}, {dlicense}, {fromDate}, {fromTime}, {toDate}, {toTime}];

    databaseManipulations.delete(tableName, setVar, whereVar,  function (err, result) {
        if(err)
            return res.json(err);
        return res.json(result)
    })
});

router.put('/returns/update', function (req, res) {
    const rid = req.query.rid;
    const date = req.query.date;
    const time = req.query.time;
    const odometer = req.query.odometer;
    const fulltank = req.query.fulltank;
    const value = req.query.value;

    const srid = req.body.rid;
    const sdate = req.body.date;
    const stime = req.body.time;
    const sodometer = req.body.odometer;
    const sfulltank = req.body.fulltank;
    const svalue = req.body.value;

    const tableName = 'Returns';
    const setVar = [{srid}, {sdate}, {stime}, {sodometer}, {sfulltank}, {svalue}];
    const whereVar = [{rid}, {date}, {time}, {odometer}, {fulltank}, {value}];

    databaseManipulations.delete(tableName, setVar, whereVar, function (err, result) {
        if(err)
            return res.json(err);
        return res.json(result)
    })
});

router.put('/vehicle/update', function (req, res) {
    const vid = req.query.vid;
    const vlicense = req.query.vlicense;
    const make = req.query.make;
    const model = req.query.model;
    const year = req.query.year;
    const color = req.query.color;
    const odometer = req.query.odometer;
    const status = req.query.status;
    const vtname = req.query.vtname;
    const location = req.query.location;
    const city = req.query.city;

    const svid = req.body.vid;
    const svlicense = req.body.vlicense;
    const smake = req.body.make;
    const smodel = req.body.model;
    const syear = req.body.year;
    const scolor = req.body.color;
    const sodometer = req.body.odometer;
    const sstatus = req.body.status;
    const svtname = req.body.vtname;
    const slocation = req.body.location;
    const scity = req.body.city;

    const tableName = 'Vehicle';
    const whereVar = [{vid}, {vlicense}, {make}, {model}, {year}, {color},
        {odometer}, {status}, {vtname}, {location}, {city}];
    const setVar = [{svid}, {svlicense}, {smake}, {smodel}, {syear}, {scolor},
        {sodometer}, {sstatus}, {svtname}, {slocation}, {scity}];

    databaseManipulations.delete(tableName, setVar, whereVar, function (err, result) {
        if(err)
            return res.json(err);
        return res.json(result)
    })
});

router.put('/vehicleType/update', function (req, res) {
    const vtname = req.query.vtname;
    const features = req.query.features;
    const wrate = req.query.wrate;
    const drate = req.query.drate;
    const hrate = req.query.hrate;
    const wirate = req.query.wirate;
    const dirate = req.query.dirate;
    const hirate = req.query.hirate;
    const krate = req.query.krate;

    const svtname = req.query.vtname;
    const sfeatures = req.query.features;
    const swrate = req.query.wrate;
    const sdrate = req.query.drate;
    const shrate = req.query.hrate;
    const swirate = req.query.wirate;
    const sdirate = req.query.dirate;
    const shirate = req.query.hirate;
    const skrate = req.query.krate;

    const tableName = 'VehicleType';
    const setVar = [{svtname}, {sfeatures}, {swrate}, {sdrate}, {shrate}, {swirate},
        {sdirate}, {shirate}, {skrate}];
    const whereVar = [{vtname}, {features}, {wrate}, {drate}, {hrate}, {wirate},
        {dirate}, {hirate}, {krate}];

    databaseManipulations.delete(tableName, setVar, whereVar, function (err, result) {
        if(err)
            return res.json(err);
        return res.json(result)
    })
});

module.exports = router;