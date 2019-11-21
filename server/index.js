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

if(ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
    });
}

// start listening to the port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

// gets date and time from postgres server
db.query('SELECT NOW()', (err, res) => {
    if (err.error)
        return console.log(err.error);
    // takes first row which contains timestamp to print
    console.log(`PostgreSQL connected: ${res[0].now}`);
});

db.query('SELECT current_user;', (err, res) => {
    if (err.error)
        return console.log(err.error);
    console.log(`PostgreSQL connected to user: ${JSON.stringify(res)}`);
});


// All endpoints
app.use('/api/customer', require('./api/customer'));
app.use('/api/rent', require('./api/rent'));
app.use('/api/reservations', require('./api/reservations'));
app.use('/api/return', require('./api/return'));
app.use(`/api/vehicle`, require("./api/vehicle"));

module.exports = app;