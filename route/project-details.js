const express = require('express');

const router = express.Router();

/**
 * Need to be moved to configuration file later
 */

const DataAcess = require('../DB-connect.js');
//console.log(sql);

router.get("/", function(req , res) {
    // var query = "SELECT PD.ID,CM.Name [ClientName],CRM.[Resource] ResourceName,PD.[CurrentStatus] AS [CurrentStatus],pd.[Company] as [AssociatedCompany],PD.Name [ProjectName],PD.Scope,PD.Owner as [DeliveryManager],PD.BackupContact,PD.StartDate as [PlannedStartDate],PD.Progress,PD.NextSteps,PD.Comments , [Revenue],[Action], [Project Manager] as [ProjectManager], [Source],[Client Contact] as [ClientContact], [Domain] from [dbo].[ProjectDetails_v2] PD inner join [dbo].[ClientMaster] cm on cm.id=PD.ClientId inner join [dbo].[ClientResMapping] crm on crm.id=PD.crmId order by PD.name";
    var query ="usp_GetProjectDetails";
    DataAcess.DBGet(query,res);
    
});


router.post("/", function(request,res){
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
    
    var query = "INSERT INTO [dbo].[ProjectDetails]"
                    +"(ClientID,ResourceID,StatusID,CompanyID,Name,Scope,Owner,BackupContact,StartDate,Progress,NextSteps,Comments) VALUES ("+ClientID+","+ResourceID+","+StatusID+","+CompanyID+",'"+Name+"','"+Scope+"','"+Owner+"','"+BackupContact+"','"+StartDate+"','"+Progress+"','"+NextSteps+"','"+Comments+"')";
    console.log(query);
    // var request = new sql.Request();
           
    // // query to the database and insert the records
    // request.query(query,function (err, recordset) {
        
    //     if (err) console.log(err)
    //     // send records as a response
    //     res.send(recordset);
       
    // });
});

module.exports = router;