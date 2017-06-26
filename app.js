var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require("fs");

var index = require('./routes/index');
var users = require('./routes/users');
var toons = require('./routes/toons');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.route('/toons/new')
    .post(function(req, res) {
      console.log('processing form for new toon: ' + req);

          var max = 0;
          var test_toon =
              {
                  "name" : "test",
                  "class" : "NPC",
                  "spec" : "ordinary",
                  "id": 4
              };

          console.log(test_toon);
          var new_toons = [];

          // First read existing users.
          fs.readFile("toons.json", 'utf8', function (err, data) {
              var toons = JSON.parse( data );

              toons.push(test_toon);
              console.log( toons );
              new_toons = toons;
              //res.send( JSON.stringify(toons));
          });


    });
app.use('/', index);
app.use('/users', users);
app.use('/toons', toons);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
