module.exports = { conf :{
    scope: 'world', // Currently supports 'usa' and 'world', however with custom map data you can specify your own
    setProjection: setProjection, // Returns a d3 path and projection functions
    projection: 'equirectangular', // Style of projection to be used. try "mercator"
    height: null, // If not null, datamaps will grab the height of 'element'
    width: null, // If not null, datamaps will grab the width of 'element',
    responsive: false, // If true, call `resize()` on the map object when it should adjust it's size
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
          //return '&lt;div class="hoverinfo"&gt;&lt;strong&gt;' + geography.properties.name + '&lt;/strong&gt;&lt;/div&gt;';
		  return 'geography.properties.name '+geography.properties.name;
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
          //return '<div class="hoverinfo"><strong>' + data.name + '</strong></div>';
		  return data.name;
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
          //return '<div class="hoverinfo"><strong>Arc</strong><br>Origin: ' + JSON.stringify(data.origin) + '<br>Destination: ' + JSON.stringify(data.destination) + '</div>';
		    return 'Country : '+data.origin;
		}
        // Case with only country name
        else if ( data.origin && data.destination ) {
          //return '<div class="hoverinfo"><strong>Arc</strong><br>' + data.origin + ' -> ' + data.destination + '</div>';
		  return 'Country : '+data.origin;
        }
        // Missing information
        else {
          return '';
        }
      }
    }
  } 
  };