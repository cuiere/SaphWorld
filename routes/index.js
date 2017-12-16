var express = require('express');
var router = express.Router();
//const Web3 = require('web3');
const fs = require('fs');
var deploy_c = require('../deploy_contract');

/* GET home page. */

var players = [{address:'0xF88b86B413198B3BC6527105a53eE292A30365Ec', name:'Safouane'},{address:'0x5404367B8332B09B2B5423e188dAc2ba52Df0Ced', name:'Zina'}];
//const web3 = new Web3(new Web3.providers.IpcProvider("\\\\.\\pipe\\geth.ipc", net)); // WINDOWS path

	//deploy_c.deploy_contract('./voting.sol','TrustMe',[countries_]);

router.get('/', function(req, res, next) {
	

		

		res.render('index', { title: 'Imperator' ,description: 'Win all Wars and become the strongest EMPERATOR of the world'});

	
});

module.exports = router;

/*  */