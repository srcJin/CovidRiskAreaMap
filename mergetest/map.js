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
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: 'topleft'
    }
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

L.control.layers(baseLayers,null,{togglerClassName: 'layers-provider'}).addTo(map);
// L.control.layers(osmLayers).addTo(map);

L.control
  .zoom({
    zoomInTitle: "Zoom in",
    zoomOutTitle: "Zoom out",
  })
  .addTo(map);

// two variables to remember if the markers has been added to map
let isPointsDraw = 0;
let markerClusterLayerHigh = null;
let markerClusterLayerMiddle = null;
let highRiskLayer = null;
let middleRiskLayer = null;

async function plotRiskPoints(date) {
  // console.log("plotRiskPoints!");

  // Define the custom marker icon
  var iconHigh = L.icon({
    iconUrl: "./images/high.png",
    iconSize: [24, 24],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    // shadowUrl: "my-icon-shadow.png",
    // shadowSize: [32, 32],
    // shadowAnchor: [16, 16],
  });

  var iconMiddle = L.icon({
    iconUrl: "./images/middle.png",
    iconSize: [18, 18],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
    // shadowUrl: "my-icon-shadow.png",
    // shadowSize: [32, 32],
    // shadowAnchor: [16, 16],
  });

  // Define the custom marker icon
  const highRiskPoints = await axios.get("pointsData/" + date + "_h.geojson");
  const middleRiskPoints = await axios.get("pointsData/" + date + "_m.geojson");

  // console.log("highRiskPoints =", highRiskPoints);

  if (isPointsDraw == 0) {
    // create cluster layers
    markerClusterLayerHigh = L.markerClusterGroup(
      // options ref : https://github.com/Leaflet/Leaflet.markercluster#examples
      // icon ref: https://stackoverflow.com/questions/24258914/leaflet-clustermarker-with-custom-icon
      // https://leafletjs.com/examples/custom-icons/
      {
        maxClusterRadius: 5,
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

    markerClusterLayerMiddle = L.markerClusterGroup(
      // options ref : https://github.com/Leaflet/Leaflet.markercluster#examples
      // icon ref: https://stackoverflow.com/questions/24258914/leaflet-clustermarker-with-custom-icon
      // https://leafletjs.com/examples/custom-icons/
      {
        maxClusterRadius: 5,
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

    highRiskLayer = L.geoJson(
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

    middleRiskLayer = L.geoJson(
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

    // console.log("has highRiskLayer 1", map.hasLayer(highRiskLayer));
    // console.log("has markerClusterLayerHigh 1",map.hasLayer(markerClusterLayerHigh));

    map.addLayer(markerClusterLayerHigh);
    map.addLayer(markerClusterLayerMiddle);

    // console.log("has highRiskLayer 2", map.hasLayer(highRiskLayer));
    // console.log(
    //   "has markerClusterLayerHigh 2",
    //   map.hasLayer(markerClusterLayerHigh)
    // );

    let layerControl1 = {
      "High Risk Area": markerClusterLayerHigh,
      "Middle Risk Area": markerClusterLayerMiddle,
    };

    L.control.layers(null, layerControl1,{togglerClassName: 'layers-point'}).addTo(map);

    isPointsDraw = 1;
  } else {
    // console.log("> 1 push");
    // cleaer the layer

    // plot new points based on date
    // console.log("removing layer");
    map.removeLayer(markerClusterLayerHigh);
    map.removeLayer(markerClusterLayerMiddle);

    markerClusterLayerHigh.clearLayers();
    markerClusterLayerMiddle.clearLayers();

    highRiskLayer = L.geoJson(
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

    middleRiskLayer = L.geoJson(
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

    // map.addLayer(markerClusterLayerHigh);
    // map.addLayer(markerClusterLayerMiddle);
    // console.log("has highRiskLayer 4", map.hasLayer(highRiskLayer));
    // console.log("has markerClusterLayerHigh 4",map.hasLayer(markerClusterLayerHigh));

    // console.log("has highRiskLayer 3", map.hasLayer(highRiskLayer));
    // console.log(
    //   "has markerClusterLayerHigh 3",
    //   map.hasLayer(markerClusterLayerHigh)
    // );

    // map.addLayer(markerClusterLayerHigh);
    // map.addLayer(markerClusterLayerMiddle);
  }
  // markerClusterLayer.addTo(map);

  // let layerGroup = L.layerGroup([
  //   markerClusterLayerHigh,
  //   markerClusterLayerMiddle,
  // ]);
}

const info = L.control();
let isCasesDraw = 0;
let confirmed = null;
let deaths = null;
let riskArea = null;
const emptyLayer = L.tileLayer("");
let layerControl2
let control
let styleMode = 0
let isLegendDraw = 0
let previousStyleMode

async function plotCase(date) {
  // province border data source: https://github.com/HaoyuA/D3.js-Data-Visualization
  // ref : https://leafletjs.com/examples/choropleth/

  let provinceGeoJSON = await axios.get("./provinceData/" + date + ".geojson");


  // let heatMapCoordinates = []
  // provinceGeoJSON.data.features.forEach(function (feature) {
  //   for (let i in feature.geometry.coordinates.flat()) {

  //     // console.log(L.latLng(feature.geometry.coordinates.flat()[i]));
  //     heatMapCoordinates.push(L.latLng(feature.geometry.coordinates.flat()[i]))
  //   }
   
  //   heatMapCoordinates = heatMapCoordinates.concat(L.latLng(feature.geometry.coordinates.flat()))
  // });
  // console.log(heatMapCoordinates);
  
  // var heat = L.heatLayer([
  //   heatMapCoordinates
  // ], {radius: 25}).addTo(map);

  // var heatmap = new L.webGLHeatmap({
  //   size: 1000
  // });
  // heatmap.setData(heatMapCoordinates)

  // map.addLayer(heatmap);

  if (isCasesDraw == 0) {
    // control = L.control.layers(layerControl2, null).addTo(map);
    riskArea = L.geoJson(provinceGeoJSON.data, {
      style: function (feature) {
        return {
          weight: 1,
          opacity: 1,
          color: "white",
          // dashArray: '3',
          fillOpacity: 1,
          fillColor: getColor(
            feature.properties.high + feature.properties.middle,
            "riskArea"
          ),
        };
      },
      onEachFeature,
    });

    confirmed = L.geoJson(provinceGeoJSON.data, {
      style: function (feature) {
        return {
          weight: 1,
          opacity: 1,
          color: "white",
          // dashArray: '3',
          fillOpacity: 1,
          fillColor: getColor(feature.properties.confirmed, "confirmed"),
        };
      },
      onEachFeature,
    });

    deaths = L.geoJson(provinceGeoJSON.data, {
      style: function (feature) {
        return {
          weight: 1,
          opacity: 1,
          color: "white",
          // dashArray: '3',
          fillOpacity: 1,
          fillColor: getColor(feature.properties.deaths, "deaths"),
        };
      },
      onEachFeature,
    });

    layerControl2 = {
      Deaths: deaths,
      "Confirmed Cases": confirmed,
      "Risk Areas": riskArea,
      "Turn Off": emptyLayer,
    };
    map.addLayer(riskArea);
    // confirmed.addTo(map);

    control = L.control.activeLayers(layerControl2, null,{togglerClassName: 'layers-cases'})
    control.addTo(map);

    // console.log("activeLayer=",activeLayer)

    isCasesDraw = 1;
  } else {
    // Use ActiveLayer plugin to get the active baselayer name

    activeLayer = control.getActiveBaseLayer().name
    // console.log("activeLayer=",String(activeLayer))
    // styleMode = 0

    if (activeLayer == "Risk Areas") {
      styleMode = 0
    }
    if (activeLayer == "Confirmed Cases") {
      styleMode = 1
    }
    if (activeLayer == "Deaths") {
      styleMode = 2
    }
    if (activeLayer == "Turn Off") {
      styleMode = 3
    }
    // console.log("styleMode=",styleMode)
    // console.log("case > 1 push");
    // console.log("removing layer");

    map.removeLayer(deaths);
    map.removeLayer(riskArea);
    map.removeLayer(confirmed);
    map.removeLayer(emptyLayer);
    deaths.clearLayers();
    confirmed.clearLayers();
    riskArea.clearLayers();

    riskArea = L.geoJson(provinceGeoJSON.data, {
      style: function (feature) {
        return {
          weight: 1,
          opacity: 1,
          color: "white",
          // dashArray: '3',
          fillOpacity: 1,
          fillColor: getColor(
            feature.properties.high + feature.properties.middle,
            "riskArea"
          ),
        };
      },
      onEachFeature,
    });

    confirmed = L.geoJson(provinceGeoJSON.data, {
      style: function (feature) {
        return {
          weight: 1,
          opacity: 1,
          color: "white",
          // dashArray: '3',
          fillOpacity: 1,
          fillColor: getColor(feature.properties.confirmed, "confirmed"),
        };
      },
      onEachFeature,
    });

    deaths = L.geoJson(provinceGeoJSON.data, {
      style: function (feature) {
        return {
          weight: 1,
          opacity: 1,
          color: "white",
          // dashArray: '3',
          fillOpacity: 1,
          fillColor: getColor(feature.properties.deaths, "deaths"),
        };
      },
      onEachFeature,
    });

    layerControl2 = {
      Deaths: deaths,
      "Confirmed Cases": confirmed,
      "Risk Areas": riskArea,
      "Turn Off": emptyLayer,
    };


    // console.log("styleMode=",styleMode);

    if (styleMode == 0) {
      map.addLayer(riskArea);
    }
    if (styleMode == 1) {
      map.addLayer(confirmed);
    }
    if (styleMode == 2) {
      map.addLayer(deaths);
    }
    if (styleMode == 3) {
      map.addLayer(emptyLayer);
    }

    map.removeControl(control)
    control = L.control.activeLayers(layerControl2, null,{togglerClassName: 'layers-cases'})
    control.addTo(map);
    // map.addLayer(deaths);
    // map.addLayer(confirmed);

    // https://stackoverflow.com/questions/44322326/how-to-get-selected-layers-in-control-layers



    // console.log("haslayer1",map.hasLayer(riskArea))
    // console.log("haslayer2",map.hasLayer(confirmed))
    // console.log("haslayer3",map.hasLayer(deaths))
    //   map.on('baselayerchange', function (e) {
    //     console.log(e.layer);
    // });
  }
  // console.log("provinceGeoJSON", provinceGeoJSON.data);

  // L.geoJson(provinceGeoJSON.data).addTo(map);

  // control that shows state info on hover


  info.onAdd = function (map) {
    this._div = L.DomUtil.create("div", "info");
    this.update();
    return this._div;
  };

  info.update = function (props) {
    // console.log("props=",props)
    const contents = props
      ? `<b>${props.name}</b>
      <br>  ${props.nameeng} 
      <br>
      <br> High Risk Area: ${props.high} 
      <br> Middle Risk Area: ${props.middle} 
      <br> Confirmed: ${props.confirmed} 
      <br> Death: ${props.deaths} 
      <br> Recovered: ${props.recovered} 
      `
      : "Hover over a province";

    this._div.innerHTML = `<small>${contents}</small>`;
    // this.leaflet-popup-content.innerHTML = `<small>${contents}</small>`;
  };

  // get color depending on population density value
  function getColor(d, type) {
    if (type == "riskArea") {
      return d > 1000
        ? "#800026"
        : d > 500
          ? "#BD0026"
          : d > 250
            ? "#E31A1C"
            : d > 50
              ? "#FC4E2A"
              : d > 25
                ? "#FD8D3C"
                : d > 10
                  ? "#FEB24C"
                  : d > 5
                    ? "#FED976"
                    : "#FFEDA0";
    }
    if (type == "confirmed") {
      return d > 1000
        ? "#344152"
        : d > 500
          ? "#506987"
          : d > 250
            ? "#325C74"
            : d > 50
              ? "#42647F"
              : d > 25
                ? "#6996AD"
                : d > 10
                  ? "#9AC0CD"
                  : d > 5
                    ? "#C3E4ED"
                    : "#E3FFFF";
    }

    // greyscale https://www.w3schools.com/colors/colors_shades.asp
    if (type == "deaths") {
      return d > 20
        ? "#000000"
        : d > 15
          ? "#282828"
          : d > 10
            ? "#484848"
            : d > 8
              ? "#696969"
              : d > 5
                ? "#808080"
                : d > 2
                  ? "#A9A9A9"
                  : d > 1
                    ? "#D0D0D0"
                    : "#DADADA";
    }
  }



  function highlightFeature_bak(e) {
    const layer = e.target;

    layer.setStyle({
      weight: 2,
      color: "#fff",
      dashArray: "",
      fillOpacity: 0.7,
    });

    layer.bringToFront();
    info.addTo(map);
    info.update(layer.feature.properties);
  }

  function highlightFeature(e) {
    // map.on('mousemove', function(e) {
    //   // Get the current mouse position
    //   let latlng = e.latlng;
    // })

    const layer = e.target;
    // console.log("layer=",layer);
    // layer.on('mouseover', function (e) {
    //   var popup = e.target.getPopup();
    //   popup.setLatLng(e.latlng).openOn(map);
    // });
    layer.setStyle({
      weight: 2,
      color: "#fff",
      dashArray: "",
      fillOpacity: 0.7,
    });


    // added popup
    // ref: https://stackoverflow.com/questions/41522376/leaflet-open-popup-at-cursor-position-instead-of-linestring-center
    layer.on("mouseover", function (e) {
      props = layer.feature.properties;
      const contents = props
        ? `<b>${props.name}</b>
      <br>  ${props.nameeng} 
      <br>
      <br> High Risk Area: ${props.high} 
      <br> Middle Risk Area: ${props.middle} 
      <br> Confirmed: ${props.confirmed} 
      <br> Death: ${props.deaths} 
      <br> Recovered: ${props.recovered} 
      `
        : "";

      // display popup on the mouse position after 1.5s, not working very well
      // disable for now
      // let timeout = setTimeout(function () {
      //   let popup = L.popup()
      //     .setLatLng(e.latlng)
      //     .setContent(contents)
      //     .openOn(map);
      // }, 1500);
    });

    // info.style.left = e.pageX + 'px';
    // info.style.top = e.pageY + 'px';

    layer.bringToFront();
    info.addTo(map);
    info.update(layer.feature.properties);
  }

  function resetHighlight(e) {
    // console.log("e=",e);
    // confirmed.resetStyle(e.target);
    // deaths.resetStyle(e.target);
    if (styleMode == 0) {
      riskArea.resetStyle(e.target);
    }
    if (styleMode == 1) {
      confirmed.resetStyle(e.target);
    }
    if (styleMode == 2) {
      deaths.resetStyle(e.target);
    }
    if (styleMode == 3) {
    }
    // riskArea.resetStyle(e.target);

    info.update();
  }

  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      // click works for both touch screen and 
      click: zoomToFeature,
    });
    // console.log(layer)
  }

  const legend_riskArea = L.control({ position: "bottomleft" });
  const legend_confirmed = L.control({ position: "bottomleft" });
  const legend_deaths = L.control({ position: "bottomleft" });

  legend_riskArea.onAdd = function (map) {
    const div = L.DomUtil.create("div", "info legend");
    const grades = [0, 5, 10, 25, 50, 250, 500, 1000];
    const labels = [];
    let from, to;
    let legendType
    for (let i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];
      labels.push(
        `<i style="background:${getColor(from + 1, "riskArea")}"></i> ${from}${to ? `&ndash;${to}` : "+"
        }`
      );
    }
    div.innerHTML = labels.join("<br>");
    return div;
  };
  legend_deaths.onAdd = function (map) {
    const div = L.DomUtil.create("div", "info legend");
    const grades = [0, 2, 5, 8, 10, 15, 20, 25];
    const labels = [];
    let from, to;
    let legendType
    for (let i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];
      labels.push(
        `<i style="background:${getColor(from + 1, "deaths")}"></i> ${from}${to ? `&ndash;${to}` : "+"
        }`
      );
    }
    div.innerHTML = labels.join("<br>");
    return div;
  };
  legend_confirmed.onAdd = function (map) {
    const div = L.DomUtil.create("div", "info legend");
    const grades = [0, 5, 10, 25, 50, 250, 500, 1000];
    const labels = [];
    let from, to;
    let legendType
    for (let i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];
      labels.push(
        `<i style="background:${getColor(from + 1, "confirmed")}"></i> ${from}${to ? `&ndash;${to}` : "+"
        }`
      );
    }
    div.innerHTML = labels.join("<br>");
    return div;
  };


  // only draw legend once
  // auto show/hide legend: https://gis.stackexchange.com/questions/68941/add-remove-legend-with-leaflet-layers-control
  if (isLegendDraw == 0) {
    // console.log("drawing legends");
    legend_riskArea.addTo(map);
    isLegendDraw = 1
    previousStyleMode = styleMode

  } else {
    // console.log("stylemode=", styleMode);
    // console.log("previousStyleMode=", previousStyleMode);

    if (styleMode != previousStyleMode) {
      if (previousStyleMode == 0) {
        console.log("removing legend riskArea");
        // map.removeControl(legend_riskArea);
        legend_riskArea.remove()
        // map.removeLayer(legend_riskArea)    
      }
      else if (previousStyleMode == 1) {
        console.log("removing legend_confirmed");
        // map.removeControl(legend_confirmed);
        legend_confirmed.remove()
        // map.removeLayer(legend_confirmed)
      }
      else if (previousStyleMode == 2) {
        console.log("removing legend_deaths");
        // map.removeControl(legend_deaths);
        legend_deaths.remove()

        // map.removeLayer(legend_deaths)
      }
      else if (previousStyleMode == 3) {
      }

      if (styleMode == 0) {

        legend_riskArea.addTo(map);
        previousStyleMode = 0
      } else if (styleMode == 1) {
        legend_confirmed.addTo(map);
        previousStyleMode = 1
      } else if (styleMode == 2) {

        legend_deaths.addTo(map)
        previousStyleMode = 2
      } else {
        previousStyleMode = 3
      }


    }
  }

}
// map.attributionControl.addAttribution(
//   'Data Source <a href="https://github.com/CSSEGISandData">CSSE at Johns Hopkins University</a>'
// );




console.log("Map is running");

plotRiskPoints("20220702");

plotCase("20220702");

