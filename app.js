var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var userdataRoutes = require('./routes/userdata');
var userlikesRoutes = require('./routes/userlikes');

var app = express();
//mongoose.connect('localhost:27017/admin');
mongoose.connect('mongodb://root:root@ds251277.mlab.com:51277/project');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/userdata', userdataRoutes);
app.use('/userlikes', userlikesRoutes);

module.exports = app;
