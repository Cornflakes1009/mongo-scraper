var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose"); 
var request = require("request"); 
var cheerio = require("cheerio"); 

var db = require("./models");

// port configuration for local/Heroku
var PORT = process.env.PORT || process.argv[2] || 8080;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

var router = require("./controllers/routes.js");
app.use(router);

// create db and connect
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});