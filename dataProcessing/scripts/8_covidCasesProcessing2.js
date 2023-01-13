const fs = require('fs');
const csv = require('fast-csv');

const stream = fs.createReadStream("covid_accumulated_dateNeedFix_1.csv");

let dates = [];
let numbers1 = [];
let numbers2 = [];

csv.fromStream(stream, {headers: false})
  .on("data", data => {
    dates.push(data[0]);
    numbers1.push(data[1]);
    numbers2.push(data[2]);
  })
  .on("end", () => {
    // dates is an array of strings, such as ["1/22/20", "1/23/20", "1/24/20"]
    // numbers1 and numbers2 are arrays of numbers, such as [10, 20, 30] and [40, 50, 60]

    // Convert the dates to timestamps
    let timestamps = dates.map(date => {
      return new Date(date).getTime();
    });

    let growth1 = [];
    let growth2 = [];

    // Calculate the growth for each pair of dates
    for (let i = 1; i < timestamps.length; i++) {
      growth1.push((numbers1[i] - numbers1[i - 1]))
      growth2.push((numbers2[i] - numbers2[i - 1]))
    }

    // Create an object to store the data
    let data = {
      timestamps: timestamps,
      growth1: growth1,
      growth2: growth2
    };

    // Write the data to a JSON file
    fs.writeFile("result.json", JSON.stringify(data), err => {
      if (err) {
        console.error(err);
      } else {
        console.log("Data saved to result.json");
      }
    });
  });