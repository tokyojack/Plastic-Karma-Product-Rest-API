// TODO error catching for wrong args

// Packages
var express = require("express");
var app = express();

var bodyParser = require("body-parser");

// Mongo

var mongoose = require('mongoose');
mongoose.connect( require('./config.js').mongodb);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Successfully joined");
});

// use 

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// routes

// Product
app.use("/product/add", require("./routes/products/add-product-routes")());
app.use("/product/find", require("./routes/products/find-product-routes")());
app.use("/product/products", require("./routes/products/products-routes")());

// Transaction
app.use("/transaction/add", require("./routes/transaction/add-transaction-routes")());
app.use("/transaction/find", require("./routes/transaction/find-transaction-routes")());

// Misc
app.use("/", require("./routes/index-routes.js")());
app.use("*", require("./routes/misc-routes")());

// server
// app.listen(8082, function () {
//     console.log("Server running");
// });
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Hosting on " + process.env.PORT + ":" + process.env.IP);
});