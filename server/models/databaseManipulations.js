const db = require('../database');


class databaseManipulations {
    static retrieveAllTables(callback) {
        db.query(`SELECT * from information_schema.tables WHERE table_schema = 'public';` , function (err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    // All Deletes
    static delete(tableName, allvars, callback) {
        let vals = [];
        let insertQuery = `DELETE FROM ${tableName} WHERE `;

        let assembledQuery = allvars.reduce((acc, curr) => {
            let queryname = Object.keys(curr)[0];
            let queryvar = Object.values(curr)[0];
            let queryString = '';
            if (queryvar !== null && queryvar !== undefined) {
                queryString = `${queryname} = $${vals.length + 1} AND `;
                vals.push(queryvar);
            }
            return acc + queryString;
        }, insertQuery);

        let finalQuery = assembledQuery.trim().substring(0, assembledQuery.trim().lastIndexOf(' ')).concat(';');

        db.query(finalQuery, vals, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    //All Updates
    static update(tableName, setVar, whereVar, callback) {
        let vals = [];
        let insertQuery = `UPDATE ${tableName} SET `;

        let assembledSetQuery = setVar.reduce((acc, curr) => {
            let queryname = Object.keys(curr)[0].slice(1);
            let queryvar = Object.values(curr)[0];
            let queryString = '';
            if (queryvar !== null && queryvar !== undefined) {
                queryString = `${queryname} = $${vals.length + 1} AND `;
                vals.push(queryvar);
            }
            return acc + queryString;
        }, insertQuery);

        let finalSetQuery = assembledSetQuery.trim().substring(0, assembledSetQuery.trim().lastIndexOf(' ')).concat(` WHERE `);

        let assembledSetWhereQuery = whereVar.reduce((acc, curr) => {
            let queryname = Object.keys(curr)[0].substr(0);
            let queryvar = Object.values(curr)[0];
            let queryString = '';
            if (queryvar !== null && queryvar !== undefined) {
                queryString = `${queryname} = $${vals.length + 1} AND `;
                vals.push(queryvar);
            }
            return acc + queryString;
        }, finalSetQuery);

        let finalQuery = assembledSetWhereQuery.trim().substring(0, assembledSetWhereQuery.trim().lastIndexOf(' ')).concat(';');

        db.query(finalQuery, vals, (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
}

module.exports = databaseManipulations;
