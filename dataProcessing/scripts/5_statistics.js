const fs = require("fs");
const { resourceLimits } = require("worker_threads");

totalError = 0;

let result = {
    "date": [],
    "province": {
      "anhui": { "high": [], "middle": [] },
      "beijing": { "high": [], "middle": [] },
      "chongqing": { "high": [], "middle": [] },
      "fujian": { "high": [], "middle": [] },
      "gansu": { "high": [], "middle": [] },
      "guangdong": { "high": [], "middle": [] },
      "guangxi": { "high": [], "middle": [] },
      "guizhou": { "high": [], "middle": [] },
      "hainan": { "high": [], "middle": [] },
      "hebei": { "high": [], "middle": [] },
      "heilongjiang": { "high": [], "middle": [] },
      "henan": { "high": [], "middle": [] },
      "hongkong": { "high": [], "middle": [] },
      "hubei": { "high": [], "middle": [] },
      "hunan": { "high": [], "middle": [] },
      "innermongolia": { "high": [], "middle": [] },
      "jiangsu": { "high": [], "middle": [] },
      "jiangxi": { "high": [], "middle": [] },
      "jilin": { "high": [], "middle": [] },
      "liaoning": { "high": [], "middle": [] },
      "macau": { "high": [], "middle": [] },
      "ningxia": { "high": [], "middle": [] },
      "qinghai": { "high": [], "middle": [] },
      "shaanxi": { "high": [], "middle": [] },
      "shandong": { "high": [], "middle": [] },
      "shanghai": { "high": [], "middle": [] },
      "shanxi": { "high": [], "middle": [] },
      "sichuan": { "high": [], "middle": [] },
      "taiwan": { "high": [], "middle": [] },
      "tianjin": { "high": [], "middle": [] },
      "tibet": { "high": [], "middle": [] },
      "xinjiang": { "high": [], "middle": [] },
      "yunnan": { "high": [], "middle": [] },
      "zhejiang": { "high": [], "middle": [] },
    },
    "total": {
      "high": [],
      "middle": [],
    },
  };

