(function() {

  window.onload = function() {

  var fluIcons = []; // marker table 
  fluIcons['0'] = new google.maps.MarkerImage( // common marker initialization
    'images/test1.png', 
    new google.maps.Size(48, 48), 
    null, 
    new google.maps.Point(24, 24)
  );
  
  fluIcons['1'] = new google.maps.MarkerImage( // aggravation markers initialization
    'images/test3.png', 
    new google.maps.Size(48, 48), 
    null, 
    new google.maps.Point(24, 24)
  );
	
    // Creating the map
    var options = {
		zoom: 4, // starting zoom level
		center: new google.maps.LatLng(34.62833, -90.30474), // define the starting center of the map
		mapTypeId: google.maps.MapTypeId.SATELITE, // choose between SATELLITE or ROADMAP
		streetViewControl: false, // street view icon
		//scrollwheel: false,
	    navigationControl: true, // zoom in - out buttons
		panControl: true, // round navigation icon top left
		mapTypeControl: true// satelite | roadmap etc buttons
    };
    var map = new google.maps.Map(document.getElementById('map'), options);
	
/*
	var style = [ {
		featureType: 'all',
		elementType: 'all',
    } ];
*/

		var style = [ 
			{
				featureType: 'all',
				elementType: 'all',
				stylers: [ // styling the map
					{ saturation: -100 },
					{ lightness: 0 },
					{ gamma: 0.90 }
				]
			},
			{  
				featureType: 'water',  
				elementType: 'geometry.fill',  
				stylers: [  
					{ color: '#383838' }  
				]  
			},
			{  
				featureType: 'water',  
				elementType: 'labels.text',  
				stylers: [  
					{ color: '#ffffff' }  
				]  
			},
			{
				featureType: 'water',  
				elementType: 'labels.text.fill',  
				stylers: [  
					{ color: '#383838' }  
				]  
			}	  				
			
		];

	
    var styledMapType = new google.maps.StyledMapType(style, { // style a unique google map. adding parameters.
			map: map,
			name: 'Styled Map'	
    });	
	
	map.mapTypes.set('map-style', styledMapType);
    map.setMapTypeId('map-style');
	var infowindow = new google.maps.InfoWindow(); // creating infowindow
    
/*
    google.maps.event.addListenerOnce(map, 'bounds_changed', function() {
		var markers = []; // array used to cluster the markers
		var output  = ''; // placeholder for marker output
		
		//var bounds = map.getBounds();
		$.getJSON('results.json', function(data) { // open json file
			for (var i in data) { // for loop to parse json's content
				var current = parseInt(data[i].aggravation);
				output += "<li>" + data[i].user_name + " " + data[i].tweet_text + "GEOCODE:" + data[i].latitude   +","+data[i].longitude +"</li>";						
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(parseFloat(data[i].latitude), parseFloat(data[i].longitude)), // parsing coordinates
					map: map,
					icon: fluIcons[current]
					//icon: img, // custom marker for common 'flu' tweets.
					//animation: google.maps.Animation.DROP // drop new icons after refresh.
				});			
		
				google.maps.event.addListener(marker, 'click', (function(marker, i) { // click on marker to display info.
					return function() {
						infowindow.setContent(data[i].user_name + data[i].tweet_text); // infowindow displayed content.
						infowindow.open(map, marker);
					}
				})(marker, i));	// parameters
			}
		});
				      
    });
    
*/
    
	google.maps.event.addListenerOnce(map, 'bounds_changed', function() {
		var markers = []; // array used to cluster the markers
		//var bounds = map.getBounds();
		$.getJSON('results.json', function(data) {
			for (var i in data) {
				var current = parseInt(data[i].aggravation);
				if (current<1) {  // if statement in order not to display aggravated tweets.
					//output+="<li>" + data[i].user_name + " " + data[i].tweet_text + "GEOCODE:" + data[i].latitude   +","+data[i].longitude +"</li>";						
					marker = new google.maps.Marker({
						position: new google.maps.LatLng(parseFloat(data[i].latitude), parseFloat(data[i].longitude)),
						map: map,
						icon: fluIcons[current]
						//icon: img, // custom marker for common 'flu' tweets.
						//animation: google.maps.Animation.DROP // drop new icons after refresh.
					});			
					google.maps.event.addListener(marker, 'click', (function(marker, i) {
						return function() {
							infowindow.setContent('<div class="infowindow">'+data[i].tweet_text+'</div>');
							infowindow.open(map, marker);
							  //map.setZoom(6);
							  map.setCenter(marker.getPosition());
						}
					})(marker, i));	
				}
			}
		});			
	});		       

    
    
  };
         	
})();

