// Iterate all the data in the folder
let folderName = "sample";

// https://api.map.baidu.com/geocoding/v3/?address=北京市海淀区上地十街10号&output=json&ak=您的ak&callback=showLocation //GET请求

// const axios = require('axios').default;
// const fetch = require("node-fetch");

// Read local JSON file
const fs = require("fs");

function readJSON(filename) {
  let rawdata = fs.readFileSync("sample/" + filename + ".json");
  let content = JSON.parse(rawdata);
  console.log(content);
  return content;
}

function editJSON(filename) {
    let rawdata = fs.readFileSync("sample/" + filename + ".json");
    let content = JSON.parse(rawdata);
    console.log(content);
    return content;
  }

readJSON("20220421");
editJSON("20220421");

// async function readJSONFile(filename) {
//     const response = await fetch('sample/20220422.json');
//     const data = await response.json();
//     console.log(data);
// }
// readJSONFile()

// async function loadData(){
//     const response = await axios.get('20220422.json');

//     const data = await response.json();
//     console.log(data);
//     };
//    // end loadData

// loadData()

// async function printJSON() {
//     const response = await fetch("20220422.json");
//     const json = await response.json();
//     console.log(json);
// }

// printJSON()

// function loadJSON (name){
//     const promisedObject = fetch("20220422.json")
//     .then((response) => response.json())
//     .then((data) => {return data;});
//     console.log("loadJson=",{name:name, promisedObject:promisedObject})
//     return {name:name, promisedObject:promisedObject}
// }

// loadJSON()

// function usingJSON (object) {
//     object.promisedObject.then((data) => {
//         console.log(object.name + " = ",data);
//       });
//  };

// // Read the address from a JSON file
// fetch("address.json")
//   .then((response) => response.json())
//   .then((address) => {
//     // Geocode the address using the Baidu Maps Geocoding API
//     // response sample

//     // {"status":0,
//     // "result":{
//     //     "location":{"lng":116.3076223267197,"lat":40.05682848596073},
//     //     "precise":1,
//     //     "confidence":80,
//     //     "comprehension":100,
//     //     "level":"门址"}}
//     // }

//     fetch(`https://api.map.baidu.com/geocoding/v3/?address=北京市海淀区上地十街10号&output=json&ak=pRBZCNZQMdpAMff2HGB5mIUsATZGSc1o`);
//         .then((response) => response.json())
//         .then((data) => {
//           // Create a GeoJSON feature with the coordinates and properties
//           const feature = {
//             type: "Feature",
//             geometry: {
//               type: "Point",
//               coordinates: [
//                 data.results[0].geometry.location.lng,
//                 data.results[0].geometry.location.lat,
//               ],
//             },
//             properties: {
//               address: address,
//             },
//           };

//           // Create a GeoJSON FeatureCollection with the feature
//           const featureCollection = {
//             type: "FeatureCollection",
//             features: [feature],
//           };

//           // Write the FeatureCollection to a file
//           const file = new File(
//             [JSON.stringify(featureCollection)],
//             "geocoded_address.geojson",
//             {
//               type: "application/geo+json",
//             }
//           );
//           saveAs(file);
//         });
//   });
