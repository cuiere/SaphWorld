
// Global vars
const ABI_DEFINITION= [{"constant":true,"inputs":[{"name":"prod","type":"bytes32"}],"name":"getModalities","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"coinContractAddress","type":"address"},{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"prod","type":"bytes32"}],"name":"getLenModalities","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"symb","type":"uint256"}],"name":"getTokenProviderAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"prov","type":"bytes32"},{"name":"prod","type":"bytes32"},{"name":"moda","type":"bytes32"}],"name":"getRank","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"prov","type":"bytes32"},{"name":"prod","type":"bytes32"},{"name":"moda","type":"bytes32"}],"name":"rank","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"name":"Ranks","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"counId","type":"bytes32"}],"name":"becomeAKing","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"countryID","type":"bytes32"}],"name":"getCountryInfo","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimal_price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCountries","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token_address","type":"address"}],"name":"addTokenProvider","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Countries","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"counId","type":"bytes32"}],"name":"getKing","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"WCountries","outputs":[{"name":"country_id","type":"bytes32"},{"name":"country_king","type":"address"},{"name":"price","type":"uint256"},{"name":"taken","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"countries_","type":"bytes32[]"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rank","type":"uint256"},{"indexed":false,"name":"prodIndex","type":"uint256"}],"name":"RankH","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"mod","type":"bytes32"}],"name":"Mod","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"symbol","type":"uint256"},{"indexed":false,"name":"addr","type":"address"}],"name":"ProvA","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"r","type":"bytes32"},{"indexed":false,"name":"g","type":"uint256"}],"name":"RankG","type":"event"}];
const CONTRACT_ADDRESS = '0xc30B395BCE247c0bE15FD89395d70945Ca4F134f' //'0x9970c4243C8103bE98F7a89F7ece581867307610'//'0xc30B395BCE247c0bE15FD89395d70945Ca4F134f'; // <-- kinkeby ""; //'0x3EB376CD63074b21BeF7eB78C67FCB4A05967ad5';
const countries_t = ["AFG","AGO","ALB","ARE","ARG","ARM","ATA","ATF","AUS","AUT","AZE","BDI","BEL","BEN","BFA","BGD","BGR","BHS","BIH","BLR","BLZ","BOL","BRA","BRN","BTN","BWA","CAF","CAN","CHE","CHL","CHN","CIV","CMR","COD","COG","COL","CRI","CUB","-99","CYP","CZE","DEU","DJI","DNK","DOM","DZA","ECU","EGY","ERI","ESP","EST","ETH","FIN","FJI","FLK","FRA","GUF","GAB","GBR","GEO","GHA","GIN","GMB","GNB","GNQ","GRC","GRL","GTM","GUY","HND","HRV","HTI","HUN","IDN","IND","IRL","IRN","IRQ","ISL","ISR","ITA","JAM","JOR","JPN","KAZ","KEN","KGZ","KHM","KOR","-99","KWT","LAO","LBN","LBR","LBY","LKA","LSO","LTU","LUX","LVA","MAR","MDA","MDG","MEX","MKD","MLI","MMR","MNE","MNG","MOZ","MRT","MWI","MYS","NAM","NCL","NER","NGA","NIC","NLD","NOR","NPL","NZL","OMN","PAK","PAN","PER","PHL","PNG","POL","PRI","PRK","PRT","PRY","QAT","ROU","RUS","RWA","ESH","SAU","SDN","SSD","SEN","SLB","SLE","SLV","-99","SOM","SRB","SUR","SVK","SVN","SWE","SWZ","SYR","TCD","TGO","THA","TJK","TKM","TLS","TTO","TUN","TUR","TWN","TZA","UGA","UKR","URY","USA","UZB","VEN","VNM","VUT","PSE","YEM","ZAF","ZMB","ZWE"]

var ga =  0x56724b663c54224618DeB808CAe30D9eFd57d512;
var sa =  0xA9B05055669781Cbb267Df22e78A53622E2d8e69;
var data_ = {};
var global_kings = {};
var map;
var kings_chart;


var zabab = {}; // for kings color

contractInstance = null;

