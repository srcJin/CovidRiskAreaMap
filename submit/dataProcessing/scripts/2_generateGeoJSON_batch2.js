const fs = require("fs");

function generateGeoJSON2(filename, riskLevel) {
  // read the raw file
  let rawdata = fs.readFileSync(filename);
  let content = JSON.parse(rawdata);
  // console.log("content", content);
  // console.log("content.data.mcount", content.data.mcount);

  // start a loop to iterate all objects
  for (object in content) {

    // Create a GeoJSON FeatureCollection with the feature
    let geoJSONData = {
      type: "FeatureCollection",
      features: [],
    };

    contentToday = content[object];

    date = "20" + contentToday.end_update_time;
    console.log("date=", date);

    // read the risk area list
    if (riskLevel == "h") {
      targetList = contentToday.hlist;
    } else if (riskLevel == "m") {
      targetList = contentToday.mlist;
    }

    console.log(targetList);

    // iterate through each community and save to geoJSONData
    for (let record in targetList) {
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
      community = targetList[record].community;
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
          info: "",
        },
      });
    }
    console.log("geoJSONData=", geoJSONData);

    // start to write geoJSON
    fs.writeFile(
      date + "_" + riskLevel + ".geojson",
      JSON.stringify(geoJSONData),
      (err) => {
        if (err) {
          throw err;
        }
        console.log(`${date}_${riskLevel}.geojson is saved.`);
      }
    );
  }
}

generateGeoJSON2("./data2/history_mod2-formatted.json", "h");
generateGeoJSON2("./data2/history_mod2-formatted.json", "m");