function statistics(filename) {
  // load one date, one risk level

  let rawdata = fs.readFileSync(filename);
  let content = JSON.parse(rawdata);

  let date = filename.slice(8, 16);
  console.log("date = ", date);

  let riskLevel = filename.slice(17, 18);
  console.log("riskLevel = ", riskLevel);

  let anhui = 0;
  let beijing = 0;
  let chongqing = 0;
  let fujian = 0;
  let gansu = 0;
  let guangdong = 0;
  let guangxi = 0;
  let guizhou = 0;
  let hainan = 0;
  let hebei = 0;
  let heilongjiang = 0;
  let henan = 0;
  let hongkong = 0;
  let hubei = 0;
  let hunan = 0;
  let innermongolia = 0;
  let jiangsu = 0;
  let jiangxi = 0;
  let jilin = 0;
  let liaoning = 0;
  let macau = 0;
  let ningxia = 0;
  let qinghai = 0;
  let shaanxi = 0;
  let shandong = 0;
  let shanghai = 0;
  let shanxi = 0;
  let sichuan = 0;
  let taiwan = 0;
  let tianjin = 0;
  let tibet = 0;
  let xinjiang = 0;
  let yunnan = 0;
  let zhejiang = 0;

  for (let object of content.features) {
    province = object.properties.province.slice(0, 2);
    // console.log("province = ", province);

    switch (province) {
      case "安徽":
        // console.log("Anhui");
        anhui += 1;
        break;
      case "北京":
        // console.log("Beijing");
        beijing += 1;
        break;
      case "重庆":
        // console.log("Chongqing");
        chongqing += 1;
        break;
      case "福建":
        // console.log("Fujian");
        fujian += 1;
        break;
      case "甘肃":
        // console.log("Gansu");
        gansu += 1;
        break;
      case "广东":
        // console.log("Guangdong");
        guangdong += 1;
        break;
      case "广西":
        // console.log("Guangxi");
        guangxi += 1;
        break;
      case "贵州":
        // console.log("Guizhou");
        guizhou += 1;
        break;
      case "海南":
        // console.log("Hainan");
        hainan += 1;
        break;
      case "河北":
        // console.log("Hebei");
        hebei += 1;
        break;
      case "黑龙":
        // console.log("Heilongjiang");
        heilongjiang += 1;
        break;
      case "河南":
        // console.log("Henan");
        henan += 1;
        break;
      case "香港":
        // console.log("Hong Kong");
        hongkong += 1;
        break;
      case "湖北":
        // console.log("Hubei");
        hubei += 1;
        break;
      case "湖南":
        // console.log("Hunan");
        hunan += 1;
        break;
      case "内蒙":
        // console.log("Inner Mongolia");
        innermongolia += 1;
        break;
      case "江苏":
        // console.log("Jiangsu");
        jiangsu += 1;
        break;
      case "江西":
        // console.log("Jiangxi");
        jiangxi += 1;
        break;
      case "吉林":
        // console.log("Jilin");
        jilin += 1;
        break;
      case "辽宁":
        // console.log("Liaoning");
        liaoning += 1;
        break;
      case "澳门":
        // console.log("Macau");
        macau += 1;
        break;
      case "宁夏":
        // console.log("Ningxia");
        ningxia += 1;
        break;
      case "青海":
        // console.log("Qinghai");
        qinghai += 1;
        break;
      case "陕西":
        // console.log("Shaanxi");
        shaanxi += 1;
        break;
      case "山东":
        // console.log("Shandong");
        shandong += 1;
        break;
      case "上海":
        // console.log("Shanghai");
        shanghai += 1;
        break;
      case "山西":
        // console.log("Shanxi");
        shanxi += 1;
        break;
      case "四川":
        // console.log("Sichuan");
        sichuan += 1;
        break;
      case "台湾":
        // console.log("Taiwan");
        taiwan += 1;
        break;
      case "天津":
        // console.log("Tianjin");
        tianjin += 1;
        break;
      case "西藏":
        // console.log("Tibet");
        tibet += 1;
        break;
      case "新疆":
        // console.log("Xinjiang");
        xinjiang += 1;
        break;
      case "云南":
        // console.log("Yunnan");
        yunnan += 1;
        break;
      case "浙江":
        // console.log("Zhejiang");
        zhejiang += 1;
        break;
      default:
        console.log("Province not found");
    }
  } // loop through object over
  // write to file

  total =
    anhui +
    beijing +
    chongqing +
    fujian +
    gansu +
    guangdong +
    guangxi +
    guizhou +
    hainan +
    heilongjiang +
    hebei +
    henan +
    hongkong +
    hubei +
    hunan +
    innermongolia +
    jiangsu +
    jiangxi +
    jilin +
    liaoning +
    macau +
    ningxia +
    qinghai +
    shaanxi +
    shandong +
    shanghai +
    shanxi +
    sichuan +
    taiwan +
    tianjin +
    tibet +
    xinjiang +
    yunnan +
    zhejiang;

  console.log("Total = ", total);
  console.log("xinjiang = ", xinjiang);
  console.log("beijing = ", beijing);

  
  if (riskLevel == "h") {
    result.date.push(date)
    result.province.anhui.high.push(anhui);
    result.province.beijing.high.push(beijing);
    result.province.chongqing.high.push(chongqing);
    result.province.fujian.high.push(fujian);
    result.province.gansu.high.push(gansu);
    result.province.guangdong.high.push(guangdong);
    result.province.guangxi.high.push(guangxi);
    result.province.guizhou.high.push(guizhou);
    result.province.hainan.high.push(hainan);
    result.province.heilongjiang.high.push(heilongjiang);
    result.province.hebei.high.push(hebei);
    result.province.henan.high.push(henan);
    result.province.hongkong.high.push(hongkong);
    result.province.hubei.high.push(hubei);
    result.province.hunan.high.push(hunan);
    result.province.innermongolia.high.push(innermongolia);
    result.province.jiangsu.high.push(jiangsu);
    result.province.jiangxi.high.push(jiangxi);
    result.province.jilin.high.push(jilin);
    result.province.liaoning.high.push(liaoning);
    result.province.macau.high.push(macau);
    result.province.ningxia.high.push(ningxia);
    result.province.qinghai.high.push(qinghai);
    result.province.shaanxi.high.push(shaanxi);
    result.province.shandong.high.push(shandong);
    result.province.shanghai.high.push(shanghai);
    result.province.shanxi.high.push(shanxi);
    result.province.sichuan.high.push(sichuan);
    result.province.taiwan.high.push(taiwan);
    result.province.tianjin.high.push(tianjin);
    result.province.tibet.high.push(tibet);
    result.province.xinjiang.high.push(xinjiang);
    result.province.yunnan.high.push(yunnan);
    result.province.zhejiang.high.push(zhejiang);
    result.total.high.push(total)
  } 

  if (riskLevel == "m") {
    result.province.anhui.middle.push(anhui);
    result.province.beijing.middle.push(beijing);
    result.province.chongqing.middle.push(chongqing);
    result.province.fujian.middle.push(fujian);
    result.province.gansu.middle.push(gansu);
    result.province.guangdong.middle.push(guangdong);
    result.province.guangxi.middle.push(guangxi);
    result.province.guizhou.middle.push(guizhou);
    result.province.hainan.middle.push(hainan);
    result.province.heilongjiang.middle.push(heilongjiang);
    result.province.hebei.middle.push(hebei);
    result.province.henan.middle.push(henan);
    result.province.hongkong.middle.push(hongkong);
    result.province.hubei.middle.push(hubei);
    result.province.hunan.middle.push(hunan);
    result.province.innermongolia.middle.push(innermongolia);
    result.province.jiangsu.middle.push(jiangsu);
    result.province.jiangxi.middle.push(jiangxi);
    result.province.jilin.middle.push(jilin);
    result.province.liaoning.middle.push(liaoning);
    result.province.macau.middle.push(macau);
    result.province.ningxia.middle.push(ningxia);
    result.province.qinghai.middle.push(qinghai);
    result.province.shaanxi.middle.push(shaanxi);
    result.province.shandong.middle.push(shandong);
    result.province.shanghai.middle.push(shanghai);
    result.province.shanxi.middle.push(shanxi);
    result.province.sichuan.middle.push(sichuan);
    result.province.taiwan.middle.push(taiwan);
    result.province.tianjin.middle.push(tianjin);
    result.province.tibet.middle.push(tibet);
    result.province.xinjiang.middle.push(xinjiang);
    result.province.yunnan.middle.push(yunnan);
    result.province.zhejiang.middle.push(zhejiang);
    result.total.middle.push(total)
  } 

  console.log("result=",result)
  fs.writeFileSync("statistics.json", JSON.stringify(result));


}



// loop through all the file name in the data folder
function generate() {
  fs.readdir("geojson", (err, filenames) => {
    if (err) {
      console.error(err);
      return;
    }

    filenames.forEach((filename) => {
      console.log(`-----------now processing:${filename}-----------`);
      //   console.log(`------------------------------------------------`);
      statistics("geojson/" + filename);
    });
  });
}

// processGeoJSON("./sample3/20220701_h.geojson");
generate();
