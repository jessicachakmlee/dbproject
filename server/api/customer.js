const express = require('express');
const customer = require('../models/customer.js');

const router = express.Router();

router.get('/:dlicense/retrieveCustomer', function (req, res) {
    const dlicense = req.params.dlicense;
    customer.retrieveIndividualCustomerByPhoneNumber(dlicense, function (err, customer) {
        if (err)
            return res.json(err);
        return res.json(customer);
    });
});

router.get('/', function (req, res) {
    customer.retrieveAll(function (err, customer) {
        if (err)
            return res.json(err);
        return res.json(customer);
    });
});


router.post('/new', function (req, res) {
    const cellphone = req.body.cellphone;
    const name = req.body.name;
    const address = req.body.address;
    const dlicense = req.body.dlicense;

    customer.insert(cellphone, name, address, dlicense, function (err, result) {
            if(err)
                return res.json(err);
            return res.json(result);
        })
});


module.exports = router;