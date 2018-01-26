var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//ROUTE FILES
var database = require('./routes/database');
var mens = require('./routes/mens')
var womens = require('./routes/womens')
var goggles = require('./routes/goggles')



var app = express();

// Database connection
const monk = require('monk');
const url = 'localhost/vivid';
const db = monk(url);

db.then(() => {
  console.log('Connected correctly to server')
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// ROUTES
app.use('/database', database);
app.use('/mens', mens);
app.use('/womens', womens);
app.use('/goggles', goggles);



app.get('/', (req, res) => {
  res.send('working')
})




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;