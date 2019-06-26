const express = require('express');
const router = express.Router();

/**
 * Need to be moved to configuration file later
 */

const DataAcess = require('../DB-connect.js');


router.post('/login-page', function (request, res) {
	var UserEmail = request.body.UserEmail;
	var password = request.body.password;
	console.log(UserEmail + '' + password);
	if (UserEmail != '' && password != '')  {
		var inputJSON = { "UserEmail" : UserEmail , "Password" : password };
		var query = "USP_ValidateUsers";
       // console.log(query);
		DataAcess.DBPost(query, inputJSON,res);
		
	}
});

router.get('/login', function (req, res) {
	var inputJSON = { "UserEmail" : 'ishak@ast.com' , "Password" : 'password' };
	res.send("Logged in successfull" + inputJSON);
		
	});
module.exports = router;
