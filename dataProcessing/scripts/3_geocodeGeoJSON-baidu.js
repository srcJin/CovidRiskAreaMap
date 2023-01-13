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
  let recordRaw = fs.readFileSync("recordRaw_baidu.json");
  let raw = JSON.parse(recordRaw);

  let recordPair = fs.readFileSync("recordPair.json");
  let pair = JSON.parse(recordPair);

  let recordDict = fs.readFileSync("recordDict.json");
  let dict = JSON.parse(recordDict);

//   let hasRecord = pair.full_address.includes(address);
  let hasRecord = address in dict;
  //  hasRecord = false
  // if it is a new address, call the API, save the raw data, and save the coordinate to the recordPair.json and recordRaw.json
  if (hasRecord) {
    // console.log(`Skip: ${address}:[${dict[address]}]`)
    sleeptime = 1
    totalSkipped += 1
    return dict[address]
  } 
  
  else {
    sleeptime = 250
    try {
      const response = await axios.get(

        `http://api.map.baidu.com/geocoder/v2/?address=
        ${address}&output=json&ak=pRBZCNZQMdpAMff2HGB5mIUsATZGSc1o`
      );
      
      // console.log(response.data);

      if (response.data.status == 0) {
        // manually insert a full_address attribute for further process
        response.data.full_address = address;
        raw.full_address.push(address);
        response.data.full_address = address
        raw.records.push(response.data);
        
        pair.full_address.push(address);

        let bd_lng = response.data.result.location.lng
        let bd_lat = response.data.result.location.lat

        const convertAPI = await axios.get(
          `https://api.map.baidu.com/geoconv/v1/?coords=${bd_lng},${bd_lat}&from=5&to=3&ak=pRBZCNZQMdpAMff2HGB5mIUsATZGSc1o`
        )

        let coordinate = [convertAPI.data.result[0].x,convertAPI.data.result[0].y];
        pair.coordinates.push(coordinate);

        dict[address] = coordinate

        fs.writeFileSync("recordRaw_baidu.json", JSON.stringify(raw));
        fs.writeFileSync("recordPair.json", JSON.stringify(pair));
        fs.writeFileSync("recordDict.json", JSON.stringify(dict));

        console.log(`Fetched: ${address}:[${coordinate}]`)
        console.log(`---- Fetched ${totalFetched} | Skipped ${totalSkipped} | Error ${totalError}  ----`)

        totalFetched += 1
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

// not used
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02) 的转换
 * 即 百度 转 谷歌、高德
 * https://github.com/wandergis/coordtransform/blob/master/index.jss
 */
function bd09togcj02(bd_lng, bd_lat) {
  var bd_lng = +bd_lng;
  var bd_lat = +bd_lat;
  var x = bd_lng - 0.0065;
  var y = bd_lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
  var gg_lng = z * Math.cos(theta);
  var gg_lat = z * Math.sin(theta);
  return [gg_lng, gg_lat]
};
