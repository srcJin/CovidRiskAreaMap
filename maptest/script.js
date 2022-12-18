// latlng is represente of an array
// index 0 is the latitude
// index 1 is the longitude
let china = [35.00, 107.00];

// L is provided by leaflet.js
// L is the leaflet object and it allows
// us to features from Leaflet
// the first parameter to the map function
// is the ID Of the <div> that will hold it
const map = L.map('map');
map.setView(china, 5);

// the tile layer basically represents
// the map that you can see
// when we set up the tile layer we're requesting
// a visual style of the map
const tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
});

// reminder: univerisal thing with leaflet.
// after you created a Layer, you must add to it the map to display it
tileLayer.addTo(map);   // alternatively: map.add(tileLayer);

result = loadData();

console.log("lalalalalala")

async function loadData() {
  const response = axios.get('cycling-path.geojson');
  const cyclingResult = await response
  // the following lines are only executed after axios.get has finished, because we use await
  const cyclingLayer = L.geoJson(cyclingResult.data, {
    onEachFeature: function(feature, layer) {
      // layer.bindPopup(feature.properties.Description);
      const html = feature.properties.Description;
      const element = document.createElement('div');
      element.innerHTML = html;

      // when we set the innerHTML of an element, the browser will create those elements inside the said element
      const tds = element.querySelectorAll('td');
      const town = tds[0].innerHTML;
      const agency = tds[1].innerHTML;

      layer.bindPopup(`<h1>${town}</h1>
          <h2>${agency}</h2>
        `)

    } // end onEachFeature 
  }); // end L.geoJson

  cyclingLayer.addTo(map);
  cyclingLayer.setStyle({
    color: 'green'
  });

  const nparksResponse = axios.get("nparks.geojson");
  const nparksResult = await nparksResponse
  const parkLayer = L.geoJson(nparksResult.data, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.Description);
    }
  })

  parkLayer.addTo(map);
  parkLayer.setStyle({
    color: 'pink'
  })

  const baseLayers = {};

  const overlays = {
    "Cycling": cyclingLayer,
    "Park": parkLayer
  }

  // create a layer control (allows the user to toggle between layers)
  // L.control.layers() has two parameters
  // parameter 1 - the base layers (only one can be active)
  // parameter 2 - overlays (multiple can be active)
  L.control.layers(baseLayers, overlays).addTo(map)

} // end loadData

//L.control.layers(baseLayers, overlays).addTo(map)
obj = {function:'hello',
      data:'great'}
console.log(obj.function)