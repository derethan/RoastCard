/********************************************************************************
 *  Source: ../JS/charts.js
 * 
 *        Controls the HighChart Data
 *          - Creates the Chart
 *          - updateChartData function updates the chart with the data from the table
 *          - getLogData function gets the data from the table and stores it in an object
 *          - updateTime function updates the time values in the table
*********************************************************************************/

document.addEventListener('DOMContentLoaded', function () {

    // Highcharts configuration
    Highcharts.chart('chart-container', {
        chart: {
            type: 'line',
            backgroundColor: '#f5e6ca' 
        },
        title: {
            text: 'Roast Chart',
            style: {
                color: '#6f4e37',
                fontWeight: 'bold'
            }
        },
        xAxis: {
            title: {
                text: 'Time (Seconds)',
                style: {
                    color: '#2c1e12',
                    fontWeight: 'bold'
                }
            },
            categories: []
        },
        yAxis: {
            title: {
                text: 'Temperature (°F)',
                style: {
                    color: '#2c1e12',
                    fontWeight: 'bold'
                }
            }
        },
        accessibility: {
            enabled: false
        },
        series: [{
            name: 'Temperature',
            color: '#2c1e12',
            data: []
        },]
    });

    // Event listener for the update button
    document.getElementById('updateChartButton').addEventListener('click', updateChartData);
}); // End of DOMContentLoaded event listener


/********************************************************************************
*             Functions to Update Chart with Data from Table
*********************************************************************************/
function  updateChartData (){

    // Update the time values in the table
    updateTime('roastChartLog');
    
    let logData = getLogData('roastChartLog');
    let time = [];
    let temperature = [];
    let notes = [];

    //Get the time and temperature data from the logData object
    for (let i = 0; i < logData.length; i++) {
        time.push(logData[i].time);
        temperature.push(+logData[i].temperature);
        notes.push(logData[i].notes);
    }

    //Update the chart with the new data
    Highcharts.chart('chart-container', {
        chart: {
            type: 'line',
            backgroundColor: '#f5e6ca'
        },
        title: {
            text: 'Roast Chart',
            style: {
                color: '#6f4e37',
                fontWeight: 'bold'
            }
        },
        xAxis: {
            title: {
                text: 'Time (Seconds)',
                style: {
                    color: '#2c1e12',
                    fontWeight: 'bold'
                }
            },
            categories: time
        },
        yAxis: {
            title: {
                text: 'Temperature (°F)',
                style: {
                    color: '#2c1e12',
                    fontWeight: 'bold'
                }
            }
        },
        accessibility: {
            enabled: false
        },
        series: [{
            name: 'Temperature',
            data: temperature,
            color: '#2c1e12',
        },
        {
            name: 'Notes',
            data: temperature,
            color: '#2c1e12',
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return notes [this.point.index];
                },
                style: {
                    color: '#2c1e12',
                    fontWeight: 'bold',
                    textOutline: 'none'
                }
            } 
        }
    ],
    });
} // End of updateChartData function



/********************************************************************************
*             Functions to get Data from Table
*********************************************************************************/
function getLogData (tableName) {
    let table = document.getElementById(tableName);

    //create an object to store the log data
    let logData = [];

    let numberOfDataPoints = document.getElementById(tableName).rows.length;

    if (numberOfDataPoints != 0) {
        for (let i = 1; i < numberOfDataPoints; i++) {
            
            //Get the time and temperature data from the table
            let time = table.rows[i].cells[0].firstChild.innerHTML;
            let temperature = table.rows[i].cells[1].firstChild.value;
            let notes = table.rows[i].cells[2].firstChild.value;

            //create and object to store the data
            let data = {
                time: time,
                temperature: temperature,
                notes: notes
            }

            //Add the data to the logData object
            logData.push(data);
        }
    }
    return logData;
}


/********************************************************************************
*             Functions to Update Time Values in Table based on Time Interval
*********************************************************************************/
function updateTime (tableName) {
    let table = document.getElementById(tableName);
    const timeInterval = parseInt(document.getElementById('timeInterval').value);
    let newTime = 0;
  
    //for each row in the first column, update the time
    for (let i=1; i < table.rows.length; i++) {
      
        //convert the time value to minutes and seconds
        let minutes = Math.floor(newTime / 60);
        let seconds = newTime % 60;
  
        //convert the minutes and seconds to a string
        minutes = minutes.toString();
        seconds = seconds.toString();
  
        //add a 0 to the front of the seconds if it is less then 10
        if (seconds.length === 1) {
          seconds = '0' + seconds;
        }
  
        //update the time value in the table
          const time = document.createElement('h3');
          time.innerHTML = minutes + ':' + seconds;
          table.rows[i].cells[0].innerHTML = time.outerHTML;
  
        //Update the newTime variable
        newTime += timeInterval;
    }
  }