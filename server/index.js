const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/index.js');
const timeHelper = require('./models/timePeriod');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

if(ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
}

// start listening to the port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

// call time period class to get current time for db
timeHelper.retrieveNow((time, err) => {
    if (err) {
        consoleError(err);
    }
    console.log(`PostgreSQL connected: ${time[0].now}`);
});

db.query('SELECT current_user;', (err, res) => {
    if (err.error)
        return console.log(err.error);
    console.log(`PostgreSQL connected to user: ${res[0].current_user}`);
});


// All endpoints
app.use('/api/databaseManipulations', require('./api/databaseManipulations'));
app.use('/api/customer', require('./api/customer'));
app.use('/api/rent', require('./api/rent'));
app.use('/api/reservation', require('./api/reservations'));
app.use('/api/return', require('./api/return'));
app.use(`/api/vehicle`, require("./api/vehicle"));
app.use('/api/time', require("./api/timePeriod"));
app.use(`/api/vehicleType`, require("./api/vehicleType"));

module.exports = app;