


const conf ={
    scope: 'world', // Currently supports 'usa' and 'world', however with custom map data you can specify your own
	element: document.getElementById('worldMap'), // element in which the wap will be appen
    //setProjection: setProjection, // Returns a d3 path and projection functions
    projection: 'equirectangular', // Style of projection to be used. try "mercator"
    height: null, // If not null, datamaps will grab the height of 'element'
    width: null, // If not null, datamaps will grab the width of 'element',
    responsive: true, // If true, call `resize()` on the map object when it should adjust it's size
    done: function() {}, // Callback when the map is done drawing
    fills: {
      defaultFill: '#ABDDA4' // The keys in this object map to the "fillKey" of [data] or [bubbles]
    },
    dataType: 'json', // For use with dataUrl, currently 'json' or 'csv'. CSV should have an `id` column
    dataUrl: null, // If not null, datamaps will attempt to fetch this based on dataType ( default: json )
    geographyConfig: {
        dataUrl: null, // If not null, datamaps will fetch the map JSON (currently only supports topojson)
        hideAntarctica: true,
        hideHawaiiAndAlaska : false,
        borderWidth: 1,
        borderOpacity: 1,
        borderColor: '#FDFDFD',
        popupTemplate: function(geography, data) { // This function should just return a string
          return '&lt;div class="hoverinfo"&gt;&lt;strong&gt;' + geography.properties.name + '&lt;/strong&gt;&lt;/div&gt;';
        },
        popupOnHover: true, // True to show the popup while hovering
        highlightOnHover: true,
        highlightFillColor: '#FC8D59',
        highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
        highlightBorderWidth: 2,
        highlightBorderOpacity: 1
    },
    bubblesConfig: {
        borderWidth: 2,
        borderOpacity: 1,
        borderColor: '#FFFFFF',
        popupOnHover: true, // True to show the popup while hovering
        radius: null,
        popupTemplate: function(geography, data) { // This function should just return a string
          return '<div class="hoverinfo"><strong>' + data.name + '</strong></div>';
        },
        fillOpacity: 0.75,
        animate: true,
        highlightOnHover: true,
        highlightFillColor: '#FC8D59',
        highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
        highlightBorderWidth: 2,
        highlightBorderOpacity: 1,
        highlightFillOpacity: 0.85,
        exitDelay: 100, // Milliseconds
        key: JSON.stringify
    },
    arcConfig: {
      strokeColor: '#DD1C77',
      strokeWidth: 1,
      arcSharpness: 1,
      animationSpeed: 600, // Milliseconds
      popupOnHover: false, // True to show the popup while hovering
      popupTemplate: function(geography, data) { // This function should just return a string
        // Case with latitude and longitude
        if ( ( data.origin && data.destination ) && data.origin.latitude && data.origin.longitude && data.destination.latitude && data.destination.longitude ) {
          return '<div class="hoverinfo"><strong>Arc</strong><br>Origin: ' + JSON.stringify(data.origin) + '<br>Destination: ' + JSON.stringify(data.destination) + '</div>';
        }
        // Case with only country name
        else if ( data.origin && data.destination ) {
          return '<div class="hoverinfo"><strong>Arc</strong><br>' + data.origin + ' -> ' + data.destination + '</div>';
        }
        // Missing information
        else {
          return '';
        }
      }
    }
  };

data_ = {
    JPN: { 
        "fillKey": "taken",
		"king":"0x123123123"
    },
	FRA:{
		"fillKey": "taken",
		"king":"0x123123123"
	},
	TUN:{
		"fillKey": "taken",
		"king":"0x123123123"
	},
	USA:{
		"fillKey": "taken",
		"king":"0x123123123"
	},
	BRA:{
		"fillKey": "taken",
		"king":"0x123123123"
	},
	GAB:{
		"fillKey": "taken",
		"king":"0x123123123"
	},
	IND:{
		"fillKey": "taken",
		"king":"0x123123123"
	}
}
$(document).ready(function() { 
//console.log('conf ', conf);

var countries = Datamap.prototype.worldTopo.objects.world;
/* for (var i = 0, j = countries.length; i < j; i++) {
  console.log("ccv ",countries[i].properties);
} */



var map = new Datamap({element: document.getElementById('worldMap'),
								responsive:true, 
								 fills: {defaultFill:"#2ca1df", taken: '#80d726'},
								 data: data_ ,
								 popupOnHover: true,
								 geographyConfig: {
										popupTemplate: function(geo, data) {
											return ['<div class="hoverinfo"><strong>',
													'Country ' + geo.properties.name,
													': ' + data.fillKey,
													'</strong><strong>',
													'King ' + geo.properties.name,
													': ' + data.fillKey,
													'</strong><strong>',
													'Soldiers ' + geo.properties.name,
													': ' + data.fillKey,
													'</strong></div>'].join(''); // should return the owner
										}
									}
								 });
								 
	map.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
		
		console.log('geography.properties ',data_[geography.id]);
		            $('#countryid').val(geography.id);
					$('#countryking').val(data_[geography.id].king);
		
					$('#mymodal').modal('show');
        });
		
		
				
		
		
		

 $(window).on('resize', function() {
       map.resize();
    });
	
console.log('mapdd ', countries);


});


