/* Bootstrap 5 JS included */
/* vanillajs-datepicker 1.1.4 JS included */

// API document: https://mymth.github.io/vanillajs-datepicker/#/api?id=datepickerpickerelement

const getDatePickerTitle = elem => {
  // From the label or the aria-label
  const label = elem.nextElementSibling;
  let titleText = '';
  if (label && label.tagName === 'LABEL') {
    titleText = label.textContent;
  } else {
    titleText = elem.getAttribute('aria-label') || '';
  }

  return titleText;
}

let elems = document.querySelectorAll('.datepicker_input');
for (const elem of elems) {
  const datepicker = new Datepicker(elem, {
    'format': 'yyyy-mm-dd', // CN format
    // title: getDatePickerTitle(elem),
    maxDate: new Date("2022-12-24"),
    minDate: new Date("2020-07-29"),
    defaultViewDate: new Date("2021-03-25"),
    todayBtn: false,
    clearBtn: false,
  });

}

function getSelectedDate() {
  let timestampString = elems[0].datepicker.dates;
  if (timestampString.length == 0) {
    console.log("date not selected")
    dateFeedback.innerHTML = "Date not selected"

  }
  else {
    timestamp = parseInt(timestampString) - 28800000 // convert the timestamp from GMT+8 to GMT
    plotRiskPoints(convertTimestampToYYYYMMDD(timestamp))
    plotCase(convertTimestampToYYYYMMDD(timestamp))


    console.log("timestamp = ", timestamp)
    let slide = document.getElementById("mySlider");

    slide.value = daysBetween(1595980800000,timestamp)
    console.log("slide.value" ,slide.value);
    var day = document.getElementById("day");
    day.innerHTML = slide.value;

    // provide a feedback for the users
    var date = document.getElementById("date");
    // console.log(date);
    date.innerHTML = dayToDate(slide.value)[1];
    let dateFeedback = document.getElementById("dateFeedback");
    dateFeedback.innerHTML = ""

  }
}





function convertTimestampToYYYYMMDD(timestamp) {
  var date = new Date(timestamp);
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // months are zero indexed
  var day = date.getDate();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  console.log(year + month + day)
  return year + month + day;
}

function daysBetween(timestamp1, timestamp2) {
  // get the number of milliseconds in each timestamp
  var oneDay = 1000 * 60 * 60 * 24;
  var date1 = new Date(timestamp1);
  var date2 = new Date(timestamp2);
  // convert the dates to the number of milliseconds since the Unix Epoch (January 1, 1970)
  var millis1 = date1.getTime();
  var millis2 = date2.getTime();
  // find the difference in milliseconds
  var millisDiff = millis2 - millis1;
  // convert the difference in milliseconds to days
  return Math.floor(millisDiff/oneDay);
}