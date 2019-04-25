//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
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

//Setting up server
 var server = app.listen(process.env.PORT || 9000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

// //Initiallising connection string
// var config = {
//     user:'ASTDev',
//     password: 'Alphaserve@12345',
// 	server: 'LOC2-SD-POC1', 
//     database: 'ASTDashboard',
//     // driver: "msnodesqlv8",
//     port : 1433
//     // options: {
//     //     trustedConnection: true
//     //   } 
// };
const configfile = require('./SQLConfig.json');
const defaultConfig = configfile.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = configfile[environment];
const finalConfig = (defaultConfig, environmentConfig);

global.gConfig = finalConfig;
console.log(gConfig.port);

var config = {
user: gConfig.username,
password: gConfig.password,
server: gConfig.server, 
database: gConfig.database,
port : gConfig.port,
};

sql.connect(config, function (err) {
    if (err) console.log(err);
});


//staring get method here

app.get("/Project-Details", function(req , res){
    // var query = "SELECT PD.ID,CM.Name [ClientName],CRM.[Resource] ResourceName,PD.[CurrentStatus] AS [CurrentStatus],pd.[Company] as [AssociatedCompany],PD.Name [ProjectName],PD.Scope,PD.Owner as [DeliveryManager],PD.BackupContact,PD.StartDate as [PlannedStartDate],PD.Progress,PD.NextSteps,PD.Comments , [Revenue],[Action], [Project Manager] as [ProjectManager], [Source],[Client Contact] as [ClientContact], [Domain] from [dbo].[ProjectDetails_v2] PD inner join [dbo].[ClientMaster] cm on cm.id=PD.ClientId inner join [dbo].[ClientResMapping] crm on crm.id=PD.crmId order by PD.name";
var query ="usp_GetProjectDetails";
    // create Request object
    var request = new sql.Request();
        
    // query to the database and get the records
    request.query(query, function (err, Result) {
        
        if (err) console.log(err)

        res.setHeader('Content-Type', 'application/json');
        res.send(Result);
    
    })
});
    


app.get("/Client-Master", function(req , res){
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
   

app.get("/Company-Master", function(req , res){
	var query = "select Id,name from CompanyMaster";
    console.log(query)

    // create Request object
    var request = new sql.Request();
        
    // query to the database and get the records
    request.query(query, function (err, recordset) {
        
        if (err) console.log(err)

        // send records as a response
        res.send(recordset);
        
    });
});


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


app.get("/Resource-Master", function(req , res){
	var query = "select Id,name from ResourceMaster";
    var request = new sql.Request();
        
    // query to the database and get the records
    request.query(query, function (err, recordset) {
        
        if (err) console.log(err)

        // send records as a response
        res.send(recordset);
        
    });
});

//staring post method here


app.post("/Client-Master", function(request ,res){
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

app.post("/Company-Master", function(request ,res){
    var name = request.body.name;
    console.log(request.body);
    if(!request.body.name){
        console.log("name is required");
    }
    var query="INSERT INTO [dbo].[CompanyMaster] (Name) VALUES ('"+name+"')";
    console.log(query);
    var request = new sql.Request();
           
    // query to the database and insert the records
    request.query(query,function (err, recordset) {
        
        if (err) console.log(err)
        // send records as a response
        res.send(recordset);
      
    });
});

app.post("/Resource-Master", function(request ,res){
    var name = request.body.name;
    console.log(request.body);
    if(!request.body.name){
        console.log("name is required");
    }
    var query="INSERT INTO [dbo].[ResourceMaster] (Name) VALUES ('"+name+"')";
    console.log(query);
    var request = new sql.Request();
           
    // query to the database and insert the records
    request.query(query,function (err, recordset) {
        
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

app.post("/Project-Details", function(request,res){
    var ClientID = 3; //(request.body.ClientID);
    var ResourceID = 1;//request.body.ResourceID;
    var StatusID = 2;//request.body.StatusID;
    var CompanyID = 3;// request.body.CompanyID;
    var Name = 'Name';//request.body.Name;
    var Scope = 'Scope';//request.body.Scope;
    var Owner ='Owner';//request.body.Owner;
    var BackupContact = 'BackupContact';//request.body.BackupContact;
    var StartDate = '01/01/2019';//request.body.StartDate;
    var Progress = 'Progress';//request.body.Progress;
    var NextSteps = 'NextSteps';//request.body.NextSteps;
    var Comments = 'Comments';//srequest.body.Comments;
    
    var query="INSERT INTO [dbo].[ProjectDetails]"
   +"(ClientID,ResourceID,StatusID,CompanyID,Name,Scope,Owner,BackupContact,StartDate,Progress,NextSteps,Comments) VALUES ("+ClientID+","+ResourceID+","+StatusID+","+CompanyID+",'"+Name+"','"+Scope+"','"+Owner+"','"+BackupContact+"','"+StartDate+"','"+Progress+"','"+NextSteps+"','"+Comments+"')";
    console.log(query);
    var request = new sql.Request();
           
    // query to the database and insert the records
    request.query(query,function (err, recordset) {
        
        if (err) console.log(err)
        // send records as a response
        res.send(recordset);
       
    });
});