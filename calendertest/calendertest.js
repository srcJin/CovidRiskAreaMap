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
    maxDate: new Date("2020-03-25"),
    minDate: new Date("2022-09-10"),
    defaultViewDate: new Date("2021-03-25"),
    todayBtn: false,
    clearBtn: false,
  });

}