// get Web 3 or return false
function getWeb3() {
	var web3 ;
  if (typeof window.web3 === 'undefined' | window.web3 == null) {
    // no web3, use fallback
    console.error("Please use a web3 browser");
	  return null;
  } else {
    // window.web3 == web3 most of the time. Don't override the provided,
    // web3, just wrap it in your Web3.
    var web3 = new Web3(window.web3.currentProvider); 

    // the default account doesn't seem to be persisted, copy it to our
    // new instance
    web3.eth.defaultAccount = window.web3.eth.defaultAccount;

    return web3;
  }
}



// WEB3 returns countries as array
function getCountries(){
	
	res = web3.eth.getAccounts()
  .then((accounts) => {
     return contractInstance.methods.getCountries().call({gas:2000000});
  });
  
  return res;
}


// enable disable blocks (service, works, about...)
function _blocks_status(status_){
	
				document.getElementById("services-section").style.display = status_;
				document.getElementById("works-section").style.display = status_;
				document.getElementById("about-section").style.display = status_;
				document.getElementById("team-section").style.display = status_;
				document.getElementById("social-section").style.display = status_;
				document.getElementById("achievements").style.display = status_;
				
}


// WEB3 returns info about the country
function getCountryInfo(cid){
       return contractInstance.methods.getCountryInfo(cid).call({gas:2000000});	 
}



async function becomeAKing(count_id, value_){
		console.log('contractInstance.methods BK ', web3.eth.getAccounts(function(err,res){console.log('res err',res,err)}));
		await web3.eth.getAccounts(async function(err,accounts){
		  await contractInstance.methods.becomeAKing(count_id)
			 .send({from: accounts[0], value:value_},function(res,err){console.log(' ADDRR ',accounts[0],' RES ',res,' err ',err);$('#emptymodal').modal('hide');})
			 .then(() => {
					contractInstance.methods.getKing(count_id)
					.call({from: accounts[0],gas:20000000},function(error,result){ console.log('Le king est ', result,error); update_king(accounts[0], Web3.utils.toUtf8(count_id));})
					});
		});
	  
	console.log('after   !! ')
	}
	
function getActifPlayer(){
	web3.eth.getAccounts(async function(err,accounts){
		if (accounts[0] != undefined)
			document.getElementById("player_name").innerHTML = "Hello King "+accounts[0]
		else
			document.getElementById("player_name").innerHTML = "Metamask locked"
	});
	}
	

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function update (k){
	map.updateChoropleth(k);
	}
	  
	  
function update_king(idk,idc,price_){
	var tmp_r ={};
	if (zabab[idk] != undefined){
		console.log('awel mara	') 
		zabab[idk].countries.push({country:idc , price: price_})
		tmp_r[idc] = zabab[idk].color
		
		}
	else{
		zabab[idk] = {};
		zabab[idk].color = getRandomColor();
		zabab[idk].countries =[]
		zabab[idk].countries.push({country:idc , price: price_})
		tmp_r[idc] = zabab[idk].color;
		console.log('la couleur de ',idk,' est ',tmp_r[idc])
		}
		
	update(tmp_r)
	
}

async function populate_map(countries_t){
	
	 for (var cc=0; cc< countries_t.length; cc ++){
	 
	 
	 // async tnéket omha 
		   contractInstance.methods.getCountryInfo(Web3.utils.asciiToHex(countries_t[cc])).call({gas:2000000},function(err,res){
			 console.log('calling node for countryinformation');
			 tmp_r = {};
			 		 	if(!err && res[3]){
							id = res[0];
							king = res[1];
							price = res[2];
							taken = res[3];
							id_country = Web3.utils.toUtf8(id);
							update_king(king, id_country,  Web3.utils.fromWei(price) );
							// filling kings
							update_kings_chart(king, Web3.utils.fromWei(price) )

								console.log('kings[king] ',king ,id);
		                } // End if !err && res[3] ! taken
		 });

			 
			 
	}; // End foreach	

	
	
	
}	


function getSum(total, num) {
    return total + num;
}


