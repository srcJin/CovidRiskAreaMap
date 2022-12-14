function drawLineChart() {
    const options = {
        chart: {
            type: 'line',
            height: '100%'
        },
        series:[
            {
                name: 'Sightings',
                data: sightings
            }
        ],
        xaxis:{
            categories: months
        }
    }
    const chartElement = document.querySelector("#line-chart")
    const chart = new ApexCharts(chartElement, options);
    chart.render();
}

function drawBarChart() {
    const options = {
        chart: {
            type: 'bar',
            height: '100%'
        },
        series:[
            {
                name: 'Sightings',
                data: sightings
            }
        ],
        xaxis:{
            categories: months
        }
    }
    const chartElement = document.querySelector("#bar-chart")
    const chart = new ApexCharts(chartElement, options);
    chart.render();
}
