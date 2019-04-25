const express = require('express');

const router = express.Router();

const sql = require('./../DB-connect.js');

/**
 * Need to be moved to configuration file later
 */


console.log(router);

router.get("/", function(req , res){
    var query = "select Id,name from ClientMaster";
    console.log(query)
   
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.setHeader('Content-Type', 'application/json');
            res.send(recordset);
           
        });
    });
   
    //staring post method here


router.post("/", function(request ,res){
    var name = request.body.name;
    console.log(request.body);
    if (!String(data.name).trim()) {
		errors.name = ['Name is required'];
	}
    if(!request.body.name){
        console.log("name is required");
    }
    var query="INSERT INTO [dbo].[ClientMaster] (Name) VALUES ('"+name+"')";

    console.log(query);
    var request = new sql.Request();
    // query to the database and insert the records
    request.query(query,function (err, recordset) {
        if (err) console.log(err)
         // send records as a response
        res.send(recordset);
       
    });
});

//staring post method here


app.post("/Client-Master", function (request, res) {
    var name = request.body.name;
    console.log(request.body);
    if (!String(data.name).trim()) {
        errors.name = ['Name is required'];
    }
    if (!request.body.name) {
        console.log("name is required");
    }
    var query = "INSERT INTO [dbo].[ClientMaster] (Name) VALUES ('" + name + "')";

    console.log(query);
    var request = new sql.Request();
    // query to the database and insert the records
    request.query(query, function (err, recordset) {
        if (err) console.log(err)
        // send records as a response
        res.send(recordset);

    });
});

//filter API
app.post("/ClientMasterFilter", function (req, res) {

    var query = "usp_GetClientMasterFilter";
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
    request.execute('usp_GetClientMasterFilter', function (err, recordsets) {
        res.setHeader('Content-Type', 'application/json');
        res.send(recordsets);

        console.log(err)

    });
});







module.exports = router;