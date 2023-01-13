const fs = require("fs");

let rawStatisticsData = fs.readFileSync("statistics.json")
let rawProvinceData = fs.readFileSync("chinaprovince.geojson")
let rawConfirmedData = fs.readFileSync("./cases/confirmed.json")
let rawDeathsData = fs.readFileSync("./cases/deaths.json")
let rawRecoveredData = fs.readFileSync("./cases/recovered.json")

let stat = JSON.parse(rawStatisticsData);
let provinceData = JSON.parse(rawProvinceData);
let confirmed =  JSON.parse(rawConfirmedData);
let deaths =  JSON.parse(rawDeathsData);
let recovered =  JSON.parse(rawRecoveredData);



// console.log(stat)
// console.log(provinceData.features[1])
// console.log("confirmed", confirmed);

for (let i in stat.date) {
    date = stat.date[i]
    console.log("date=", date)

    for (let feature of provinceData.features) {
        // console.log("j=", j );
        let province = feature.properties.name.slice(0, 2)

        // console.log("province = ", province)

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


        // console.log("province = ", province);

        function writeProperties(key) {
            feature.properties.nameeng = "An Hui"
            feature.properties.date = date
            feature.properties.timestamp = yyyymmddToTimestamp(date)
            feature.properties.high = stat.province[key].high[i]
            feature.properties.middle = stat.province[key].middle[i]
            let recoveredNum = 0
            let deathsNum = 0
            let confirmedNum = 0
            if (recovered[key][yyyymmddToTimestamp(date)] == undefined) {
                recoveredNum = 0
            } else {
                recoveredNum = recovered[key][yyyymmddToTimestamp(date)]
            }
            if (deaths[key][yyyymmddToTimestamp(date)] == undefined) {
                deathsNum = 0
            } else {
                deathsNum = deaths[key][yyyymmddToTimestamp(date)]
            }
            if (confirmed[key][yyyymmddToTimestamp(date)] == undefined) {
                confirmedNum = 0
            } else {
                confirmedNum = confirmed[key][yyyymmddToTimestamp(date)]
            }

            feature.properties.recovered = recoveredNum
            feature.properties.deaths = deathsNum
            feature.properties.confirmed = confirmedNum
            // console.log("feature=",feature)
        }


        switch (province) {
            case "安徽":
                // console.log("Anhui");
                key = "anhui"
                writeProperties(key)
                break;
            case "北京":
                // console.log("Beijing");
                key = "beijing"
                feature.properties.nameeng = "Bei Jing"
                writeProperties(key)
                beijing += 1;
                break;
            case "重庆":
                key = "chongqing"

                // console.log("Chongqing");
                feature.properties.nameeng = "Chong Qing"
                writeProperties(key)

                chongqing += 1;
                break;
            case "福建":
                key = "fujian"
                feature.properties.nameeng = "Fu Jian"
                writeProperties(key)

                // console.log("Fujian");
                fujian += 1;
                break;
            case "甘肃":
                key = "gansu"
                writeProperties(key)

                feature.properties.nameeng = "Gan Su"

                // console.log("Gansu");
                gansu += 1;
                break;
            case "广东":
                key = "guangdong"
                writeProperties(key)

                feature.properties.nameeng = "Guang Dong"

                // console.log("Guangdong");
                guangdong += 1;
                break;
            case "广西":
                key = "guangxi"
                writeProperties(key)

                feature.properties.nameeng = "Guang Xi"

                // console.log("Guangxi");
                guangxi += 1;
                break;
            case "贵州":
                key = "guizhou"
                writeProperties(key)

                feature.properties.nameeng = "Gui Zhou"
                // console.log("Guizhou");
                guizhou += 1;
                break;
            case "海南":
                key = "hainan"
                writeProperties(key)

                feature.properties.nameeng = "Hai Nan"

                // console.log("Hainan");
                hainan += 1;
                break;
            case "河北":
                key = "hebei"
                writeProperties(key)

                feature.properties.nameeng = "He Bei"

                // console.log("Hebei");
                hebei += 1;
                break;
            case "黑龙":
                key = "heilongjiang"
                writeProperties(key)

                feature.properties.nameeng = "Hei Long Jiang"
                // console.log("Heilongjiang");
                heilongjiang += 1;
                break;
            case "河南":
                key = "henan"
                writeProperties(key)

                feature.properties.nameeng = "He Nan"

                // console.log("Henan");
                henan += 1;
                break;
            case "香港":
                key = "hongkong"
                writeProperties(key)

                feature.properties.nameeng = "Hong Kong"

                // console.log("Hong Kong");
                hongkong += 1;
                break;
            case "湖北":
                key = "hubei"
                writeProperties(key)

                feature.properties.nameeng = "Hu Bei"

                // console.log("Hubei");
                hubei += 1;
                break;
            case "湖南":
                key = "hunan"
                writeProperties(key)

                feature.properties.nameeng = "Hu Nan"

                // console.log("Hunan");
                hunan += 1;
                break;
            case "内蒙":
                key = "innermongolia"
                writeProperties(key)

                feature.properties.nameeng = "Inner Mongolia"

                // console.log("Inner Mongolia");
                innermongolia += 1;
                break;
            case "江苏":
                key = "jiangsu"
                writeProperties(key)

                feature.properties.nameeng = "Jiang Su"

                // console.log("Jiangsu");
                jiangsu += 1;
                break;
            case "江西":
                key = "jiangxi"
                writeProperties(key)

                feature.properties.nameeng = "Jiang Xi"

                // console.log("Jiangxi");
                jiangxi += 1;
                break;
            case "吉林":
                key = "jilin"
                writeProperties(key)

                feature.properties.nameeng = "Ji Lin"

                // console.log("Jilin");
                jilin += 1;
                break;
            case "辽宁":
                key = "liaoning"
                writeProperties(key)

                feature.properties.nameeng = "Liao Ning"

                // console.log("Liaoning");
                liaoning += 1;
                break;
            case "澳门":
                key = "macau"
                writeProperties(key)

                feature.properties.nameeng = "Macau"

                // console.log("Macau");
                macau += 1;
                break;
            case "宁夏":
                key = "ningxia"
                writeProperties(key)

                feature.properties.nameeng = "Ning Xia"

                // console.log("Ningxia");
                ningxia += 1;
                break;
            case "青海":
                key = "qinghai"
                writeProperties(key)

                feature.properties.nameeng = "Qing Hai"

                // console.log("Qinghai");
                qinghai += 1;
                break;
            case "陕西":
                key = "shanxi"
                writeProperties(key)

                feature.properties.nameeng = "Shaan Xi"

                // console.log("Shaanxi");
                shaanxi += 1;
                break;
            case "山东":
                key = "shandong"
                writeProperties(key)

                feature.properties.nameeng = "Shan Dong"

                // console.log("Shandong");
                shandong += 1;
                break;
            case "上海":
                key = "shanghai"
                writeProperties(key)

                feature.properties.nameeng = "Shang Hai"

                // console.log("Shanghai");
                shanghai += 1;
                break;
            case "山西":
                key = "shanxi"
                writeProperties(key)

                feature.properties.nameeng = "Shan Xi"

                // console.log("Shanxi");
                shanxi += 1;
                break;
            case "四川":
                key = "sichuan"
                writeProperties(key)

                feature.properties.nameeng = "Si Chuan"

                // console.log("Sichuan");
                sichuan += 1;
                break;
            case "台湾":
                key = "taiwan"
                feature.properties.nameeng = "An Hui"
                feature.properties.date = date
                feature.properties.timestamp = yyyymmddToTimestamp(date)
                feature.properties.high = stat.province[key].high[i]
                feature.properties.middle = stat.province[key].middle[i]
                let recoveredNum = 0
                let deathsNum = 0
                let confirmedNum = 0
                feature.properties.recovered = recoveredNum
                feature.properties.deaths = deathsNum
                feature.properties.confirmed = confirmedNum
                feature.properties.nameeng = "Tai Wan"

                // console.log("Taiwan");
                taiwan += 1;
                break;
            case "天津":
                key = "tianjin"
                writeProperties(key)

                feature.properties.nameeng = "Tian Jin"

                // console.log("Tianjin");
                tianjin += 1;
                break;
            case "西藏":
                key = "tibet"
                writeProperties(key)

                feature.properties.nameeng = "Tibet"

                // console.log("Tibet");
                tibet += 1;
                break;
            case "新疆":
                key = "xinjiang"
                writeProperties(key)

                feature.properties.nameeng = "Xin Jiang"

                // console.log("Xinjiang");
                xinjiang += 1;
                break;
            case "云南":
                key = "yunnan"
                writeProperties(key)

                feature.properties.nameeng = "Yun Nan"

                // console.log("Yunnan");
                yunnan += 1;
                break;
            case "浙江":
                key = "zhejiang"
                writeProperties(key)

                feature.properties.nameeng = "Zhe Jiang"

                // console.log("Zhejiang");
                zhejiang += 1;
                break;
            default:
                console.log("Province not found");
        }
    } // loop through object over
    // write to file
    fs.writeFileSync("./province-processed/"+ date +".geojson", JSON.stringify(provinceData));


}







function yyyymmddToTimestamp(date) {
    // Convert the date to the YYYY-MM-DD format
    const formattedDate = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8);
  
    // Parse the date string and return the timestamp in milliseconds
    return Date.parse(formattedDate);
  }