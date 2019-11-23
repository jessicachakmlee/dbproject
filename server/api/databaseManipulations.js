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

module.exports = router;