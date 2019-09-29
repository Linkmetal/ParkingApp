
/** ---------------------------------------------------
Variables
---------------------------------------------------- */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
// var monk = require('monk');
var mongoose = require('mongoose');

var cors = require('cors');
// var db = monk(config.database);

// Mongoose startup
var db;
mongoose.connect(config.database, {user:config.dbUser, pass: config.dbPass}).then(() => {
  db = mongoose.connection
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
});


var app = express();
/** ---------------------------------------------------
Config
---------------------------------------------------- */

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors({
//     origin: true,
//     credentials: true
// }));

app.use(function (req, res, next) {
  req.db = db; // makes db accesible
  var allowedOrigins = ['http://localhost:4200', 'http://localhost:3000', 'http://localhost:8100'];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,X-Requested-With,content-type,Origin,x-jwt-token,form-data');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/** ---------------------------------------------------
Catch 404 and forward to error handler when endpoint
does not exist.
---------------------------------------------------- */
// app.use(function (req, res, next) {
//     res.status(404).send("Invalid endpoint");
//   });
  
  /** ---------------------------------------------------
  Error handler
  ---------------------------------------------------- */
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
  });

/** ---------------------------------------------------
Https
---------------------------------------------------- */
//var fs = require('fs');
//var https = require('https');
//var privateKey = fs.readFileSync(config.privatekeypath, 'utf8');
//var certificate = fs.readFileSync(config.certpath, 'utf8');
//var credentials = { key: privateKey, cert: certificate };
//var httpsServer = https.createServer(credentials, app);



/** ---------------------------------------------------
Setting routes
---------------------------------------------------- */

var users = require('./routes/user.route');
var locations = require('./routes/location.route');

app.use('/api/users', users);
app.use('/api/locations', locations);


/** ---------------------------------------------------
Server init
---------------------------------------------------- */

module.exports = app;
app.listen(3000, '0.0.0.0', () => {
  console.log("Listening");
});
