const express = require('express');
const customer = require('../models/customer.js');

const router = express.Router();


router.get('/', function (req, res) {
    customer.retrieveAll(function (err, customers) {
        if (err)
            return res.json(err);
        return res.json(customers);
    });
});


router.post('/', function (req, res) {
    const cellphone = req.body.cellphone;
    const name = req.body.name;
    const address = req.body.address;
    const dlicense = req.body.dlicense;

    customer.insert(cellphone, name, address, dlicense, function (err, result) {
            if(err)
                return res.json(err);
            return res.json(result);
        });
});

router.get('/dlicense/:dlicense', function (req, res) {
    const dli = req.params.dlicense;
    // console.log("The drivers license parameter is: " + dli);
    customer.retrieveByLicense(dli, function(err, customer) {
        if (err)
            return res.json(err);
        return res.json(customer);
    });
});

module.exports = router;