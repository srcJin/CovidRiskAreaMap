const fs = require('fs');

const startTimestamp = new Date('2019.12.31').getTime()+28800000;
const endTimestamp = new Date('2023.01.08').getTime()+28800000;

const timestamps = {};
// this use timestamps as key
// for (let timestamp = startTimestamp; timestamp <= endTimestamp; timestamp += 86400000) {
//   const date = new Date(timestamp);
//   const year = date.getFullYear();
//   const month = ('0' + (date.getMonth() + 1)).slice(-2);
//   const day = ('0' + date.getDate()).slice(-2);
//   timestamps[timestamp] = {
//     date: `${"20"+year.toString().slice(-2)}${month}${day}`,
//     event: ""
//   };
// }

// console.log(timestamps);


// this use YYYYMMDD as key

for (let timestamp = startTimestamp; timestamp <= endTimestamp; timestamp += 86400000) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const dateKey = `${year}${month}${day}`;
  timestamps[dateKey] = {
    eventCN:"",
    eventEN:""    
  };
}


fs.writeFileSync('timestamps.json', JSON.stringify(timestamps));