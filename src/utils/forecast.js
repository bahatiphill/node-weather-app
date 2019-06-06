const request = require("request");

//console.log(require("dotenv").config({ debug: true }));
require("dotenv").config();
//console.log("test");
//console.log(test);
//console.log(process.env.DARKSKY_KEY);

//darksky api_key
const DARKSKY_KEY = process.env.DARKSKY_KEY;

const forecast = (lat, lon, callback) => {
  const url =
    "https://api.darksky.net/forecast/" + DARKSKY_KEY + "/" + lat + "," + lon;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      //console.log("Unable to connect to weather server");
      callback("Unable to connect to the Darksky server", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = forecast;
