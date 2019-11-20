const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./database/index.js');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/api/branch', require('./api/branch'));
app.use('/api/customer', require('./api/customer'));
app.use('/api/rent', require('./api/rent'));
app.use('/api/reservations', require('./api/reservations'));
app.use('/api/return', require('./api/return'));
app.use('/api/vehicle', require('./api/vehicle'));
app.use('/api/vehicleType', require('./api/vehicleType'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

db.query('SELECT NOW()', (err, res) => {
    if (err.error)
        return console.log(err.error);
    console.log(`PostgreSQL connected: ${res[0].now}`);
});

module.exports = app;