const express = require('express');

const router = express.Router();

/**
 * Need to be moved to configuration file later
 */

const DataAcess = require('../DB-connect.js');

app.get("/Resource-Master", function (req, res) {
    var query = "select Id,name from ResourceMaster";
    var request = new sql.Request();

    // query to the database and get the records
    request.query(query, function (err, recordset) {

        if (err) console.log(err)

        // send records as a response
        res.send(recordset);

    });
});

app.post("/Resource-Master", function (request, res) {
    var name = request.body.name;
    console.log(request.body);
    if (!request.body.name) {
        console.log("name is required");
    }
    var query = "INSERT INTO [dbo].[ResourceMaster] (Name) VALUES ('" + name + "')";
    console.log(query);
    var request = new sql.Request();

    // query to the database and insert the records
    request.query(query, function (err, recordset) {

        if (err) console.log(err)
        // send records as a response
        res.send(recordset);

    });
});

app.post("/ResourceMasterFilter", function (req, res) {

    var query = "usp_GetResourceMasterFilter";
    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    var tvp_FilterColumns = new sql.Table("[dbo].[FilterColumns]");
    var filterobj = req.body;
    // Columns must correspond with type we have created in database.   
    tvp_FilterColumns.columns.add('FilterColumn', sql.NVarChar(1000));
    tvp_FilterColumns.columns.add('FilterText', sql.NVarChar(sql.MAX));

    //console.log(filterobj)


    for (var object in filterobj) {
        tvp_FilterColumns.rows.add(Object.keys(filterobj[object]), Object.values(filterobj[object]));
    }

    request.input('FilterColumnsTable', sql.TVP('[dbo].[FilterColumns]'), tvp_FilterColumns);

    console.log(tvp_FilterColumns.rows[0]);
    console.log(tvp_FilterColumns.rows[1]);
    //Execute Store procedure  
    request.execute('usp_GetResourceMasterFilter', function (err, recordsets) {
        res.setHeader('Content-Type', 'application/json');
        res.send(recordsets);

        console.log(err)

    });
});