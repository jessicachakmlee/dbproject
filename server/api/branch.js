const express = require('express');
const branch = require('../models/branch');

const router = express.Router();


router.get('/', function (req, res) {
    branch.retrieveAll(function (err, branch) {
        if (err)
            return res.json(err);
        return res.json(branch);
    })
});


router.post('/', function (req, res) {
    const location = req.body.location;
    const city = req.body.city;

    branch.insert(location, city, function (err, result) {
        if(err)
            return res.json(err);
        return res.json(result);
    })
});

module.exports = router;