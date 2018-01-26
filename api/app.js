var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Seed data
const mensSeedData = require('./seed/mensSunglasses.json')
const womensSeedData = require('./seed/womensSunglasses.json')
const goggleSeedData = require('./seed/goggleSeedData.json')


// Database connection
const monk = require('monk');
const url = 'localhost/vivid';
const db = monk(url);

// Collections
const mens = db.get('mens')
const womens = db.get('womens')
const goggles = db.get('goggles')


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

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

app.use('/users', users);

app.get('/', (req, res) => {
  res.send('working')
})

// Seed database collections
app.get('/database/seed', (req, res) => {
  mens.drop()
    .then(() => womens.drop())
    .then(() => goggles.drop())
    .then(() => {
      goggles.insert(goggleSeedData)
      mens.insert(mensSeedData)
      womens.insert(womensSeedData)
    })
    .then(() => {
      res.send('seeded')
    })
})

app.get('/goggles', (req, res) => {
  goggles.find()
    .then(goggles => {
      res.json(goggles)
    })
})

app.get('/mens', (req, res) => {
  mens.find()
    .then(mens => {
      res.json(mens)
    })
})

app.get('/womens', (req, res) => {
  womens.find()
    .then(womens => {
      res.json(womens)
    })
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