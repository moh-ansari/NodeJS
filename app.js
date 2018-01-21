var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var userlikesRoutes = require('./routes/userlikes');
var namesRoutes = require('./routes/names');

var app = express();
//mongoose.connect('');
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/userlikes', userlikesRoutes);
app.use('/names', namesRoutes);

module.exports = app;
