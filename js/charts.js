document.addEventListener('DOMContentLoaded', function () {
    // Highcharts configuration
    Highcharts.chart('chart-container', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Roast Chart'
        },
        xAxis: {
            title: {
                text: 'Time (Seconds)'
            },
            categories: ['15', '30', '45', '60', '75', '90', '105', '120', '135', '150']
        },
        yAxis: {
            title: {
                text: 'Temperature (°F)'
            }
        },
        accessibility: {
            enabled: false
        },
        series: [{
            name: 'Temperature',
            data: [155, 160, 165, 170, 175, 180, 185, 190, 195, 200]
        },]
    });

    // Function to update the chart Data
    function  updateChartData (){
    let logData = getLogData('roastChartLog');
    let time = [];
    let temperature = [];

    console.log(logData);
    }

    // Event listener for the update button
    document.getElementById('updateChartButton').addEventListener('click', updateChartData);
});

function updateChart() {

    


    // //Get the time and temperature data from the logData object
    // for (let key in logData) {
    //     time.push(key);
    //     temperature.push(logData[key]);
    // }

    //Update the chart with the new data
    //  chart.xAxis[0].setCategories(time);

}

function getLogData (tableName) {
    let table = document.getElementById(tableName);

    //create an object to store the log data
    let logData = {};

    let numberOfDataPoints = getRowLength(tableName);

    if (numberOfDataPoints != 0) {
        for (let i = 1; i < numberOfDataPoints; i++) {
            
            //Get the time and temperature data from the table
            let time = table.rows[i].cells[0].firstChild.innerHTML;
            let temperature = table.rows[i].cells[1].firstChild.value;


            //Add the data to the logData object
            logData[time] = temperature;

            

        }
    }
    return logData;
}

function getRowLength (tableName) {
    let table = document.getElementById(tableName);
    let rowLength = table.rows.length;
    return rowLength;
}