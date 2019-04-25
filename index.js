//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");

var app = express();



// Setting Base directory
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

// include routes
const projectDetails = require('./route/project-details.js');
const clientmaster = require('./route/client-master.js');
const clientContactmaster = require('./route/client-contact-master.js');
const companymaster = require('./route/company-master.js');
const domainmaster = require('./route/domain-master.js');
const resourcemaster = require('./route/resource-master.js');
const statusmaster = require('./route/status-master.js');
const vendoraaster = require('./route/vendor-master.js');
app.use('/project-details', projectDetails);
app.use('/client-contact-master', clientContactmaster);
app.use('/company-master', companymaster);
app.use('/domain-master', domainmaster);
app.use('/resource-master', resourcemaster);
app.use('/status-master', statusmaster);
app.use('/vendor-master', vendoraaster);
app.use('/client-master', clientmaster);

// include routes

//Setting up server
 var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });




