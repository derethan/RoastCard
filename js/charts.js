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

        // Function to update the chart Data
        function  updateChartData (){
            let logData = getLogData('roastChartLog');
            let time = [];
            let temperature = [];
            let notes = [];

            console.log(logData);

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

    // Event listener for the update button
    document.getElementById('updateChartButton').addEventListener('click', updateChartData);
});


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