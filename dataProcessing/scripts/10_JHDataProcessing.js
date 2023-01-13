const fs = require("fs");
const csv = require("csv-parser");

// initialize an empty object to store the data
let data = {};
let results = [];
let output = {};
let forChart = {};
let forChartTotal = { list: [] };

// JSON data structure:
// output : {
//   "anhui" = {timestamp:growth,
//              timestamp:growth  }
//   }

// read in the CSV file
fs.createReadStream("./cases/time_series_covid19_total_china.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    // console.log(results);
    for (object of results) {
      let province = object["Province"].toLowerCase();
      output[province] = {};
      forChart[province] = [];
      let previous = 0;

      for (const [key, value] of Object.entries(object)) {
        // console.log("object[key]=", object[key]);
        if (object[key] == province) {
          //skip
        } else {
          // get timestamp
          // console.log("key=",key)
          let dateParts = key.split("/");
          // date format : '01/22/2020'
          // console.log(dateParts);
          // month is 0-based, so we need to subtract 1 from the month value
          // note: The Date object in JavaScript uses a two-digit year format, which means that the year value is interpreted as being in the range 1900-1999.
          // This means that the year 20 will be interpreted as 1920, and the year 21 will be interpreted as 1921, etc.
          // Normally it return local time zone, we need GMT time zone

          formattedDate =
            String(2000 + parseInt(dateParts[2])) +
            "-" +
            String(dateParts[0]) +
            "-" +
            String(dateParts[1]);

          // console.log(formattedDate)
          // let date = new Date(dateString);

          function addHours(date, hours) {
            // Make copy with "Date" constructor.
            const dateCopy = new Date(date);
            dateCopy.setHours(dateCopy.getHours() + hours);
            return dateCopy;
          }
          // process the hours to GMT 000
          let datePlus8Hours = addHours(Date.parse(formattedDate), 8);
          let timestamp = Date.parse(datePlus8Hours);

          // console.log("timestamp=",timestamp)
          growth = object[key] - previous;
          // growth = 1;
          // console.log("growth = ",growth)

          if (isNaN(growth)) {
            growth = 0;
          }

          if (isNaN(timestamp)) {
            // console.log("skip");
            // skip
          } else {
            // console.log("timestamp=", timestamp);
            output[province][String(timestamp)] = growth;
            forChart[province].push([timestamp, growth]);
            // if timestamp
            // forChartTotal.list.push([timestamp,growth])
            // insertArray = [timestamp,growth]
            let hasTimestamp = 0;

            for (i in forChartTotal.list) {
              if (forChartTotal.list[i][0] == timestamp) {
                hasTimestamp = 1;
                // console.log("hasTimestamp = 1");
              } else {
                hasTimestamp = 0;
                // console.log("hasTimestamp = 0");
              }
            }

            if (hasTimestamp == 1) {
              // console.log("hasTimestamp = 1, adding value");

              for (i in forChartTotal.list) {
                if (forChartTotal.list[i][0] == timestamp) {
                  forChartTotal.list[i][1] = forChartTotal.list[i][1] + growth;
                }
              }
            }

            if (hasTimestamp == 0) {
              // console.log("hasTimestamp = 0, adding to array");
              forChartTotal.list.push([timestamp, growth]);
            }
            // console.log("forChartTotal=", forChartTotal);
            // not solved
            // const result = forChartTotal.list.map((item) => {
            //   if (item[0] === insertArray[0]) {
            //     return [item[0], item[1] + insertArray[1]];
            //   }
            //   return item;
            // });

            // console.log("forChartTotal.list=",forChartTotal.list)

            // if (!forChartTotal.list[timestamp]) {
            //   forChartTotal.list[timestamp] = 0;
            // } else {
            //   forChartTotal.list[timestamp] += growth;
            // }
            // console.log("growth=", growth);
            // remember last number to calculate growth
            previous = object[key];
          }
        }
      }
      // console.log("output[province]=", output[province]);
    }

    // console.log(output);
    fs.writeFileSync("total.json", JSON.stringify(output));
    fs.writeFileSync("total_forChart.json", JSON.stringify(forChart));
    // fs.writeFileSync(
    //   "confirmed_forChartTotal.json",
    //   JSON.stringify(forChartTotal)
    // );
  });
