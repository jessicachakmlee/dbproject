const express = require('express');
const customer = require('../models/customer.js');

const router = express.Router();

router.get('/', function (req, res) {
    customer.retrieveAll(function (err, customer) {
        if (err)
            return res.json(err);
        return res.json(customer);
    })
});

module.exports = router;

