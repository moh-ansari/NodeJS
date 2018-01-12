var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var userRoutes = require('./routes/user');
var userdataRoutes = require('./routes/userdata');
var formRoutes = require('./routes/form');
var numRoutes = require('./routes/num');

var app = express();
//mongoose.connect('localhost:27017/admin');
mongoose.connect('mongodb://root:root@ds251277.mlab.com:51277/project');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user',userRoutes );
app.use('/userdata', userdataRoutes);
app.use('/form', formRoutes);
app.use('/num', numRoutes);

module.exports = app;
