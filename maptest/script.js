// latlng is represente of an array
// index 0 is the latitude
// index 1 is the longitude
let china = [35.0, 107.0];
let singapore = [1.29, 103.85];

// L is provided by leaflet.js
// L is the leaflet object and it allows
// us to features from Leaflet
// the first parameter to the map function
// is the ID Of the <div> that will hold it
// const map = L.map('map');

// the tile layer basically represents
// the map that you can see
// when we set up the tile layer we're requesting
// a visual style of the map

const normalm1 = L.tileLayer.chinaProvider("Geoq.Normal.Map", {
  maxZoom: 18,
  minZoom: 3,
});
const normalm2 = L.tileLayer.chinaProvider("Geoq.Normal.PurplishBlue", {
  maxZoom: 18,
  minZoom: 3,
});
const normalm3 = L.tileLayer.chinaProvider("Geoq.Normal.Gray", {
  maxZoom: 18,
  minZoom: 3,
});
const normalm4 = L.tileLayer.chinaProvider("Geoq.Normal.Warm", {
  maxZoom: 18,
  minZoom: 3,
});
const normalm5 = L.tileLayer.chinaProvider("Geoq.Theme.Hydro", {
  maxZoom: 18,
  minZoom: 3,
});

const osm_light = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/light-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", //demo access token
  }
);

var osm_dark = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/dark-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", //demo access token
  }
);

let normal = L.layerGroup(
  [normalm1, normalm2, normalm3, normalm4, normalm5],
  [osm_light, osm_dark]
);

let map = L.map("map", {
  center: china,
  zoom: 4,
  layers: [osm_light],
  zoomControl: false,
});

let baseLayers = {
  Normal: normalm1,
  "Dark Blue": normalm2,
  Grey: normalm3,
  Warm: normalm4,
  Water: normalm5,
  "Open Street Map Light": osm_light,
  "Open Street Map Dark": osm_dark,
};

// let osmLayers = {

// }

L.control.layers(baseLayers).addTo(map);
// L.control.layers(osmLayers).addTo(map);

L.control
  .zoom({
    zoomInTitle: "Zoom in",
    zoomOutTitle: "Zoom out",
  })
  .addTo(map);

async function plotRiskPoints() {
  console.log("plotRiskPoints!");

  // Define the custom marker icon
  var iconHigh = L.icon({
    iconUrl: "iconHigh.png",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    // shadowUrl: "my-icon-shadow.png",
    // shadowSize: [32, 32],
    // shadowAnchor: [16, 16],
  });

  var iconMiddle = L.icon({
    iconUrl: "iconMiddle.png",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
    // shadowUrl: "my-icon-shadow.png",
    // shadowSize: [32, 32],
    // shadowAnchor: [16, 16],
  });

  // create cluster layers
  let markerClusterLayerHigh = L.markerClusterGroup(
    // options ref : https://github.com/Leaflet/Leaflet.markercluster#examples
    // icon ref: https://stackoverflow.com/questions/24258914/leaflet-clustermarker-with-custom-icon
    // https://leafletjs.com/examples/custom-icons/
    {
      maxClusterRadius: 50,
      disableClusteringAtZoom: 10,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
      singleMarkerMode: false,
      removeOutsideVisibleBounds: true,
      animate: true,

      // Define the custom cluster icon
      iconCreateFunction: function (cluster) {
        let html =
          '<div class="iconHighRisk"><p style="color: none ; margin: 0;">' +
          cluster.getChildCount() +
          "</p></div>";
        return L.divIcon({
          html: html,
          className: "highRisk",
          iconSize: [32, 32],
        });
      },
    }
  );

  let markerClusterLayerMiddle = L.markerClusterGroup(
    // options ref : https://github.com/Leaflet/Leaflet.markercluster#examples
    // icon ref: https://stackoverflow.com/questions/24258914/leaflet-clustermarker-with-custom-icon
    // https://leafletjs.com/examples/custom-icons/
    {
      maxClusterRadius: 50,
      disableClusteringAtZoom: 10,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
      singleMarkerMode: false,
      removeOutsideVisibleBounds: true,
      animate: true,

      // Define the custom cluster icon
      iconCreateFunction: function (cluster) {
        let html =
          '<div class="iconMiddleRisk"><p style="color: none ; margin: 0;">' +
          cluster.getChildCount() +
          "</p></div>";
        return L.divIcon({
          html: html,
          className: "middleRisk",
          iconSize: [24, 24],
        });
      },
    }
  );

  // Define the custom marker icon
  const highRiskPoints = await axios.get("data/20220702_h.geojson");
  const middleRiskPoints = await axios.get("data/20220702_m.geojson");

  // console.log("highRiskPoints =", highRiskPoints);

  const highRiskLayer = L.geoJson(
    highRiskPoints.data,
    {
      pointToLayer: function (feature, latlng) {
        // Use the custom marker icon for each marker
        return L.marker(latlng, { icon: iconHigh });
        // Option2: Use the circle marker icon for each marker, has animation bug
        //   return L.circleMarker(latlng, {
        //     radius: 10,
        //     color: 'red',
        //     weight: 4,
        //     fillColor: '#f03',
        //     fillOpacity: 0.5 });
      },

      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<div>
            <h5>Level: High Risk</h5>
            <h5>Address:<br>${feature.properties.full_address}</h5>
        </div>`);
      },
    } // end onEachFeature
  ).addTo(markerClusterLayerHigh); // end L.geoJson

  const middleRiskLayer = L.geoJson(
    middleRiskPoints.data,
    {
      pointToLayer: function (feature, latlng) {
        // Use the custom marker icon for each marker
        return L.marker(latlng, { icon: iconMiddle });
      },

      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<div>
            <h5>Level: Middle Risk</h5>
            <h5>Address: <br>${feature.properties.full_address}</h5>
        </div>`);
      },
    } // end onEachFeature
  ).addTo(markerClusterLayerMiddle); // end L.geoJson

  map.addLayer(markerClusterLayerHigh);
  map.addLayer(markerClusterLayerMiddle);

  // markerClusterLayer.addTo(map);

  let layerGroup = L.layerGroup([
    markerClusterLayerHigh,
    markerClusterLayerMiddle,
  ]);
  let layerName = {
    "High Risk Area": markerClusterLayerHigh,
    "Middle Risk Area": markerClusterLayerMiddle,
  };

  L.control.layers(null,layerName).addTo(map);
}


console.log("Map is running");

plotRiskPoints();

