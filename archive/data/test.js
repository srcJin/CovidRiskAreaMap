// Read local JSON file
const fs = require("fs");

let results;
let apiAddress;

if (fs.existsSync("geocodedRecord.json")) {
  // The file exists, so read its contents
  const data = fs.readFileSync("geocodedRecord.json");
  results = JSON.parse(data);
//   console.log("results=", results);
} else {
  // The file doesn't exist, so create an empty array
  console.log("geocodedRecord.json doesn't exist")
  results = {full_address:[],coordination:[]};
}

// get the api address
apiAddress = "上海市";

// Check if the fetched content is already in the results
console.log("results.full_address", results.full_address);
const foundResult = results.full_address.includes(apiAddress);
if (!foundResult) {
  // The fetched content is not in the results, so make a request to the API and add the result to the array
  console.log("!foundResult, do API geocoding");
  results.full_address.push("上海市");
  results.coordination.push(coordination);
  // save file
  fs.writeFileSync("results.json", JSON.stringify(results));
  console.log("new address saved")
    } else {
  console.log("found duplicated address, skip");
}
