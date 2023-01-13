var slide = document.getElementById("mySlider");

var day = document.getElementById("day");
day.innerHTML = slide.value;

var date = document.getElementById("date");
// console.log(date);
date.innerHTML = dayToDate(slide.value-1)[1];

// method 1: oninput, this one refreshes every action
slide.oninput = function () {
  day.innerHTML = this.value;
  date.innerHTML = dayToDate(this.value)[1];
  newDate = dayToDate(parseInt(this.value))[0]
  // console.log("date=",newDate)
  plotRiskPoints(newDate)  // in map.js
  plotCase(newDate)   // in charts.js
  pushEventsToHTML(newDate)
}

// method 2: event listener, this one only refreshes when the action ended
// slide.addEventListener("change",(evt) => {
//   // get the value
//   // get date
//   // pass date to function (axios => get the file with the correct date)
//   // plot
//   console.log(slide.value)

//   // 2) plot new layer
//   plotRiskPoints(dayToDate(882+parseInt(slide.value))[0])
//   // console.log("882+slide.value=",882+parseInt(slide.value))
//   // get file using slide.value
//   // plot new layer
//   // add to map

// })

// convert number into date
// ref1 : https://codechi.com/dev-tools/date-to-millisecond-calculators/
// ref2 : https://currentmillis.com/
// ref3 : https://linuxhint.com/convert-numbers-dates-javascript/#:~:text=To%20convert%20a%20number%20into,into%20date%20format%20in%20JavaScript.
// this funciton assume the date is counted from 2020/01/01 00:00:00, GMT +8
// in milliseconds is 1577808000000

function dayToDate(offset) {
  // console.log("offset=",offset)

  // let startDate = 1577808000000  // 2020/01/01 00:00:00
  const startDate = new Date(2020, 7, 28, 12);
  // const startDate = new Date(1595980800000); // 2020/07/28 00:00:00 GMT
  // console.log(startDate);


  let newTimestamp = startDate.setDate(offset-1) // temporary fix is to -1

  let newTime = new Date(newTimestamp)

  // Convert Time to Date String
  formatDate = formatDate(newTime)

  // console.log("formatDate=", formatDate)
  return formatDate

  function formatDate(date) {
    // Extract the year, month, and day components from the date object
    // ref .padStart() : https://www.w3schools.com/js/tryit.asp?filename=tryjs_string_padding1
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');

    return [`${year}${month}${day}`, `${year}-${month}-${day}`];
  }
}


async function pushEventsToHTML(date) {
  // console.log("pushEvents",date);
  try {
    const response = await axios.get('data/events.json');
    // console.log("response.data",response.data);
    // Display the event in the HTML class "event"
    let eventCNObj = document.getElementById("eventCN");
    let eventENObj = document.getElementById("eventEN");
    eventCNObj.innerHTML = response.data[date].eventCN;
    eventENObj.innerHTML = response.data[date].eventEN;

  } catch (error) {
    console.error(error);
  }
}

