app.post("/filter-project", function (req, res) {

    var query = "usp_FilterProjectDetails";
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
    request.execute('usp_FilterProjectDetails', function (err, recordsets) {
        res.setHeader('Content-Type', 'application/json');
        res.send(recordsets);

        console.log(err)

    });
});