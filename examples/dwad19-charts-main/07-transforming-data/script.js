const options =  {
    chart: {
        type: 'line',
        height:"100%"
    },
    series:[
        
    ],
    noData: {
        "text": "Loading..."
    }
   
    
}
 
// create the chart
const chart = new ApexCharts(document.querySelector('#chart'), options);
 
// render the chart
chart.render()

window.addEventListener("DOMContentLoaded", async function(){
    const data = await loadData("https://raw.githubusercontent.com/kunxin-chor/sales-data/main/data/sales.json");
    const series = transformData(data);
    chart.updateSeries([
        {
            "name":"Revenue",
            "data": series
        }
    ])
})