
// populating local Data
/*  */

$(document).ready(function() { 
//console.log('conf ', conf);
var map;
data_ = {};
var globalcont = 0;
const countries_t = ["AFG","AGO","ALB","ARE","ARG","ARM","ATA","ATF","AUS","AUT","AZE","BDI","BEL","BEN","BFA","BGD","BGR","BHS","BIH","BLR","BLZ","BOL","BRA","BRN","BTN","BWA","CAF","CAN","CHE","CHL","CHN","CIV","CMR","COD","COG","COL","CRI","CUB","-99","CYP","CZE","DEU","DJI","DNK","DOM","DZA","ECU","EGY","ERI","ESP","EST","ETH","FIN","FJI","FLK","FRA","GUF","GAB","GBR","GEO","GHA","GIN","GMB","GNB","GNQ","GRC","GRL","GTM","GUY","HND","HRV","HTI","HUN","IDN","IND","IRL","IRN","IRQ","ISL","ISR","ITA","JAM","JOR","JPN","KAZ","KEN","KGZ","KHM","KOR","-99","KWT","LAO","LBN","LBR","LBY","LKA","LSO","LTU","LUX","LVA","MAR","MDA","MDG","MEX","MKD","MLI","MMR","MNE","MNG","MOZ","MRT","MWI","MYS","NAM","NCL","NER","NGA","NIC","NLD","NOR","NPL","NZL","OMN","PAK","PAN","PER","PHL","PNG","POL","PRI","PRK","PRT","PRY","QAT","ROU","RUS","RWA","ESH","SAU","SDN","SSD","SEN","SLB","SLE","SLV","-99","SOM","SRB","SUR","SVK","SVN","SWE","SWZ","SYR","TCD","TGO","THA","TJK","TKM","TLS","TTO","TUN","TUR","TWN","TZA","UGA","UKR","URY","USA","UZB","VEN","VNM","VUT","PSE","YEM","ZAF","ZMB","ZWE"]
var countries = Datamap.prototype.worldTopo.objects.world.geometries;
console.log('countries ==> ',countries);

async function asyncForEach(array, callback) {
	console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  for (let index = 0; index < array.length; index++) {
    await callback(array[index])
		console.log('---------------------------------------------------------------------~~~~')

  }
}


var extractor = async (element)=>{
	 
		 await contractInstance.methods.getCountryInfo(Web3.utils.asciiToHex(element)).call({gas:2000000},function(err,res){
			 		 	if(!err){
							id = res[0];
							king = res[1];
							price = res[2];
							taken = res[3];
							var tkn = ""
							if (taken == true )
								tkn = 'taken'
							 
						 
						  data_[element]={
							 'fillKey':tkn,//taken.toString(),
							 'king':king,
							 'price':price,
							 'soldiers':0}	 
		 }});

		 globalcont++;
			 
			 
 };
 
const start = async () => {
 await asyncForEach(countries_t, extractor );
 
}


// using start to force waiting for async web3 calls before coloring the map
start().then(()=> {
 console.log('data ', globalcont);

	 map = new Datamap({element: document.getElementById('worldMap'),
								responsive:true, 
								 fills: {
									 defaultFill:'#2ca1df', 
									 taken: '#FF0000'
								 },
								 data: data_ ,
								 popupOnHover: true,
								 geographyConfig: {
										popupTemplate: function(geo, data) {
											return ['<div class="hoverinfo"><strong>',
													'Country ' + geo.properties.name+ '</div>'].join(''); // should return the owner
										}
									}
								 });
								 
	//map.updateChoropleth(data_[2]);

								 
	console.log('constructedMAp ',map);
								 
	// define onclick for the map
	map.svg.selectAll('.datamaps-subunit').on('click', function(data) {
	contractInstance.methods.getCountryInfo(Web3.utils.asciiToHex(data.id.toString())).call({gas:2000000},function(err,res){
		if(!err){
		id = res[0];
		king = res[1];
		price = res[2];
		taken = res[3];
		console.log('debug ',globalcont)
		
		if (taken){
					$('#countryid').val(Web3.utils.toUtf8(id));
					$('#countryking').val(king);
					$('#countryprice').val(price);
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
					
        });// end Onclick
		
		});
				
		
		
		

 $(window).on('resize', function() {
       map.resize();
    });
	
console.log('mapdd ', countries);


});


