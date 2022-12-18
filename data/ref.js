// To geocode addresses and create GeoJSON files using JavaScript, you can use 
// a geocoding service or library that provides a JavaScript API. Here are a couple of options:

// Google Maps Geocoding API: The Google Maps Geocoding API allows you 
// to convert addresses to coordinates and vice versa using JavaScript. 
// You can send a request to the API with an address, and it will return 
// the corresponding coordinates in a JSON response. You can then use the 
// coordinates to create a GeoJSON file using the GeoJSON library for JavaScript.

// Mapbox Geocoding API: The Mapbox Geocoding API allows you to convert 
// addresses to coordinates and vice versa using JavaScript. You can send
//  a request to the API with an address, and it will return the corresponding
//   coordinates in a JSON response. You can then use the coordinates to create
//    a GeoJSON file using the GeoJSON library for JavaScript.

// To create a GeoJSON file using JavaScript, you can use the GeoJSON library 
// for JavaScript or you can create it manually by following the GeoJSON specification.
//  Here is an example of how you might use the Google Maps Geocoding API and the 
//  GeoJSON library to geocode an address and create a GeoJSON file:


// Read the address from a JSON file
fetch("address.json")
  .then(response => response.json())
  .then(address => {
    // Geocode the address using the Google Maps Geocoding API
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`)
      .then(response => response.json())
      .then(data => {
        // Create a GeoJSON feature with the coordinates and properties
        const feature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [data.results[0].geometry.location.lng, data.results[0].geometry.location.lat]
          },
          properties: {
            address: address
          }
        };

        // Create a GeoJSON FeatureCollection with the feature
        const featureCollection = {
          type: "FeatureCollection",
          features: [feature]
        };

        // Write the FeatureCollection to a file
        const file = new File([JSON.stringify(featureCollection)], "geocoded_address.geojson", {
          type: "application/geo+json"
        });
        saveAs(file);
      });
  });
// 


// To geocode addresses and create GeoJSON files using JavaScript, you can use a geocoding service or library that provides
//  a JavaScript API. Here are a couple of options:

// Google Maps Geocoding API: The Google Maps Geocoding API allows you to convert addresses to coordinates and vice versa 
// using JavaScript. You can send a request to the API with an address, and it will return the corresponding coordinates 
// in a JSON response. You can then use the coordinates to create a GeoJSON file using the GeoJSON library for JavaScript.

// Mapbox Geocoding API: The Mapbox Geocoding API allows you to convert addresses to coordinates and vice versa using 
// JavaScript. You can send a request to the API with an address, and it will return the corresponding coordinates in 
// a JSON response. You can then use the coordinates to create a GeoJSON file using the GeoJSON library for JavaScript.

// To create a GeoJSON file using JavaScript, you can use the GeoJSON library for JavaScript or you can create it 
// manually by following the GeoJSON specification. Here is an example of how you might use the Google Maps Geocoding
//  API and the GeoJSON library to geocode an address and create a GeoJSON file:



// Read the address from a JSON file
fetch("address.json")
  .then(response => response.json())
  .then(address => {
    // Geocode the address using the Google Maps Geocoding API
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`)
      .then(response => response.json())
      .then(data => {
        // Create a GeoJSON feature with the coordinates and properties
        const feature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [data.results[0].geometry.location.lng, data.results[0].geometry.location.lat]
          },
          properties: {
            address: address
          }
        };

        // Create a GeoJSON FeatureCollection with the feature
        const featureCollection = {
          type: "FeatureCollection",
          features: [feature]
        };

        // Write the FeatureCollection to a file
        const file = new File([JSON.stringify(featureCollection)], "geocoded_address.geojson", {
          type: "application/geo+json"
        });
        saveAs(file);
      });
  });


// This code will read the address from the "address.json" file, geocode it using the Google Maps Geocoding API,
//  create a GeoJSON feature with the coordinates and the original address as a property, and write the feature
//   to a GeoJSON file called "geocoded_address.geojson".