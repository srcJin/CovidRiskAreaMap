// the chart options what kind of chart we are drawing
// the data and the properties of the chart
const options =  {
    chart: {
        type: 'line',
        height:"100%"
    },
    series:[
        // NO DATA
    ],
    // what to show there is no data
    noData: {
        "text": "Loading..."
    }
   
    
}
 
// create the chart
const chart = new ApexCharts(document.querySelector('#chart'), options);
 
// render the chart
chart.render()

// when all the content are ready
// the DOMContentLoaded for the window happens when
// the DOM elements have been created
window.addEventListener("DOMContentLoaded", async function(){
    // the loadData function is from data.js
    const data = await loadData();

    // display the loaded data as a series in the chart
    chart.updateSeries([{
        'name':'Sales',
        'data': data.yearly
    }])
})