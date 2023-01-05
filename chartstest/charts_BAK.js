// var data = generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
//     min: 30,
//     max: 90
//   });
  
// console.log("data=",data)




//   var chart1 = new ApexCharts(document.querySelector("#chart-area"), options1);
  
axios({
    method: 'GET',
    url: "statistics.json",
  }).then(function(response) {

    // console.log(response.data)
    let totalHighList = []
    let totalMiddleList = []
    let totalList = []
    let anhui = [];
    let beijing = [];
    let chongqing = [];
    let fujian = [];
    let gansu = [];
    let guangdong = [];
    let guangxi = [];
    let guizhou = [];
    let hainan = [];
    let hebei = [];
    let heilongjiang = [];
    let henan = [];
    let hongkong = [];
    let hubei = [];
    let hunan = [];
    let innermongolia = [];
    let jiangsu = [];
    let jiangxi = [];
    let jilin = [];
    let liaoning = [];
    let macau = [];
    let ningxia = [];
    let qinghai = [];
    let shaanxi = [];
    let shandong = [];
    let shanghai = [];
    let shanxi = [];
    let sichuan = [];
    let taiwan = [];
    let tianjin = [];
    let tibet = [];
    let xinjiang = [];
    let yunnan = [];
    let zhejiang = [];
    let timestamp
    for (let i in response.data.date) {
        timestamp = yyyymmddToTimestamp(response.data.date[i]);
        totalHighList.push([timestamp,response.data.total.high[i]]);
        totalMiddleList.push([timestamp,response.data.total.middle[i]])
        // totalList.push([timestamp,response.data.total.high[i]+response.data.total.middle[i]])
        anhui.push([timestamp,response.data.province.anhui.middle[i]+response.data.province.anhui.high[i]])
        beijing.push([timestamp,response.data.province.beijing.middle[i]+response.data.province.beijing.high[i]])
        chongqing.push([timestamp,response.data.province.chongqing.middle[i]+response.data.province.chongqing.high[i]])
        fujian.push([timestamp,response.data.province.fujian.middle[i]+response.data.province.fujian.high[i]])
        guangdong.push([timestamp,response.data.province.guangdong.middle[i]+response.data.province.guangdong.high[i]])
        guangxi.push([timestamp,response.data.province.guangxi.middle[i]+response.data.province.guangxi.high[i]])
        guizhou.push([timestamp,response.data.province.guizhou.middle[i]+response.data.province.guizhou.high[i]])
        hainan.push([timestamp,response.data.province.hainan.middle[i]+response.data.province.hainan.high[i]])
        heilongjiang.push([timestamp,response.data.province.heilongjiang.middle[i]+response.data.province.heilongjiang.high[i]])
        henan.push([timestamp,response.data.province.henan.middle[i]+response.data.province.henan.high[i]])
        hongkong.push([timestamp,response.data.province.hongkong.middle[i]+response.data.province.hongkong.high[i]])
        hubei.push([timestamp,response.data.province.hubei.middle[i]+response.data.province.hubei.high[i]])
        hunan.push([timestamp,response.data.province.hunan.middle[i]+response.data.province.hunan.high[i]])
        innermongolia.push([timestamp,response.data.province.innermongolia.middle[i]+response.data.province.innermongolia.high[i]])
        jiangsu.push([timestamp,response.data.province.jiangsu.middle[i]+response.data.province.jiangsu.high[i]])
        jiangxi.push([timestamp,response.data.province.jiangxi.middle[i]+response.data.province.jiangxi.high[i]])
        jilin.push([timestamp,response.data.province.jilin.middle[i]+response.data.province.jilin.high[i]])
        liaoning.push([timestamp,response.data.province.liaoning.middle[i]+response.data.province.liaoning.high[i]])
        ningxia.push([timestamp,response.data.province.ningxia.middle[i]+response.data.province.ningxia.high[i]])
        qinghai.push([timestamp,response.data.province.qinghai.middle[i]+response.data.province.qinghai.high[i]])
        shaanxi.push([timestamp,response.data.province.shaanxi.middle[i]+response.data.province.shaanxi.high[i]])
        shandong.push([timestamp,response.data.province.shandong.middle[i]+response.data.province.shandong.high[i]])
        shanghai.push([timestamp,response.data.province.shanghai.middle[i]+response.data.province.shanghai.high[i]])
        shanxi.push([timestamp,response.data.province.shanxi.middle[i]+response.data.province.shanxi.high[i]])
        sichuan.push([timestamp,response.data.province.sichuan.middle[i]+response.data.province.sichuan.high[i]])
        taiwan.push([timestamp,response.data.province.taiwan.middle[i]+response.data.province.taiwan.high[i]])
        tianjin.push([timestamp,response.data.province.tianjin.middle[i]+response.data.province.tianjin.high[i]])  
        tibet.push([timestamp,response.data.province.tibet.middle[i]+response.data.province.tibet.high[i]])
        xinjiang.push([timestamp,response.data.province.xinjiang.middle[i]+response.data.province.xinjiang.high[i]])  
        yunnan.push([timestamp,response.data.province.yunnan.middle[i]+response.data.province.yunnan.high[i]])
        zhejiang.push([timestamp,response.data.province.zhejiang.middle[i]+response.data.province.zhejiang.high[i]])          
    }
    // console.log("totalHighList" , totalHighList)
    // console.log("anhui",anhui)
    chart2.updateSeries([{
        name: 'High Risk Areas',
        data: totalHighList
      },
      {
        name: 'Middle Risk Areas',
        data: totalMiddleList
      }])

    chart1.updateSeries([
        {name: 'AnHui',data: anhui},
        {name: 'BeiJing',data: beijing},
        {name: 'ChongQing',data: chongqing},
        {name: 'FuJian',data: fujian},
        {name: 'GanSu',data: gansu},
        {name: 'GuangDong',data: guangdong},
        {name: 'GuangXi',data: guangxi},
        {name: 'GuiZhou',data: guizhou},
        {name: 'HaiNan',data: hainan},
        {name: 'HeBei',data: hebei},
        {name: 'HeiLongJiang',data: heilongjiang},
        {name: 'HeNan',data: henan},
        {name: 'Hong Kong',data: hongkong},
        {name: 'HuBei',data: hubei},
        {name: 'HuNan',data: hunan},
        {name: 'Inner Mongolia',data: innermongolia},
        {name: 'Jiang Su',data: jiangsu},
        {name: 'Jiang Xi',data: jiangxi},
        {name: 'Ji Lin',data: jilin},
        {name: 'Liao Ning',data: liaoning},
        {name: 'Macau',data: macau},
        {name: 'NingXia',data: ningxia},
        {name: 'QingHai',data: qinghai},
        {name: 'ShanXi',data: shaanxi},
        {name: 'ShanDong',data: shandong},
        {name: 'ShangHai',data: shanghai},
        {name: 'ShanXi',data: shanxi},
        {name: 'SiChuan',data: sichuan},
        {name: 'Taiwan',data: taiwan},
        {name: 'TianJin',data: tianjin},
        {name: 'Tibet',data: tibet},
        {name: 'XinJiang',data: xinjiang},
        {name: 'YunNan',data: yunnan},
        {name: 'ZheJiang',data: zhejiang},

])

  })
  

  
  
  let options1 = {
    series: [
    ],
    
    chart: {
      id: "chart2",
      type: "area",
      height: 350,
      stacked: true,
      toolbar: {
        autoSelected: "pan",
        show: true
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
      width: 2
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
        text: 'Loading...'
      }
  };

//   let options3 = {
//     series: [
//     ],
    
//     chart: {
//       id: "chart3",
//       type: "area",
//       height: 350,
//       stacked: true,
//       toolbar: {
//         autoSelected: "pan",
//         show: true
//       },
//       events: {
//         selection: function (chart, e) {
//           console.log(new Date(e.xaxis.min));
//         },
//       },
//     },
//     colors: ["#008FFB", "#00E396", "#CED4DC"],
    
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       curve: "smooth",
//       width: 2
//     },
//     fill: {
//       type: "gradient",
//       gradient: {
//         opacityFrom: 0.6,
//         opacityTo: 0.8,
//       },
//     },
//     legend: {
//       position: "bottom",
//       horizontalAlign: "center",
//     },
//     xaxis: {
//       type: "datetime",
//     },
//     noData: {
//         text: 'Loading...'
//       }
//   };

  let options2 = {
    chart: {
      id: "chart1",
      height: 300,
      type: "area",
      foreColor: "#ccc",
      stacked: true,
      brush: {
        target: "chart2",
        enabled: true
      },
      selection: {
        enabled: true,
        fill: {
          color: "#fff",
          opacity: 0.4
        },
        xaxis: {
          min: new Date("27 Jul 2017 10:00:00").getTime(),
          max: new Date("14 Aug 2017 10:00:00").getTime()
        }
      }
    },
    colors: ["#008FFB", "#00E396"],
    series: [
    ],
    fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.5,
          opacityTo: 0.0,
        }
      },
    stroke: {
      width: 2
    },
    grid: {
      borderColor: "#444"
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: "datetime",
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      tickAmount: 4
    },
    noData: {
        text: 'Loading...'
      }
  };
  

var chart1 = new ApexCharts(document.querySelector("#chart-province"), options1);
// var chart3 = new ApexCharts(document.querySelector("#chart-middle"), options3);
var chart2 = new ApexCharts(document.querySelector("#chart-bar"), options2);

chart1.render();
chart2.render();
// chart3.render();


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
    const formattedDate = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8);
  
    // Parse the date string and return the timestamp in milliseconds
    return Date.parse(formattedDate);
  }
  