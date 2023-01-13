
const fs = require("fs");

function generateGeoJSON(filename, riskLevel) {
  // read the raw file
  let rawdata = fs.readFileSync(filename);
  let content = JSON.parse(rawdata);
  // console.log("content", content);
  // console.log("content.data.mcount", content.data.mcount);

  // Create a GeoJSON FeatureCollection with the feature
  let geoJSONData = {
    type: "FeatureCollection",
    features: [],
  };

  // read the risk area list
  if (riskLevel == "h") {
    targetList = content.data.highlist;
  } else if (riskLevel == "m") {
    targetList = content.data.middlelist;
  }

  // iterate through each community and save to geoJSONData
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


      geoJSONData.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [],
        },
        properties: {
          province: province,
          city: city,
          county: county,
          community: community,
          full_address: full_address,
          info: ""
        },
      });
    }
  }

  // start to write geoJSON
  fs.writeFile(
    filename.substring(0, 13) + "_" + riskLevel + ".geojson",
    JSON.stringify(geoJSONData),
    (err) => {
      if (err) {
        throw err;
      }
      console.log(`${filename}_${riskLevel}.geojson is saved.`);
    }
  );

}



// loop through all the file name in the data folder
function generate() {
fs.readdir('data', (err, filenames) => {
    if (err) {
      console.error(err);
      return;
    }
  
    filenames.forEach(filename => {
      console.log("now processing:", filename);
      generateGeoJSON("data/"+ filename, "h")
      generateGeoJSON("data/"+ filename, "m")

    });
  });
}

generate()