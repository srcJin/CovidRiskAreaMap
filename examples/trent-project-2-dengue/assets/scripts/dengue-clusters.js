// These 5 functions below are called from the apps.js file

function getNorthDengue() {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 1.35027, lng: 103.821959 }
  });
  data = map.data.loadGeoJson(
    "assets/nea_files/dengue-cases-north-east-geojson.geojson"
  );
  map.data.addGeoJson(data);
  map.data.setStyle({
    fillColor: "#c82333",
    strokeWeight: 1
  });

  map.data.addListener("click", function (event) {
    let myHTML = event.feature.getProperty("Description");
    let infoWindow = new google.maps.InfoWindow({
      content: `<div>${myHTML}</div>`
    });

    infoWindow.setContent("<div id='cluster-infobox'>" + myHTML + "</div>");
    infoWindow.setPosition(event.latLng);
    infoWindow.setOptions({ pixelOffset: new google.maps.Size(0, -30) });
    infoWindow.open(map);
  });
}

function getCentralDengue() {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 1.35027, lng: 103.821959 }
  });
  data = map.data.loadGeoJson(
    "assets/nea_files/dengue-cases-central-geojson.geojson"
  );
  map.data.addGeoJson(data);
  map.data.setStyle({
    fillColor: "#c82333",
    strokeWeight: 1
  });

  map.data.addListener("click", function (event) {
    let myHTML = event.feature.getProperty("Description");
    let infoWindow = new google.maps.InfoWindow({
      content: `<div>${myHTML}</div>`
    });

    infoWindow.setContent("<div id='cluster-infobox'>" + myHTML + "</div>");
    infoWindow.setPosition(event.latLng);
    infoWindow.setOptions({ pixelOffset: new google.maps.Size(0, -30) });
    infoWindow.open(map);
  });
}

function getSouthEastDengue() {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 1.35027, lng: 103.821959 }
  });
  data = map.data.loadGeoJson(
    "assets/nea_files/dengue-cases-south-east-geojson.geojson"
  );
  map.data.addGeoJson(data);
  map.data.setStyle({
    fillColor: "#c82333",
    strokeWeight: 1
  });

  map.data.addListener("click", function (event) {
    let myHTML = event.feature.getProperty("Description");
    let infoWindow = new google.maps.InfoWindow({
      content: `<div>${myHTML}</div>`
    });

    infoWindow.setContent("<div id='cluster-infobox'>" + myHTML + "</div>");
    infoWindow.setPosition(event.latLng);
    infoWindow.setOptions({ pixelOffset: new google.maps.Size(0, -30) });
    infoWindow.open(map);
  });
}

function getSouthWestDengue() {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 1.35027, lng: 103.821959 }
  });
  data = map.data.loadGeoJson(
    "assets/nea_files/dengue-cases-south-west-geojson.geojson"
  );
  map.data.addGeoJson(data);
  map.data.setStyle({
    fillColor: "#c82333",
    strokeWeight: 1
  });

  map.data.addListener("click", function (event) {
    let myHTML = event.feature.getProperty("Description");
    let infoWindow = new google.maps.InfoWindow({
      content: `<div>${myHTML}</div>`
    });

    infoWindow.setContent("<div id='cluster-infobox'>" + myHTML + "</div>");
    infoWindow.setPosition(event.latLng);
    infoWindow.setOptions({ pixelOffset: new google.maps.Size(0, -30) });
    infoWindow.open(map);
  });
}


