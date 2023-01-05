const monthLabels =["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sept","Oct","Nov","Dec"];

async function loadData(url) {
    const response = await axios.get(url);
    return response.data;
}

// the data parameter (aka arugment)
// should be an array of sales record
function transformData(data) {
    // create a simplified data set
    // we're only interested in the year
    // and in the amount

    // How to use FOR loop to do MAPPING
    // let earnings = [];
    // for (let dataPoint of data) {
    //     earnings.push({
    //         "amount": dataPoint.payment.amount,
    //         // create a new date object instead of a date string
    //         "date": new Date(dataPoint.completed_at)
    //     });
    // }
    // Use the .map function that's available to all arrays
    const earnings = data.map(function(dataPoint){
        // whatever is returned from the mapping function
        // will go into the results array
        return {
            amount: dataPoint.payment.amount,
            date: new Date(dataPoint.completed_at)
        }
    })

    // FILTERING
    // Only keeping data points (or elements) that meets
    // a certain critera.
    // const shortlisted = [];
    // for (let dataPoint of earnings) {
    //     if (dataPoint.date.getFullYear() == 2020) {
    //         shortlisted.push(dataPoint);
    //     }
    // }
    // console.log("shortlisted=", shortlisted);
    const shortlisted = earnings.filter(function(dataPoint){
        if (dataPoint.date.getFullYear() == 2020) {
            return true;
        } else {
            return false;
        }
    })
    console.log(shortlisted);
    // GROUPING
    // We use an object with the keys representing the month numbers
    // each key  in the object store an array, so we going put all the transactons in the same
    // month into the array for that month
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
        "11": [],
    }

    for (let dataPoint of shortlisted) {
        const monthIndex = dataPoint.date.getMonth();
        months[monthIndex].push(dataPoint);
    }

    const series = [];
    // to go through an object one key at a time, use `for ... in`

    // the outer for loop go through one month at a time
    for (let monthKey in months) {
        const dataPoints = months[monthKey];
        let total = 0;
        // the inner for loop calculate the total of all the amount for one month (depending on the value of monthKey)
        for (let d of dataPoints) {
            total = total + d.amount;
        }
        series.push({
            x: monthLabels[monthKey],
            y: total/100
        })
    }

    console.log(series);
    return series;
}