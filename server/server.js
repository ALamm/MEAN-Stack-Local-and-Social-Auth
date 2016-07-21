// dependencies
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var moment = require('moment');
moment().format();
require('dotenv').config();
var port = process.env.PORT || 8080;

// DB configuration
var configDB = require('./config/database.js');
mongoose.connect(configDB.url, function(err, data) {
    if (err) {
        console.log('error connecting to db');
    } else {
        console.log("*** connected to database ***");
    }
});

// create instance of express
var app = express();

// require routes
var routes = require('./routes/api.js');

// static routes - before express-session 
// if you add the session middleware before your static directory, Express will generate sessions for requests on static files
// Simply put your static files first, or better yet on a CDN that has nothing to do with your Node.js app and your session collection should stay much healthier
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname + '/../server')));

// define middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// routes       - for all routes that use /user/
app.use('/', routes);

// error hndlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message,
        error: {}
    }));
});

// launch server   ===========================================================
app.listen(port, function() {
    //and... we're live
    console.log('Server connected to port: ' + port + '  at:  ' + moment().format("YYYY-MM-DD h:mm:ss a"));
});