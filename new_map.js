(function() {

	

	window.onload = function() {
    
		alert "here";
		
		//var img = 'images/test1.png'; // icon marker image
		//var imgAggravation = 'images/test2.png';
		// Creating an array that will contain all of our weather icons
		var fluIcons = [];
		fluIcons['0'] = new google.maps.MarkerImage(
			'images/test1.png', 
			new google.maps.Size(48, 48), 
			null, 
			new google.maps.Point(24, 24)
		);
		
		fluIcons['1'] = new google.maps.MarkerImage(
			'images/test3.png', 
			new google.maps.Size(48, 48), 
			null, 
			new google.maps.Point(24, 24)
		);
		
		//Check if browser supports W3C Geolocation API
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(successFunction);
		} 
		function successFunction(position) { // ask user to provide ip geolocation.
			var latc = position.coords.latitude;
			var longc = position.coords.longitude;
			var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(new google.maps.LatLng(latc, longc));
			function errorFunction(position) {
				alert('Error, please refresh or use a different web browser.');
			}
		};
			// Creating a map
			var options = {
				zoom: 4, // starting zoom level
				center: new google.maps.LatLng(34.62833, -90.30474),
				mapTypeId: google.maps.MapTypeId.SATELLITE, // choose between SATELLITE or ROADMAP
				streetViewControl: false, // street view icon
				scrollwheel: false,
				navigationControl: true, // zoom in - out buttons
				panControl: false, // round navigation icon top left
				mapTypeControl: false, // satelite | roadmap etc buttons
				scaleControl: true,
				zoomControl: true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.LEFT_CENTER
				}
			};
			var map = new google.maps.Map(document.getElementById('map'), options);
	
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
	
			var styledMapType = new google.maps.StyledMapType(style, {
				map: map,
				name: 'Styled Map'	
			});	
	
			map.mapTypes.set('map-style', styledMapType);
			map.setMapTypeId('map-style');
			var infowindow = new google.maps.InfoWindow();
    
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
									infowindow.setContent(data[i].tweet_text);
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
