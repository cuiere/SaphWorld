var express = require('express');
var router = express.Router();
//const Web3 = require('web3');
const fs = require('fs');
//var deploy_c = require('../deploy_contract');

/* GET home page. */

router.get('/', function(req, res, next) {
	

		

		res.render('index', { title: 'Imperator' ,description: 'Win all Wars and become the strongest EMPERATOR of the world'});

	
});

module.exports = router;

/*  */