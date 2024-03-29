const fs = require('fs');

function buildCreateTableScript() {
    let createTableScript = '';
    let folderName = 'migrations';

    createTableScript += readFileHelper(folderName, 'create_customer');
    createTableScript += readFileHelper(folderName, 'create_vehicleType');
    createTableScript += readFileHelper(folderName, 'create_vehicle');
    createTableScript += readFileHelper(folderName, 'create_view_forRent');
    createTableScript += readFileHelper(folderName, 'create_reservation');
    createTableScript += readFileHelper(folderName, 'create_rent');
    createTableScript += readFileHelper(folderName, 'create_returns');

    return createTableScript;
};

function buildSeedScript() {
    let seedScript = '';
    let folderName = 'seeds';

    seedScript += readFileHelper(folderName, 'insert_customer');
    seedScript += readFileHelper(folderName, 'insert_vehicleType');
    seedScript += readFileHelper(folderName, 'insert_vehicle');
    seedScript += readFileHelper(folderName, 'insert_reservation');
    seedScript += readFileHelper(folderName, 'insert_rent');
    seedScript += readFileHelper(folderName, 'insert_returns');
    
    return seedScript;
};

function buildDropTablesScript() {
    let dropTableScript = readFileHelper('migrations', 'drop_tables');
    return dropTableScript;
};

function readFileHelper(folderName, fileName) {
    let sqlContent = fs.readFileSync(`server/database/${folderName}/${fileName}.sql`);
    return sqlContent.toString();

};

module.exports = {
    buildCreateTableScript,
    buildSeedScript,
    buildDropTablesScript
};