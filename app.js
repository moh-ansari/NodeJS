var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var userlikesRoutes = require('./routes/userlikes');

var app = express();
//mongoose.connect('localhost:27017/admin');
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/userlikes', userlikesRoutes);

module.exports = app;
