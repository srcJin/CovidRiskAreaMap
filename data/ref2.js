// To geocode addresses using the Baidu Maps API and convert them to GeoJSON in JavaScript, 
// you can use the following approach:

// Obtain an API key for the Baidu Maps API. You can sign up for a free Baidu Maps API key 
// on the Baidu Maps website.

// Read the JSON files containing the addresses using the fetch function. You can use the 
// fetch function to make a GET request to the URL of the JSON file and retrieve the data 
// as a JSON object.


async function getJsonData(url) {
  const response = await fetch(url);
  return await response.json();
}

// Iterate through the list of addresses, and for each address, make a request to the Baidu Maps
//  API to geocode the address. You can use the fetch function to make a GET request to the Baidu
//   Maps API geocode endpoint, passing the address as a query parameter.

  
async function geocodeAddress(address) {
  const apiKey = 'your-api-key';
  const endpoint = 'https://api.map.baidu.com/geocoder/v2/';
  const query = `?address=${encodeURIComponent(address)}&output=json&ak=${apiKey}`;
  const response = await fetch(endpoint + query);
  return await response.json();
}

// For each address, parse the response from the Baidu Maps API to extract the latitude and longitude coordinates.
//  You can use the GeoJSON library to create a GeoJSON feature for each address, with the coordinates as the 
//  geometry and the address as the properties.

const GeoJSON = require('geojson');

function createGeoJsonFeature(address, coordinates) {
  return GeoJSON.Feature({
    type: 'Feature',
    properties: { address: address },
    geometry: {
      type: 'Point',
      coordinates: coordinates
    }
  });
}

// Save the GeoJSON data to a file with the same name as the original JSON file. 
// You can use the fs library to write the GeoJSON data to a file.

const fs = require('fs');

function saveGeoJsonFile(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data));
}
// To reduce duplicated requests, you can store the addresses that you have already geocoded
//  in a Set or Map, and check if the current address is in the Set or Map before making a 
//  request to the API. If the address is already in the Set or Map, you can skip the API 
//  request and use the stored coordinates instead.


const geocodedAddresses = new Set();

async function geocodeAddresses(addresses) {
  const geoJsonData = {
    type: 'FeatureCollection',
    features: []
  };

  for (const address of addresses) {
    if (geocodedAddresses.has(address)) {
      console.log(`Skipping geocoding for address: ${address}`);
      continue;
    }

    const response = await geocodeAddress(address




// To complete the process, you can write a main function that ties all of the steps together.
//  This function should read the JSON file containing the addresses, geocode the addresses using 
//  the Baidu Maps API, create a GeoJSON feature for each address, and save the resulting GeoJSON
//   data to a file with the same name as the original JSON file.
// Here is an example of how the main function might look:


async function main() {
  // Read the JSON file containing the addresses
  const jsonData = await getJsonData('path/to/json/file.json');
  const addresses = jsonData.addresses;

  // Geocode the addresses and create a GeoJSON feature for each address
  const geoJsonData = {
    type: 'FeatureCollection',
    features: []
  };
  for (const address of addresses) {
    if (geocodedAddresses.has(address)) {
      console.log(`Skipping geocoding for address: ${address}`);
      continue;
    }

    const response = await geocodeAddress(address);
    const coordinates = response.result.location;
    const feature = createGeoJsonFeature(address, coordinates);
    geoJsonData.features.push(feature);

    geocodedAddresses.add(address);
  }

  // Save the GeoJSON data to a file with the same name as the original JSON file
  const filename = 'path/to/geojson/file.geojson';
  saveGeoJsonFile(filename, geoJsonData);
}

main();
