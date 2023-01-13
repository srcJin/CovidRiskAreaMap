const fs = require('fs');
const createCsvParser = require('csv-parser');

// Create a new parser
const parser = createCsvParser();

// Create an object to store the sums for each date
let sums = {};

// Read the CSV file and sum the values for each date
fs.createReadStream('case.csv')
  .pipe(parser)
  .on('data', (row) => {
    // Convert the date string to a JavaScript Date object
    const date = new Date(row.date);
    // Format the date as a string in the YYYY-MM-DD format
    // console.log(date)
    const dateStr = date.getTime();

    // Initialize the sums for this date if necessary
    if (!sums[dateStr]) {
      sums[dateStr] = {
        new_asymptomatic: 0,
        new_confirmed: 0,
      };
    }

    // Add the values for this row to the sums for this date
    sums[dateStr].new_asymptomatic += parseInt(row.new_asymptomatic);
    sums[dateStr].new_confirmed += parseInt(row.new_confirmed);
  })
  .on('end', () => {
    // The CSV file has been fully parsed
    // console.log(sums);
    
    result = {
      new_asymptomatic:[],
      new_confirmed:[]
    }

    for (object in sums){
      // console.log(object)

      result.new_asymptomatic.push([parseInt(object), sums[object].new_asymptomatic])
      result.new_confirmed.push([parseInt(object), sums[object].new_confirmed])

    }

    console.log(result)
     fs.writeFileSync("case.json", JSON.stringify(result));

  });