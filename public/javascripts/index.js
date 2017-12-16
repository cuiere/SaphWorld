
// Using the IPC provider in node.js
//var net = require('net');



//web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));
//const web3 = new Web3(new Web3.providers.IpcProvider("\\\\.\\pipe\\geth.ipc")); // WINDOWS path





contractInstance = null;




function createTable(tableData) {
  var table = document.createElement('table');
  table.setAttribute("class","table table-bordered");
  table.setAttribute("id","providers");
  var tableHeader = document.createElement('thead');
  tableHeader.appendChild(document.createElement('tr').appendChild(document.createElement('th').appendChild(document.createTextNode("Providers"))));
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
  var row = document.createElement('tr');

  var cell = document.createElement('td');
  cell.appendChild(document.createTextNode(rowData));
  row.appendChild(cell);
   

    tableBody.appendChild(row);
  });

  table.appendChild(tableHeader);
  table.appendChild(tableBody);
  return table;
}

function refresh_providers(tableData){
	
	tab = createTable(tableData);
	old_tab = document.getElementById("providers");
		 // console.dir(old_tab);
	old_tab.parentNode.replaceChild(tab, old_tab);	  
}

function add_token_provider(t_addr) {
	console.log('add_token_provider');
  web3.eth.getAccounts()
  .then((accounts) => {
     contractInstance.methods.addTokenProvider(t_addr)
	 .send({from: accounts[0],gas: 470000000},function(err,res){console.log('err, res',err,res)});
  });

  
}

function get_token_provider(symb) {
	console.log('get_token_provider');
  web3.eth.getAccounts()
  .then((accounts) => {
		 console.log('err, res',err,res)
		  contractInstance.methods.getTokenProviderAddress(asciiToHex(symb))
			.call({gas:470000000},function(error,result){ console.log('Laddresse du tokenprov est ', result);});
	
  })

  
}











function rank(prov,prod,mod){
	
   web3.eth.getAccounts()
  .then((accounts) => {
	  contractInstance.methods.rank(prov,prod,mod)
	  .send({from: accounts[0],gas: 470000000},function(res,err){console.log('product rated ! ');})
		.then(() => {
			a = contractInstance.methods.getRank(prov,prod,mod)
			.call({from: accounts[0]},function(error,result){ console.log('Le Rank de ',prod,'est ', result);})
			
			})
		.then(() => {
			a = contractInstance.methods.getModalities(prod)
			.call({from: accounts[0]},function(error,result){ console.log('Les modalites de ',prod,'est ', result);})
			
			});
			
			
	  
	  });
}

function getRank(prov,prod,mod){
	
	res = web3.eth.getAccounts()
  .then((accounts) => {
     return contractInstance.methods.getRank(prov,prod,mod).call({gas:2000000});
  });
  
  return res;
}


function getCountries(){
	
	res = web3.eth.getAccounts()
  .then((accounts) => {
     return contractInstance.methods.getCountries().call({gas:2000000});
  });
  
  return res;
}


function add_provider(){
	
	 providerName = $("#provider_input").val();
  web3.eth.getAccounts()
  .then((accounts) => {
    return contractInstance.methods.add_provider(asciiToHex(providerName)).send({from: accounts[0]});
  })
  .then(() => {
    return contractInstance.methods.get_providers().send({from: accounts[0]});
  })
  .then((prvdrs) => {
	  refresh_providers(prvdrs);  
  });
	
	
	
}


function becomeAKing(count_id){
	
  web3.eth.getAccounts()
  .then((accounts) => {
     contractInstance.methods.becomeAKing(count_id)
	 .send({from: accounts[0], gas:200000000, value:1},function(res,err){console.log('you are the king ! ',res,' err ',err);})
	 .then(() => {
			contractInstance.methods.getKing(count_id)
			.call({from: accounts[0],gas:20000000},function(error,result){ console.log('Le king est ', result,error);})
			
			});
  })
  
 
	
	
}





/* $(document).ready(function() { 

	contractInstance = new web3.eth.Contract(ABI_DEFINITION, CONTRACT_ADDRESS);
	web3.eth.getAccounts()
	  .then((accounts) => {
	  console.log('token methods', contractInstance.methods.balanceOf(accounts[0]).call({gas:2000000}).then(console.log));
	  })
}); */


//accounts[0]


