const database = require('../index.js');
const scriptBuilder = require('./buildScriptFunctions');

function createTables() {
    let createTableScript = scriptBuilder.buildCreateTableScript();
    runQuery(createTableScript, `PostgreSQL successfully created tables.`);
};

function seedTables() {
    let seedScript = scriptBuilder.buildSeedScript();
    runQuery(seedScript, `PostgreSQL successfully created all tables.`);
};  

function dropTables() {
    let dropTablesScript = scriptBuilder.buildDropTablesScript();
    runQuery(dropTablesScript, `PostgreSql successfully dropped all tables.`);
};

function runQuery(script, successMsg) {
    database.query(script, (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log(successMsg);
    });
}

module.exports = {
    createTables,
    seedTables,
    dropTables
};

require('make-runnable');
