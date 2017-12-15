var express = require('express');
var router = express.Router();
const Web3 = require('web3');
const asciiToHex = Web3.utils.hexToAsccii;

/* GET home page. */

var players = [{address:'0xF88b86B413198B3BC6527105a53eE292A30365Ec', name:'Safouane'},{address:'0x5404367B8332B09B2B5423e188dAc2ba52Df0Ced', name:'Zina'}]
router.get('/', function(req, res, next) {
		
	const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));
	
	
	
	web3.eth.getAccounts()
	.then(async (accounts) => { console.log('fin de la partie ',accounts)});
	
	web3.eth.getAccounts()
	
	.then(async (accounts) => {
		
		function playerName (){
			var result =  accounts[0];
			//console.log('res ',defaultAccount);

		players.forEach(function(item){
										console.log('item ',item.address);
										if (result == item.address) 
											result= item.name;
										});
			return result;
		}
		
		var pn =playerName()

		res.render('index', { title: 'Imperator' , description: 'Win all Wars and become the strongest EMPERATOR of the world', player_addr: players[1].name});
		return pn
	});
});

module.exports = router;
