
// Using the IPC provider in node.js
//var net = require('net');



//web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));
//const web3 = new Web3(new Web3.providers.IpcProvider("\\\\.\\pipe\\geth.ipc")); // WINDOWS path

		//web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));
		



function getWeb3(callback) {
  if (typeof window.web3 === 'undefined') {
    // no web3, use fallback
    console.error("Please use a web3 browser");
  } else {
    // window.web3 == web3 most of the time. Don't override the provided,
    // web3, just wrap it in your Web3.
    var web3 = new Web3(window.web3.currentProvider); 

    // the default account doesn't seem to be persisted, copy it to our
    // new instance
    web3.eth.defaultAccount = window.web3.eth.defaultAccount;

    callback(web3);
  }
}


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


async function becomeAKing(count_id, value_){
	console.log('contractInstance.methods BK ', web3.eth.getAccounts(function(err,res){console.log('res err',res,err)}));
	
  await web3.eth.getAccounts(async function(err,accounts){
      await contractInstance.methods.becomeAKing(count_id)
		 .send({from: accounts[0], gas:200000000, value:value_},function(res,err){console.log(' ADDRR ',accounts[0],' RES ',res,' err ',err);$('#emptymodal').modal('hide');})
		 .then(() => {
				contractInstance.methods.getKing(count_id)
				.call({from: accounts[0],gas:20000000},function(error,result){ console.log('Le king est ', result,error);})
				});
	  });
	  console.log('after   !! ')
}

