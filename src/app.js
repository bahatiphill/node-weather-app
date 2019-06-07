const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// port to run on
const port = process.env.PORT || 3000;

//Define Paths (views and public) for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views and partials location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather App",
    name: "Mk"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mk"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    message: "This is the message paragraph",
    name: "Mk"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "provide an address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
  // res.send({
  //   forecat: "it is snowing",
  //   location: "philadelphia",
  //   address: req.query.address
  // });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help article not found"
  });
});

//Page not found
app.get("*", (req, res) => {
  res.render("404", { error: "404 page not found" });
});

app.listen(port, () => {
  console.log("Server is up and running on port" + port);
});
