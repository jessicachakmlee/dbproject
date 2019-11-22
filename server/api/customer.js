const express = require('express');
const customer = require('../models/customer.js');

const router = express.Router();

router.get('/:phoneNumber/retrieveCustomer', function (req, res) {
    const phoneNumber = req.params.phoneNumber;
    customer.retrieveIndvidualCustomerByPhoneNumber(phoneNumber, function (err, customer) {
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


router.post('/', function (req, res) {
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