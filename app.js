const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended :true}));

app.get("/", function(req, res) {

      res.sendFile(__dirname +"/index.html");

});

app.post("/", function (req ,res){
  const query = req.body.cityName;
  const apiKey = "e0568738f831180b43e6599b40cc6c7e";
  const aunits = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+aunits+"&appid=" +apiKey;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      res.write("<h1> Weather APP <h1>")
      res.write("<h1>The temperature in " +query+ " is " + temp + " degress Celcius.</h1>");
      res.write("<p>The weather is currently" + weatherDesc + ".<p>");
      const iconurl="https://openweathermap.org/img/wn/";
      res.write("<img src=" +iconurl + icon + ".png>")
    })
  })
})

app.listen(3000, function() {
  console.log("Server Started on Port 3000");
})
