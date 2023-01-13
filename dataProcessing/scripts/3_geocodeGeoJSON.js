const fs = require("fs");
const axios = require("axios");
var sleep = require('system-sleep');

let totalSkipped = 0
let totalFetched = 0
let totalError = 0
let sleeptime = 100

function geocodeGeoJSON(filename) {
  // read the raw file
  let rawdata = fs.readFileSync(filename);
  let content = JSON.parse(rawdata);
  // console.log("content", content);
  // console.log("content.data.mcount", content.data.mcount);

  let features = content.features;
//   console.log("features=",features)
  // iterate through each community and save to geoJSONData
  for (let i=0; i<features.length;i++) {
    // console.log("Index =",i)
    let address = features[i].properties.full_address;
    // console.log("Address =", address);
    // here get coordinate and write file
    geocodeAxios(address);

    sleep(sleeptime)

    // start to write geoJSON
    // fs.writeFile(
    //   filename.substring(0, 18) + "_edit.geojson",
    //   JSON.stringify(content),
    //   (err) => {
    //     if (err) {
    //       throw err;
    //     }
    //     console.log(`${filename.substring(0, 18)}_edit.geojson is saved.`);
    //   }
    // );
  }
}



async function geocodeAxios(address) {
  // load existing address
  let recordRaw = fs.readFileSync("recordRaw.json");
  let raw = JSON.parse(recordRaw);

  let recordPair = fs.readFileSync("recordPair.json");
  let pair = JSON.parse(recordPair);

  let recordDict = fs.readFileSync("recordDict.json");
  let dict = JSON.parse(recordDict);

//   let hasRecord = pair.full_address.includes(address);
  let hasRecord = address in dict;

  // if it is a new address, call the API, save the raw data, and save the coordinate to the recordPair.json and recordRaw.json
  if (hasRecord) {
    // console.log(`Skip: ${address}:[${dict[address]}]`)
    totalSkipped += 1
    sleeptime = 1
    return dict[address]
  } 
  
  else {
    sleeptime = 100
    try {
      const response = await axios.get(
        `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(
          address
        )}&output=JSON&key=63445beea63ec64452a205ae10914e16`
      );
    //   console.log(response.data);

      if (response.data.info == "OK") {
        // manually insert a full_address attribute for further process
        response.data.full_address = address;
        raw.full_address.push(address);
        response.data.full_address = address
        raw.records.push(response.data);
        
        pair.full_address.push(address);
        let coordinateString = response.data.geocodes[0].location;
        let coordinate = coordinateString.split(",").map((x) => parseFloat(x));
        pair.coordinates.push(coordinate);

        dict[address] = coordinate

        fs.writeFileSync("recordRaw.json", JSON.stringify(raw));
        fs.writeFileSync("recordPair.json", JSON.stringify(pair));
        fs.writeFileSync("recordDict.json", JSON.stringify(dict));

        console.log(`Fetched: ${address}:[${coordinate}]`)
        totalFetched += 1
        console.log(`---- Fetched ${totalFetched} | Skipped ${totalSkipped} | Error ${totalError}  ----`)
        return coordinate;

      } else {
        console.log("Error： address =", address);
        totalError += 1
      }
    } catch (error) {
      console.error(error);
    }
  }
}

// when using async function
// await before the async function
// await the promise

async function geocodeAxiosDelay(address) {
  // Pause for 1 second before next API call
  setTimeout(async () => {
    console.log(`Coordinate for ${address}:`);
    console.log("geocodeAxios(address)", await geocodeAxios(address));
  }, 1000);
}

// loop through all the file name in the data folder
function generate() {
    fs.readdir("geojson", (err, filenames) => {
      if (err) {
        console.error(err);
        return;
      }
  
      filenames.forEach((filename) => {
        console.log(`-----------now processing:${filename}-----------`);
        // console.log(`------------------------------------------------`);
        geocodeGeoJSON("geojson/" + filename);
      });
    });
  }


generate();
// geocodeAxiosDelay("云南省德宏傣族景颇族自治州瑞丽市鑫盛时代佳园小区")
