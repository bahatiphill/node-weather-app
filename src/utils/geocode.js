const request = require("request");

//console.log(require("dotenv").config({ debug: true }));
require("dotenv").config();
//console.log("test");
//console.log(test);
//console.log(process.env.DARKSKY_KEY);

//Mapbox key
const MAPBOX_KEY = process.env.MAPBOX_KEY;
//console.log(process.env);
console.log("token");
console.log(MAPBOX_KEY);
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=" +
    MAPBOX_KEY;

  request({ url, json: true }, (error, { body }) => {
    console.log(body);
    if (error) {
      callback("Unable to connect to Server API", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
