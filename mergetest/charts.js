// var data = generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
//     min: 30,
//     max: 90
//   });

// console.log("data=",data)

//   var chart1 = new ApexCharts(document.querySelector("#chart-area"), options1);

async function loadData() {
  console.log("loadData() for charts")
  axios({
  method: "GET",
  url: "./data/statistics_preprocessed.json",
}).then(function (response) {
  // console.log(response.data)
  chart2.updateSeries([
    {
      name: "High Risk Areas",
      data: response.data.HighRiskAreas,
    },
    {
      name: "Middle Risk Areas",
      data: response.data.MiddleRiskAreas,
    },
  ]);

  chart1.updateSeries([
    { name: "AnHui", data: response.data.AnHui },
    { name: "BeiJing", data: response.data.BeiJing },
    { name: "ChongQing", data: response.data.ChongQing },
    { name: "FuJian", data: response.data.FuJian },
    { name: "GanSu", data: response.data.GanSu },
    { name: "GuangDong", data: response.data.GuangDong },
    { name: "GuangXi", data: response.data.GuangXi },
    { name: "GuiZhou", data: response.data.GuiZhou },
    { name: "HaiNan", data: response.data.HaiNan },
    { name: "HeBei", data: response.data.HeBei },
    { name: "HeiLongJiang", data: response.data.HeiLongJiang },
    { name: "HeNan", data: response.data.HeNan },
    { name: "HongKong", data: response.data.HongKong },
    { name: "HuBei", data: response.data.HuBei },
    { name: "HuNan", data: response.data.HuNan },
    { name: "InnerMongolia", data: response.data.InnerMongolia},
    { name: "JiangSu", data: response.data.JiangSu },
    { name: "JiangXi", data: response.data.JiangXi },
    { name: "JiLin", data: response.data.JiLin },
    { name: "LiaoNing", data: response.data.LiaoNing },
    { name: "Macau", data: response.data.Macau },
    { name: "NingXia", data: response.data.NingXia },
    { name: "QingHai", data: response.data.QingHai },
    { name: "ShanXi", data: response.data.ShanXi },
    { name: "ShanDong", data: response.data.ShanDong },
    { name: "ShangHai", data: response.data.ShangHai },
    { name: "ShanXi", data: response.data.ShanXi },
    { name: "SiChuan", data: response.data.SiChuan },
    { name: "Taiwan", data: response.data.Taiwan },
    { name: "TianJin", data: response.data.TianJin },
    { name: "Tibet", data: response.data.Tibet },
    { name: "XinJiang", data: response.data.XinJiang },
    { name: "YunNan", data: response.data.YunNan },
    { name: "ZheJiang", data: response.data.ZheJiang },
  ]);

  let hiddenSeries = [
    "AnHui",
    "ChongQing",
    "FuJian",
    "GanSu",
    "GuangXi",
    "GuiZhou",
    "HaiNan",
    "HeBei",
    "HeiLongJiang",
    "HeNan",
    "HongKong",
    "HuBei",
    "HuNan",
    "InnerMongolia",
    "JiangSu",
    "JiangXi",
    "JiLin",
    "LiaoNing",
    "Macau",
    "NingXia",
    "QingHai",
    "ShanXi",
    "ShanDong",
    "ShanXi",
    "SiChuan",
    "Taiwan",
    "TianJin",
    "Tibet",
    "XinJiang",
    "YunNan",
    "ZheJiang",
  ];

  let showSeries = ["BeiJing","ShangHai","GuangDong","HongKong"];

  for (series of hiddenSeries) {
    chart1.hideSeries(series);
  }

  // console.log(response.data.ZheJiang);
  // console.log(response.data.new_confirmed);

  chart3.updateSeries([
    // { name: "New Recovered", data: response.data.recovered },
    { name: "New Deaths", data: response.data.deaths },
    { name: "New Confirmed", data: response.data.confirmed },
  ]);
});

let options1 = {
  series: [],

  chart: {
    id: "chart2",
    type: "area",
    height: 350,
    stacked: true,
    toolbar: {
      autoSelected: "pan",
      show: true,
    },
    events: {
      selection: function (chart, e) {
        console.log(new Date(e.xaxis.min));
      },
    },
  },
  colors: ["#008FFB", "#00E396", "#CED4DC"],

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.6,
      opacityTo: 0.8,
    },
  },
  legend: {
    position: "bottom",
    horizontalAlign: "center",
  },
  xaxis: {
    type: "datetime",
  },
  noData: {
    text: "Loading...",
  },
};

let options2 = {
  chart: {
    id: "chart1",
    height: 300,
    type: "area",
    foreColor: "#ccc",
    stacked: true,
    brush: {
      targets: ["chart2","chart3"],
      enabled: true,
    },
    selection: {
      enabled: true,
      fill: {
        color: "#fff",
        opacity: 0.4,
      },
      xaxis: {
        min: new Date("27 Jul 2020 10:00:00").getTime(),
        max: new Date("25 Dec 2022 10:00:00").getTime(),
      },
    },
  },
  colors: ["#008FFB", "#00E396"],
  series: [],
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.5,
      opacityTo: 0.0,
    },
  },
  stroke: {
    width: 2,
  },
  grid: {
    borderColor: "#444",
  },
  markers: {
    size: 0,
  },
  xaxis: {
    type: "datetime",
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    tickAmount: 4,
  },
  noData: {
    text: "Loading...",
  },
};

let options3 = {
  series: [],

  chart: {
    id: "chart3",
    type: "area",
    height: 350,
    stacked: true,
    toolbar: {
      autoSelected: "pan",
      show: true,
    },
    events: {
      selection: function (chart, e) {
        console.log(new Date(e.xaxis.min));
      },
    },
  },
  colors: ["#008FFB", "#00E396"],

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.6,
      opacityTo: 0.8,
    },
  },
  legend: {
    position: "bottom",
    horizontalAlign: "center",
  },
  xaxis: {
    type: "datetime",
  },
  noData: {
    text: "Loading...",
  },
};

var chart1 = new ApexCharts(
  document.querySelector("#chart-province"),
  options1
);
var chart2 = new ApexCharts(document.querySelector("#chart-bar"), options2);
var chart3 = new ApexCharts(document.querySelector("#chart-cases"), options3);

chart1.render();
chart2.render();
chart3.render();

}

let isChartLoaded = false

// start to load data only when the user scroll to statistics class
if (!isChartLoaded) {
window.addEventListener('scroll', function() {
  var scrollDistance = window.pageYOffset;
  var element = document.querySelector('#statistics');
  // console.log("element=",element);
  if (scrollDistance > element.offsetTop-500) {
    loadData()
    isChartLoaded = true
  }
}
);
}


function generateDayWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
}

function yyyymmddToTimestamp(date) {
  // Convert the date to the YYYY-MM-DD format
  const formattedDate =
    date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);

  // Parse the date string and return the timestamp in milliseconds
  return Date.parse(formattedDate);
}
