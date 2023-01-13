const fs = require("fs");

totalError = 0

function processGeoJSON(filename) {
  // load existing address

  let recordDict = fs.readFileSync("recordDict.json");
  let dict = JSON.parse(recordDict);

  let rawdata = fs.readFileSync(filename);
  let content = JSON.parse(rawdata);

  // start a loop to iterate all objects
  // console.log("features=",content.features)
  for (index in content.features) {
    // Create a GeoJSON FeatureCollection with the feature
    address = content.features[index].properties.full_address;
    if (address in dict) {
      content.features[index].geometry.coordinates = dict[address];
      console.log("Address=", address);
      console.log("Coordinates=", content.features[index].geometry.coordinates);
    } else {
      content.features[index].geometry.coordinates = [0,0];
      totalError+=1
      console.log(`ERROR: No coordinate for ${address}, total Error ${totalError}`);

    }
  }
  // start to write geoJSON
  fs.writeFile(
    // change this line in the future if the length of the folder name changes!!!
    "geojson-0-processed/" + filename.substring(8, 20) + ".geojson",
    JSON.stringify(content),
    (err) => {
      if (err) {
        throw err;
      }
      console.log(`${filename.substring(8, 20)}_edit.geojson is saved.`);
    }
  );
}

// loop through all the file name in the data folder
function generate() {
  fs.readdir("geojson-0", (err, filenames) => {
    if (err) {
      console.error(err);
      return;
    }

    filenames.forEach((filename) => {
      console.log(`-----------now processing:${filename}-----------`);
      console.log(`------------------------------------------------`);
      processGeoJSON("geojson-0/" + filename);
    });
  });
}

// processGeoJSON("./sample3/20220701_h.geojson");
generate();
