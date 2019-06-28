const request = require('request');

const geocode = (location, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYWlyYm9ybjEzZyIsImEiOiJjanY1cDF3NnkwMTg2M3lwb3hiazF0NGRvIn0.kj0XcuxPwuVMoSmrbU7CAQ `;

    request({ url, json: true }, (err, {body}) => {
            
        if (err) {
            callback("Unable to connect to map site", undefined);
        }
        else if (body.features.length == 0) {
            callback(undefined,"Unable to find your location, try another location");
        }
        else {
            
            callback(undefined,{
                 latitude: body.features[0].center[1],
                 longitude: body.features[0].center[0],
                 location:body.features[0].place_name
            })
        }
    });
    
};

//geocode function is calling callbackFunc with 2 arguments that received back on request. when the request is made either the error is returned or data is returned.
//geocode argument callbackFunc doesn't have parenthesis because it's not calling the function, it's just providing the argument.
//geocode function body callbackFunc has two arguments and parenthesis.
//any function can be passed to it which excepts two arguments.
//callbackFunc is defined below.


// geocode('Toronto',  (error, response) => {
//     callback('Error:', error);
//     callback('Data:', response);
// })

//geocode('Toronto', (x)=>{console.log(x)});

module.exports = geocode;