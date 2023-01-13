const fs = require("fs");


let rawdata = fs.readFileSync("statistics.json")

let data = JSON.parse(rawdata);


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

for (let i in data.date) {
    timestamp = yyyymmddToTimestamp(data.date[i]);
    totalHighList.push([timestamp, data.total.high[i]]);
    totalMiddleList.push([timestamp, data.total.middle[i]])
    totalList.push([timestamp, data.total.high[i] + data.total.middle[i]])
    anhui.push([timestamp, data.province.anhui.middle[i] + data.province.anhui.high[i]])
    beijing.push([timestamp, data.province.beijing.middle[i] + data.province.beijing.high[i]])
    chongqing.push([timestamp, data.province.chongqing.middle[i] + data.province.chongqing.high[i]])
    fujian.push([timestamp, data.province.fujian.middle[i] + data.province.fujian.high[i]])
    guangdong.push([timestamp, data.province.guangdong.middle[i] + data.province.guangdong.high[i]])
    guangxi.push([timestamp, data.province.guangxi.middle[i] + data.province.guangxi.high[i]])
    guizhou.push([timestamp, data.province.guizhou.middle[i] + data.province.guizhou.high[i]])
    gansu.push([timestamp, data.province.gansu.middle[i] + data.province.gansu.high[i]])
    hainan.push([timestamp, data.province.hainan.middle[i] + data.province.hainan.high[i]])
    heilongjiang.push([timestamp, data.province.heilongjiang.middle[i] + data.province.heilongjiang.high[i]])
    henan.push([timestamp, data.province.henan.middle[i] + data.province.henan.high[i]])
    hongkong.push([timestamp, data.province.hongkong.middle[i] + data.province.hongkong.high[i]])
    hebei.push([timestamp, data.province.hebei.middle[i] + data.province.hebei.high[i]])
    hubei.push([timestamp, data.province.hubei.middle[i] + data.province.hubei.high[i]])
    hunan.push([timestamp, data.province.hunan.middle[i] + data.province.hunan.high[i]])
    macau.push([timestamp, data.province.macau.middle[i] + data.province.macau.high[i]])
    innermongolia.push([timestamp, data.province.innermongolia.middle[i] + data.province.innermongolia.high[i]])
    jiangsu.push([timestamp, data.province.jiangsu.middle[i] + data.province.jiangsu.high[i]])
    jiangxi.push([timestamp, data.province.jiangxi.middle[i] + data.province.jiangxi.high[i]])
    jilin.push([timestamp, data.province.jilin.middle[i] + data.province.jilin.high[i]])
    liaoning.push([timestamp, data.province.liaoning.middle[i] + data.province.liaoning.high[i]])
    ningxia.push([timestamp, data.province.ningxia.middle[i] + data.province.ningxia.high[i]])
    qinghai.push([timestamp, data.province.qinghai.middle[i] + data.province.qinghai.high[i]])
    shaanxi.push([timestamp, data.province.shaanxi.middle[i] + data.province.shaanxi.high[i]])
    shandong.push([timestamp, data.province.shandong.middle[i] + data.province.shandong.high[i]])
    shanghai.push([timestamp, data.province.shanghai.middle[i] + data.province.shanghai.high[i]])
    shanxi.push([timestamp, data.province.shanxi.middle[i] + data.province.shanxi.high[i]])
    sichuan.push([timestamp, data.province.sichuan.middle[i] + data.province.sichuan.high[i]])
    taiwan.push([timestamp, data.province.taiwan.middle[i] + data.province.taiwan.high[i]])
    tianjin.push([timestamp, data.province.tianjin.middle[i] + data.province.tianjin.high[i]])
    tibet.push([timestamp, data.province.tibet.middle[i] + data.province.tibet.high[i]])
    xinjiang.push([timestamp, data.province.xinjiang.middle[i] + data.province.xinjiang.high[i]])
    yunnan.push([timestamp, data.province.yunnan.middle[i] + data.province.yunnan.high[i]])
    zhejiang.push([timestamp, data.province.zhejiang.middle[i] + data.province.zhejiang.high[i]])
}

let result = {
    'HighRiskAreas': totalHighList,
    'MiddleRiskAreas': totalMiddleList,
    "Total": totalList,
    'AnHui': anhui,
    'BeiJing': beijing,
    'ChongQing': chongqing,
    'FuJian': fujian,
    'GanSu': gansu,
    'GuangDong': guangdong,
    'GuangXi': guangxi,
    'GuiZhou': guizhou,
    'HaiNan': hainan,
    'HeBei': hebei,
    'HeiLongJiang': heilongjiang,
    'HeNan': henan,
    'Hong Kong': hongkong,
    'HuBei': hubei,
    'HuNan': hunan,
    'Inner Mongolia': innermongolia,
    'Jiang Su': jiangsu,
    'Jiang Xi': jiangxi,
    'Ji Lin': jilin,
    'Liao Ning': liaoning,
    'Macau': macau,
    'NingXia': ningxia,
    'QingHai': qinghai,
    'ShanXi': shaanxi,
    'ShanDong': shandong,
    'ShangHai': shanghai,
    'ShanXi': shanxi,
    'SiChuan': sichuan,
    'Taiwan': taiwan,
    'TianJin': tianjin,
    'Tibet': tibet,
    'XinJiang': xinjiang,
    'YunNan': yunnan,
    'ZheJiang': zhejiang,
}

fs.writeFileSync("statistics_preprocessed.json", JSON.stringify(result));



function yyyymmddToTimestamp(date) {
    // Convert the date to the YYYY-MM-DD format
    const formattedDate = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8);
  
    // Parse the date string and return the timestamp in milliseconds
    return Date.parse(formattedDate);
  }
  