var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    age: {type: String}
});


module.exports = mongoose.model('Num', schema,'num');