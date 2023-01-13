var slide = document.getElementById("mySlider");

animate = function (input) {
  slide.value = input
  day.innerHTML = slide.value;
  date.innerHTML = dayToDate(slide.value)[1];
  let newDate = dayToDate(parseInt(slide.value))[0]
  // console.log("date=",newDate)
  plotRiskPoints(newDate)
  plotCase(newDate)
  pushEventsToHTML(newDate)
}

let interval
let i
// setInterval ref https://www.w3schools.com/jsref/met_win_setinterval.asp
function startAnimation() {
  // Set up the animation
  i = slide.value
  interval = setInterval(function () {
    // Output the current number
    // console.log("i=",i);
    animate(i)
    i++;
    // End the animation after 10 iterations
    if (i > 892) {
      clearInterval(interval);
    }
  }, 100);}

function pauseAnimation() {
  clearInterval(interval)
}