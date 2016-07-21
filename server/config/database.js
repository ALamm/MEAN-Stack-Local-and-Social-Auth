// config/database.js
require('dotenv').config();

var user = process.env.user;
var password = process.env.password;

module.exports = {
    'url': 'mongodb://' + user + ':' + password + '@ds011732.mlab.com:11732/pinterest-clone'
};