function getCountryInfo(cid){
       return contractInstance.methods.getCountryInfo(cid).call({gas:2000000});	 
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
		 if (typeof window.web3 === 'undefined') {
    // no web3, use fallback
    console.error("Please use a web3 browser");
	var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://192.168.1.14:8546'));
	console.log('we ll use this web3', web3);
	//$('#emptymodal').modal('show');
  } else {
    // window.web3 == web3 most of the time. Don't override the provided,
    // web3, just wrap it in your Web3.
    var web3 = new Web3(window.web3.currentProvider); 

    // the default account doesn't seem to be persisted, copy it to our
    // new instance
    web3.eth.defaultAccount = window.web3.eth.defaultAccount;
  }
	/* if(typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
        var web3 = new Web3(window.web3.currentProvider);
		console.log('Already injected, using this web3');
		console.log('window.web3.currentProvider :',window.web3.currentProvider)
      } else {
        var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));
		console.log("web3.currentProvider ... injting",web3.currentProvider)
      } */
		//web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

		//var web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546');
			//console.log('window.web3.currentProvider :',window.web3.currentProvider)


	console.log('web3 version => ', web3.version);
	console.log('web 3.eth => ', web3.eth.subscribe);
	const ABI_DEFINITION= [{"constant":true,"inputs":[{"name":"prod","type":"bytes32"}],"name":"getModalities","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"coinContractAddress","type":"address"},{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"prod","type":"bytes32"}],"name":"getLenModalities","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"symb","type":"uint256"}],"name":"getTokenProviderAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"prov","type":"bytes32"},{"name":"prod","type":"bytes32"},{"name":"moda","type":"bytes32"}],"name":"getRank","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"prov","type":"bytes32"},{"name":"prod","type":"bytes32"},{"name":"moda","type":"bytes32"}],"name":"rank","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"name":"Ranks","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"counId","type":"bytes32"}],"name":"becomeAKing","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"countryID","type":"bytes32"}],"name":"getCountryInfo","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimal_price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCountries","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token_address","type":"address"}],"name":"addTokenProvider","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Countries","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"counId","type":"bytes32"}],"name":"getKing","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"WCountries","outputs":[{"name":"country_id","type":"bytes32"},{"name":"country_king","type":"address"},{"name":"price","type":"uint256"},{"name":"taken","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"countries_","type":"bytes32[]"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rank","type":"uint256"},{"indexed":false,"name":"prodIndex","type":"uint256"}],"name":"RankH","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"mod","type":"bytes32"}],"name":"Mod","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"symbol","type":"uint256"},{"indexed":false,"name":"addr","type":"address"}],"name":"ProvA","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"r","type":"bytes32"},{"indexed":false,"name":"g","type":"uint256"}],"name":"RankG","type":"event"}];

		const CONTRACT_ADDRESS = "0x9970c4243C8103bE98F7a89F7ece581867307610"; //'0x3EB376CD63074b21BeF7eB78C67FCB4A05967ad5';

	
	var ga =  0x56724b663c54224618DeB808CAe30D9eFd57d512;
	var sa =  0xA9B05055669781Cbb267Df22e78A53622E2d8e69;
	console.log('json ', JSON)
    contractInstance = new web3.eth.Contract(ABI_DEFINITION, CONTRACT_ADDRESS);
	web3.eth.getAccounts()
	  .then((accounts) => {
		  console.log('ACCOUNTS => ',accounts)

	var subscription = web3.eth.subscribe('pendingTransactions', function(error, result){
			if (!error)
				console.log("Pending transaction : ",result);
		});
		
	var b_a_king = document.getElementById('becomeaking');

			b_a_king.addEventListener('click', async function() {
				console.log('you want to be a king of ',Web3.utils.asciiToHex($('#emptycountryid').val()));
				console.log('the price is ',$('#emptycountryprice').val());
				await becomeAKing(Web3.utils.asciiToHex($('#emptycountryid').val()),$('#emptycountryprice').val());
				console.log('finish awaiting for become a king ... this will hide the modal')
				
				
			}, false);
				//.on('error Mod ', console.error);
		

	 
		//rank(asciiToHex('Orange'),asciiToHex('PRODUCTXXO'),asciiToHex('Probleme de connection'));
		
		console.log('contractInstance.methods ', contractInstance)
		
		//a = getCountries().then(function(res){res.forEach((element)=> console.log((element)))});
		//add_token_provider('0x56724b663c54224618DeB808CAe30D9eFd57d512');
		
		//becomeAKing('0x545552');		
		//becomeAKing(asciiToHex('ALG'));
		web3.eth.getBlock(48, function(error, result){
    if(!error)
        console.log('res',result)
    else
        console.error('err ',error);
})
		
		
		
		
		//becomeAKing('0x545552',6); //TUR
		//getCountryInfo('0x545552');
		//becomeAKing('ITA');

		//console.log('a = ',a)
		//getRank(asciiToHex('PRODUCTXXO'));
		
		//contractInstance.methods.getModalities(asciiToHex({prod:'Fibre'})).call()
		//.then(function(res){console.log('GETMODALITITEEAZEAZE ',res)});

		
		//contractInstance.once('RankH',{fromBlock: 0},function(error, event){ console.log("event",event,error); });
		
		contractInstance.events.RankH({
			fromBlock: 0
		}, function(error, event){
				if(error)
					console.log('eRROR =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>RankH ',error);
				else
				console.log("Rank ",event.returnValues.rank," for prod ",event.returnValues.prodIndex," err",err);
		})
		.on('data', function(event){
			//console.log('data',event.modalities); // same results as the optional callback above
		})
		.on('changed', function(event){
			// remove event from local database
		})
		.on('error Rankh', console.error);
		
		contractInstance.events.ProvA({
			fromBlock: 0
		}, function(error, event){ console.log("ProvA symb",web3.utils.hexToAscii(event.returnValues.symbol)," Addrr ",event.returnValues.addr); })
		.on('data ProvA', function(event){
			//console.log('data',event.modalities); // same results as the optional callback above
		})
		.on('changed ProvA', function(event){
			// remove event from local database
		})
		.on('error ProvA', console.error);
		
		contractInstance.events.Mod({
			fromBlock: 0
		}, function(error, event){ console.log("Mod ",web3.utils.hexToAscii( event.returnValues.mod)," hex: ",event.returnValues.mod); })
		.on('data', function(event){
			//console.log('data',event.modalities); // same results as the optional callback above
		})
		.on('changed', function(event){
			// remove event from local database
		})
		.on('error Mod ', console.error);
		
	
	  });
  
});