$(document).ready(function() { 
		web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));
	
	
	console.log('web3 version => ', web3.version);
	console.log('web 3.eth => ', web3.eth.subscribe);
	const ABI_DEFINITION=[{"constant":true,"inputs":[{"name":"prod","type":"bytes32"}],"name":"getModalities","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},
	{"constant":false,"inputs":[{"name":"coinContractAddress","type":"address"},{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
	{"constant":true,"inputs":[{"name":"prod","type":"bytes32"}],"name":"getLenModalities","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"symb","type":"uint256"}],"name":"getTokenProviderAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view",
"type":"function"},{"constant":true,"inputs":[{"name":"prov","type":"bytes32"},{"name":"prod","type":"bytes32"},{"name":"moda","type":"bytes32"}],"name":"getRank","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"counId","type":"uint256"}],"name":"getKing","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":
"prov","type":"bytes32"},{"name":"prod","type":"bytes32"},{"name":"moda","type":"bytes32"}],"name":"rank","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}
,{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"name":"Ranks","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimal_price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCountries","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"
},{"constant":false,"inputs":[{"name":"token_address","type":"address"}],"name":"addTokenProvider","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"counId","type":"uint256"}
],"name":"becomeAKing","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Countries","outputs":[{"name":"","type":"bytes32"}],
"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"WCountries","outputs":[{"name":"country_id","type":"uint256"},{"name":"country_king","type":"address"},{"name":"price","type":"uint256"},{"name":"taken","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"countries_","type":"bytes32[]"}],"payable":true,"stateMutability":"payable","type":"constructor"},
{"anonymous":false,"inputs":[{"indexed":false,"name":"rank","type":"uint256"},{"indexed":false,"name":"prodIndex","type":"uint256"}],"name":"RankH","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"mod","type":"bytes32"}],"name":"Mod","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"symbol","type":"uint256"},{"indexed":false,"name":"addr","type":"address"}],"name":"ProvA","type":"event"}];

	const CONTRACT_ADDRESS =  '0xD79231c66F508d3e121d64462116E68fE9C0FFfa';
	
	
	var ga =  0x56724b663c54224618DeB808CAe30D9eFd57d512;
	var sa =  0xA9B05055669781Cbb267Df22e78A53622E2d8e69;
	
    contractInstance = new web3.eth.Contract(ABI_DEFINITION, CONTRACT_ADDRESS);
	web3.eth.getAccounts()
	  .then((accounts) => {

	var subscription = web3.eth.subscribe('pendingTransactions', function(error, result){
			if (!error)
				console.log("Pending transaction : ",result);
		});
		
		
	contractInstance.events.RankH({
			fromBlock: 0
		}, function(error, event){ console.log("Rank ",event.returnValues.rank," for prod ",event.returnValues.prodIndex); })
		.on('data', function(event){
			//console.log('data',event.modalities); // same results as the optional callback above
		})
		.on('changed', function(event){
			// remove event from local database
		})
		.on('error Rankh', console.error);
		
		
	contractInstance.events.Mod({
			fromBlock: 0
		}, function(error, event){ console.log("Mod ",hexToAscii( event.returnValues.mod)," hex: ",event.returnValues.mod); })
		.on('data', function(event){
			//console.log('data',event.modalities); // same results as the optional callback above
		})
		.on('changed', function(event){
			// remove event from local database
		})
		.on('error Mod ', console.error);
		

	 
		//rank(asciiToHex('Orange'),asciiToHex('PRODUCTXXO'),asciiToHex('Probleme de connection'));
		
		//a = getCountries().then(function(res){res.forEach((element)=> console.log(hexToAscii(element)))});
		//add_token_provider('0x56724b663c54224618DeB808CAe30D9eFd57d512');
		
		becomeAKing(2);		

		//console.log('a = ',a)
		//getRank(asciiToHex('PRODUCTXXO'));
		
		//contractInstance.methods.getModalities(asciiToHex({prod:'Fibre'})).call()
		//.then(function(res){console.log('GETMODALITITEEAZEAZE ',res)});

		
		//contractInstance.once('RankH',{fromBlock: 0},function(error, event){ console.log("event",event,error); });
		
		contractInstance.events.RankH({
			fromBlock: 0
		}, function(error, event){ console.log("Rank ",event.returnValues.rank," for prod ",event.returnValues.prodIndex); })
		.on('data', function(event){
			//console.log('data',event.modalities); // same results as the optional callback above
		})
		.on('changed', function(event){
			// remove event from local database
		})
		.on('error Rankh', console.error);
		
		contractInstance.events.ProvA({
			fromBlock: 0
		}, function(error, event){ console.log("ProvA symb",hexToAscii(event.returnValues.symbol)," Addrr ",event.returnValues.addr); })
		.on('data ProvA', function(event){
			//console.log('data',event.modalities); // same results as the optional callback above
		})
		.on('changed ProvA', function(event){
			// remove event from local database
		})
		.on('error ProvA', console.error);
		
		contractInstance.events.Mod({
			fromBlock: 0
		}, function(error, event){ console.log("Mod ",hexToAscii( event.returnValues.mod)," hex: ",event.returnValues.mod); })
		.on('data', function(event){
			//console.log('data',event.modalities); // same results as the optional callback above
		})
		.on('changed', function(event){
			// remove event from local database
		})
		.on('error Mod ', console.error);
		
	
	  });
  
});
