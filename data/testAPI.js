let addressList = ["北京市朝阳区阜通东大街", "北京市海淀区学院路1号"];

// Method 1 : using HTTPS

// const https = require("https");

// https://restapi.amap.com/v3/geocode/geo?address=北京市朝阳区阜通东大街6号&output=JSON&key=63445beea63ec64452a205ae10914e16

// function geocode(address) {
//   // Make the API call to the geocoding service
//     https
//       .get(
//         `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(
//           address
//         )}&output=JSON&key=63445beea63ec64452a205ae10914e16`,
//         (res) => {
//           let data = "";

//           res.on("data", (chunk) => {
//             data += chunk;
//           });

//           res.on("end", () => {
//             console.log(JSON.parse(data));
//           });
//         }
//       )
//       .on("error", (err) => {
//         console.log(`Error: ${err.message}`);
//       });
//   }

// function geocodeWithDelay(address) {
//   geocode(address);

//   // Pause for 1 second before next API call
//   setTimeout(() => {
//     geocode(address);
//   }, 1000);
// }

// geocodeWithDelay(addressList);

// Method 2 : using Axios


const axios = require("axios");
const fs = require("fs");

async function geocodeAxios(address) {
  try {

    const response = await axios.get(
      `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(
        address
      )}&output=JSON&key=63445beea63ec64452a205ae10914e16`
    );
    console.log(response.data);

    // how to use the data
    
    const data = fs.readFileSync("recordRaw.json");
    let results = JSON.parse(data);
    
    results.records.push(response.data)
    fs.writeFileSync("recordRaw.json", JSON.stringify(results));

    return results
    
  } catch (error) {
    console.error(error);
  }
}

// when using async function
// await before the async function
// await the promise

function geocodeAxiosDelay(addressList) {
  for (let address of addressList) {
    // Pause for 1 second before next API call
    setTimeout(async () => {
      console.log("geocodeAxios(address)",await geocodeAxios(address));
    }, 2000);
  }
}

geocodeAxiosDelay(addressList);