function addListeners(){
	
	document.getElementById('becomeaking').addEventListener('click', async function() {
				console.log('you want to be a king of ',Web3.utils.asciiToHex($('#emptycountryid').val()));
				console.log('the price is ',$('#emptycountryprice').val());
				await becomeAKing(Web3.utils.asciiToHex($('#emptycountryid').val()),Web3.utils.toWei($('#emptycountryprice').val())); !!!!!!!!!!!!!!!!!!!!!!!!!!!
				console.log('finish awaiting for become a king ... this will hide the modal')
				
				
			}, false)


	document.getElementById('start_the_game').addEventListener('click', async function() {
		web3 = getWeb3();
		if (web3 != null){
			document.getElementById("worldMap").style.display = 'block';
			document.getElementById("statistics").style.display = 'block';
			
			Launch ();
			getActifPlayer();
			}
		else{
				$('#errorModal').modal('show');
			}
	}, false);


	/* document.getElementById('africa').addEventListener('click', async function() {
			$('#worldMap').empty();
			update_map(africa, {});
			}, false)
			
	document.getElementById('europe').addEventListener('click', async function() {
			$('#worldMap').empty();
			update_map(europe, {});
			}, false)
 */
			
			}
	
	
function pop_up(data) {
	contractInstance.methods.getCountryInfo(Web3.utils.asciiToHex(data.id.toString())).call({gas:2000000},function(err,res){
		if(!err){
			id = res[0];
			king = res[1];
			price = res[2];
			taken = res[3];
			
			if (taken){
						$('#countryid').val(Web3.utils.toUtf8(id));
						$('#countryking').val(king);
						$('#countryprice').val(Web3.utils.fromWei(price));
						$('#countrysoldiers').val(taken);
						$('#takenmodal').modal('show');
						}
			else {
				$('#emptycountryid').val(data.id);
				$('#emptycountryking').val("N/A Not yet Conquested");
				$('#emptycountryprice').val(1);
				$('#emptycountrysoldiers').val(0);
				$('#emptymodal').modal('show');
			}
		}
	});	
					
 }

 
function update_kings_chart(king_id, price){
	 if(!kings_chart.data.labels.includes(king_id)){
		 kings_chart.data.labels.push(king_id)
		 kings_chart.data.datasets[0].backgroundColor.push(zabab[king_id].color)
		 kings_chart.data.datasets[0].data[kings_chart.data.labels.indexOf(king_id)] = 0;
		 console.log('################## Zok update ',kings_chart.data.datasets[0])
		 
	 }
	 var tmp = kings_chart.data.datasets[0].data[kings_chart.data.labels.indexOf(king_id)];
	 
	 kings_chart.data.datasets[0].data[kings_chart.data.labels.indexOf(king_id)] = parseFloat(tmp) + parseFloat(price);
	 kings_chart.update();
} 
 

 
	
function Launch(){


	  init_contract();
	  $('#worldMap').empty();
	  // Map declaration 
	  map = new Datamap({
		  element: document.getElementById('worldMap'),
		  done: function(datamap) {
           datamap.svg.call(d3.behavior.zoom().on("zoom", redraw));
		   datamap.svg.selectAll('.datamaps-subunit').on('click', pop_up );// end Onclick
		   populate_map(countries_t);
           function redraw() {
                datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
				}
			}
		});
	  
		var ctx = document.getElementById('kings_chart').getContext('2d');
	    kings_chart = new Chart(ctx, {
	  type: 'pie',
	  data: {
		labels: [] ,
		datasets: [{data:[],backgroundColor:[],}],
		options: {
            responsive: true
        }
	  }
	});
	
	$(window).on('resize', function() {
       map.resize();
    });
	  
	}// fin launch	
	


function init_contract(){
	contractInstance = new web3.eth.Contract(ABI_DEFINITION, CONTRACT_ADDRESS);
	
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
		}, function(error, event){ 
          if(error)
					console.log('eRROR =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>RankH ',error);
				else
				console.log("ProvA symb",web3.utils.hexToAscii(event.returnValues.symbol)," Addrr ",event.returnValues.addr); 
		} 
		   )
		.on('data ProvA', function(event){
			//console.log('data',event.modalities); // same results as the optional callback above
		})
		.on('changed ProvA', function(event){
			// remove event from local database
		})
		.on('error ProvA', console.error);
		
		contractInstance.events.Mod({
			fromBlock: 0
		}, function(error, event){ 
		if (!error)
		console.log("Mod ",web3.utils.hexToAscii( event.returnValues.mod)," hex: ",event.returnValues.mod); })
		.on('data', function(event){
			//console.log('data',event.modalities); // same results as the optional callback above
		})
		.on('changed', function(event){
			// remove event from local database
		})
		.on('error Mod ', console.error);

	
}

$(document).ready(function() { 

	addListeners();
								 
	// define onclick for the map
			
	
  
  
	

	});