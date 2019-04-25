
const sql = require("mssql");
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

module.exports = {
    DBGet: function(query,res) {
  

//retrive all functions
    var request = new sql.Request();
        
    // query to the database and get the records
    request.query(query, function (err, Result) {
        
        if (err) 
            console.log(err)

        res.setHeader('Content-Type', 'application/json');
        res.send(Result);
    });
}



};