var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email : {type:String, require:true},
    username: {type:String, require:true},
    password:{type:String, require:true},
    creation_dt:{type:Date, require:true}
})

module.exports = mongoose.model('User', userSchema);