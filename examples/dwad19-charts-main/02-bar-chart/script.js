// define a number of chart options
const options = {
    // the keys are fixed (to know what what are all the possible keys, check documentations)
    chart: {
        // type of the chart and the height:
        type:'bar',
        height:"100%"  // height if it is a percentage it will take proportioal to its parent's height  
    },
    // series represent the data for the chart
    series:[
        // each object in the array represent one series (i.e one line)
        {
            'name':'sightings',
            'data': [10, 13, 15, 22, 24, 28]
        },
        {
            'name':'temperature',
            'data':[31, 32, 27, 29, 28, 31]
        }
    ],
    xaxis:{
        categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    }
}

// create the chart
const chartElement = document.querySelector("#chart");
// create a new instance of ApexCharts (i.e create onew chart)
const chart = new ApexCharts(chartElement, options);
// we need to render the chart
chart.render();