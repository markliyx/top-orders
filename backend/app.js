var cors = require('cors');
var mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var ordersRouter = require('./routes/orders');

var app = express();

// set up mongoose ODM
mongoose.connect('mongodb://localhost:27017/topOrders', {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.once('open', function () {
  console.log('Successfully connected to Top Orders database server')
})

db.on('error', function (err) {
  console.log('Failed to connect to Top Orders database server');
  console.log('Error: ', err.name);
  console.log('Message: ', err.message);
  process.exit(1);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// allow origin access
const allowedOrigins = ['http://localhost:3000'];

app.use(logger('dev'));
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/orders', ordersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
