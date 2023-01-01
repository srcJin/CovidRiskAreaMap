// Iterate all the data in the folder
let folderName = "sample";

// https://api.map.baidu.com/geocoding/v3/?address=北京市海淀区上地十街10号&output=json&ak=您的ak&callback=showLocation //GET请求

// const axios = require('axios').default;
// const fetch = require("node-fetch");

// Geocoding API ref : https://lbs.amap.com/api/webservice/guide/api/georegeo
// https://restapi.amap.com/v3/geocode/geo?address=北京市朝阳区阜通东大街6号&output=JSON&key=63445beea63ec64452a205ae10914e16

// sample return
// {"status":"1",
// "info":"OK",
// "infocode":"10000",
// "count":"1",
// "geocodes":[{
//     "formatted_address":"北京市朝阳区阜通东大街6号",
//     "country":"中国",
//     "province":"北京市",
//     "citycode":"010",
//     "city":"北京市",
//     "district":"朝阳区",
//     "township":[],
//     "neighborhood":{"name":[],"type":[]},
//     "building":{"name":[],"type":[]},
//     "adcode":"110105",
//     "street":"阜通东大街",
//     "number":"6号",
//     "location":"116.482086,39.990496",
//     "level":"门牌号"
// }]}

// Read local JSON file
const fs = require("fs");
const axios = require("axios");

function readJSON(filename) {
  let rawdata = fs.readFileSync(filename + ".json");
  let content = JSON.parse(rawdata);
  console.log("readJSON", content);
  return content;
}

function generateGeoJSON(filename, riskLevel) {
  let rawdata = fs.readFileSync(filename + ".json");
  let content = JSON.parse(rawdata);
  // console.log("content", content);
  // console.log("content.data.mcount", content.data.mcount);

  // Create a GeoJSON FeatureCollection with the feature
  let geoJSONData = {
    type: "FeatureCollection",
    features: [],
  };

  let geocoded = {
    full_address: [],
    coordinates: [],
  };

  // read the risk area list
  if (riskLevel == "h") {
    targetList = content.data.highlist;
  } else if (riskLevel == "m") {
    targetList = content.data.middlelist;
  }

  // iterate through each community and save to geoJSON
  for (let record in targetList) {
    for (let eachCommunity in targetList[record].communitys) {
      // console.log("record = ", content.data.middlelist[record]);
      let province;
      let city;
      let county;
      let community;
      let full_address;
      let coordinates;
      province = targetList[record].province;
      city = targetList[record].city;
      county = targetList[record].county;
      community = targetList[record].communitys[eachCommunity];
      full_address = province + city + county + community;

      // test if the address is already in the record
      coordinates = testDupAndRecord(full_address);
      console.log("coordinates=",coordinates)
      // console.log("coordinate", coordinate);
      // create a new geoJSONData
      geoJSONData.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coordinates,
        },
        properties: {
          province: province,
          city: city,
          county: county,
          community: community,
          full_address: full_address,
        },
      });

      writeRecord("recordPair",geocoded)
    }
  }



  writeGeoJSON(filename, riskLevel);



  function testDupAndRecord(addressForAPI) {
    let results;

    if (fs.existsSync("recordPair.json")) {
      // The file exists, so read its contents
      const data = fs.readFileSync("recordPair.json");
      results = JSON.parse(data);
      //   console.log("results=", results);
    } else {
      // The file doesn't exist, so create an empty array
      console.log("recordPair.json doesn't exist");
      results = { full_address: [], coordinates: [] };
    }

    // Check if the fetched content is already in the results
    console.log("results.full_address", results.full_address);
    let hasRecord = results.full_address.includes(addressForAPI);
    // let coordinate = [100, 200];
    let coordinate

    // if it is a new address, call the API, save the raw data, and save the coordinate to the recordPair.json and recordRaw.json
    if (!hasRecord) {
      // The fetched content is not in the results, so make a request to the API and add the result to the array
      console.log("no same result, do API geocoding");


      // Call API here, get coordinate
      // await api
      // make this function async
      // failure mechanism
      // try -- catch

      // testAPI start

      // async function geocodeAxios(address) {
      //   try {
      
      //     const response = await axios.get(
      //       `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(
      //         address
      //       )}&output=JSON&key=63445beea63ec64452a205ae10914e16`
      //     );
      //     console.log("geocodeAxios,response.data = ", response.data);

      //     const data = fs.readFileSync("recordRaw.json");
      //     let results = JSON.parse(data);
      
      //     // manually insert a full_address attribute for further process
      //     response.data.full_address = address;
      //     // push the raw response into the records attribute
      //     results.records.push(response.data)
      //     // create a separate list for geocoded addresses
      //     results.full_address.push(address)
      
      //     fs.writeFileSync("recordRaw.json", JSON.stringify(results));
      
      //     return results
          
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
      
      // // when using async function
      // // await before the async function
      // // await the promise
      
      // async function geocodeAxiosDelay(address) {
      //     // Pause for 2 second before next API call
      //     result = setTimeout(async () => {
      //       console.log("geocodeAxios(address)",await geocodeAxios(address));
      //     }, 2000);
      //     return result
      // }
      
      // console.log("geocodeAxiosDelay(addressForAPI)=",geocodeAxiosDelay(addressForAPI));

      results.full_address.push(addressForAPI);
      results.coordinates.push(coordinate);
      // save file
      fs.writeFileSync("recordPair.json", JSON.stringify(results));
      console.log("new address saved");
    } else {
      console.log("found duplicated address, skip");
    }
    return coordinate;
    // return results.coordinates[addressForAPI]
  }

  function writeGeoJSON(filename, riskLevel) {
    // write JSON string to a file
    fs.writeFile(
      filename + "_" + riskLevel + ".geojson",
      JSON.stringify(geoJSONData),
      (err) => {
        if (err) {
          throw err;
        }
        console.log(`${filename}_ ${riskLevel}.geojson is saved.`);
      }
    );
  }

  function writeRecord(filename, input) {
    // write JSON string to a file
    fs.writeFile(
      filename + ".json",
      JSON.stringify(input),
      // {'flag':'a'}, // that means to append to the file
      (err) => {
        if (err) {
          throw err;
        }
        console.log(`recordPair is saved.`);
      }
    );
  }

  // return geoJSONData
}

// end of editJSON

// readJSON("20220421");
// generateGeoJSON("20220422", "h");
generateGeoJSON("20220422", "m");

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
