const request = require('request');

const forecast = (lat, long, callback) => {
    
    const url = `https://api.darksky.net/forecast/3993eddf4c16e3238a38d5b3623d2302/${lat},${long}?units=si`
debugger;
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback("Unable to contact weather service!", undefined);
        }else if (body.error) {
            callback('No such location found, please try another name', undefined);
        }else {
            callback(undefined,`Maximum temperature is around ${body.daily.data[0].temperatureMax} with minimum of ${body.daily.data[0].temperatureMin}. It is currently ${body.currently.temperature} degrees out. There is a
            ${body.currently.precipProbability}% chance of rain.`);
        }
    })
};

module.exports = forecast;

/*
forecast(0,44.1545, (error, response) => {
    console.log('Error:', error);
    console.log('Data:', response);
})
*/
