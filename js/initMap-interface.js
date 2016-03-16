var apiKey = require('./../.env').apiKey;

  exports.initMap = function(position) {
   var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   var myOptions = {
      center: userLatLng,
      zoom: 8,
      mapTypeId : google.maps.MapTypeId.SATELLITE
      };

  var mapObject = new google.maps.Map(document.getElementById('showMap'), myOptions);

    new google.maps.Marker({
      map: mapObject,
      position: userLatLng,
      title: input
    });

    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + input + '&appid=' + apiKey).then(function(response) {
      // var temps = convertTemperature(response.main.temp);
      console.log(response.main.temp);

        $('.showWeather').html("<h2>The temperature in " + input + " is " + response.main.temp + "</br>" + "Current weather condition is " + response.weather[0].description + "</h2>");
    }).fail(function(error) {
      $('.showWeather').text(error.message); //error handling; .fail() method is called when promise enters rejected state
    });

    // Create the search box and link it to the UI element.
          var input = document.getElementById('pac-input');
          var searchBox = new google.maps.places.SearchBox(input);
          mapObject.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

          // Bias the SearchBox results towards current map's viewport.
          mapObject.addListener('bounds_changed', function() {
            searchBox.setBounds(mapObject.getBounds());
          });

          var markers = [];
          // Listen for the event fired when the user selects a prediction and retrieve
          // more details for that place.
          searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();
            console.log(places[0].address_components[0].long_name);
            if (places.length == 0) {
              return;
            }

            // Clear out the old markers.
            markers.forEach(function(marker) {
              marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
              var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };

              // Create a marker for each place.
              markers.push(new google.maps.Marker({
                map: mapObject,
                icon: icon,
                title: place.name,
                position: place.geometry.location
              }));

              if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            mapObject.fitBounds(bounds);
          });
          return initMap;
  };
