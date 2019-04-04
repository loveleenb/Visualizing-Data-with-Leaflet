//setting a map location and zoom level
var map = L.map("map", {
  center: [37.79, -122.42],
  zoom: 5
});
  
// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(map);


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(url, function(data){

  var feature = data.features;

  console.log(feature);

  feature.forEach(function(d){
    var magnitude = d.properties.mag;
    var longitude = d.geometry.coordinates[0];
    var lattitude = d.geometry.coordinates[1];

    //console.log(magnitude);
    var fillcolor = "greenyellow";

    if (magnitude > 1) {
      fillcolor = "Yellow";
    };

    if (magnitude > 2) {
      fillcolor = "Gold";
    };

    if (magnitude > 3) {
      fillcolor = "Coral";
    };

    if (magnitude > 4) {
      fillcolor = "orange";
    };

    if (magnitude > 5) {
      fillcolor = "Red";
    };

    L.circle([lattitude, longitude], {
      color: "Blue",
      fillColor: fillcolor,
      fillOpacity: 0.75,
      weight: 1,
      radius: magnitude*20000 // multiplying by a bigger value to ensure different circle size
    }).bindPopup("<h3> Place: " + d.properties.place +
      "</h3><hr><p> Magnitude: " + magnitude + "</p>").addTo(map);

  });
});
  //setting the ledgend 

  var legend = L.control({position: 'bottomleft'});

  legend.onAdd = function (map) {
  //set various colors
      var div = L.DomUtil.create('div', 'legend'),
          grades = [0, 1, 2, 3, 4, 5],
          c_palette = ["greenyellow", "Yellow", "Gold", "Coral", "orange", "Red"],
          labels = [];
  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML += '<i style="background:' + c_palette[i] + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' 
                         + grades[i + 1] + '<br>' : '+');
        }
        return div;


  };
  
  legend.addTo(map);












