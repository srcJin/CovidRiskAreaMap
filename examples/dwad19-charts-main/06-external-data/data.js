async function loadData() {
    // if we use a relative URL, axios will try
    // to look for the file in the same directory
    // as the data.js
    const response = await axios.get("https://raw.githubusercontent.com/apexcharts/apexcharts.js/master/db.json")
    // console.log(response.data);
    // response.data 才能返回值，而不是promise
    console.log(response)
    return response.data;
}

// the data parameter (aka argument) should be an array of sales record
function transformData(data){
    // create a simplified data set we're only interested in the year and in the amount
    let earningsFor = [];
    // data mapping
    // method 1: use for loop
    for (let dataPoint of data) {
        earningsFor.push({
            "amount": dataPoint.payment.amount,
            "date": new Date(dataPoint.completed_at)
        });
    }
    
    // method 2: .map()
    const earningsMap = data.map(function(dataPoint){
        // whatever is returned from the mapping function will go into the results array
        // here you can add if else, also you can do filter
        return {
            amount: dataPoint.payment.amount,
            data: new Date(dataPoint.completed_at)
        }
    })

    console.log(earningsFor);
    console.log(earningsMap);
    
    // filtering
    // only keeping data points(or elements) that meets the critera
    const shortlisted = []
    for (let dataPoint of earningsMap){
        if(dataPoint.date.getFullYear() == 2020){
            shortlisted.push(dataPoint);
        }
    }
    console.log("shortlisted=", shortlisted)

    const shortlisted = earningsMap.filter(function(dataPoint){
            if (dataPoint.date.getFullYear() == 2020){
                return true;
            } else {
                return false;
            }
        })
        console.log("shortlisted=",shortlisted)
    })

    // GROUPING
    // We use an object with the keys representing the month numbers
    // each key in the object store an array, so we going to put all the 
    // transactions in teh same month into the array for that month
    const months = {
        "0": [],
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7": [],
        "8": [],
        "9": [],
        "10": [],
        "11": []
    }
    // grouping
    for (let dataPoint of shortlisted) {
        const monthIndex = dataPoint.date.getMonth();
        month[monthIndex].push( dataPoint );
    }
    console.log(months);

    const series = []
    // to go through an object one key at a time, use for... in
    // for...of only works with array
    for (let monthKey in months){
        let dataPoints = months[monthKey];
    }


}