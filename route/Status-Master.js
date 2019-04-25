const express = require('express');

const router = express.Router();

/**
 * Need to be moved to configuration file later
 */

const DataAcess = require('../DB-connect.js');

app.get("/Status-Master", function(req , res){
	var query = "select Id,status from ProjectStatusMaster";
    // create Request object
    var request = new sql.Request();
        
    // query to the database and get the records
    request.query(query, function (err, recordset) {
        
        if (err) console.log(err)

        // send records as a response
        res.send(recordset);
       
    });
});

app.post("/project-Status-Master", function(request ,res){
    var status = request.body.status;
    console.log(request.body);
    if(!request.body.status){
        console.log("status is required");
    }
    var query="INSERT INTO [dbo].[ProjectStatusMaster] (status) VALUES ('"+status+"')";
    console.log(query);
    var request = new sql.Request();
           
    // query to the database and insert the records
    request.query(query,function (err, recordset) {
        
        if (err) console.log(err)
        // send records as a response
        res.send(recordset);
    });
});