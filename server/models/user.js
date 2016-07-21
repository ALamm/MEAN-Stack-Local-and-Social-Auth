var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


// create User Schema
var User = new Schema({
  // for socail oauth authentication
  name: String,
  someID: String,
  // for local authentication
  username: String,
  password: String,
  //settings
  first: String,
  last: String,
  city: String,
  state: String
});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('users', User);
