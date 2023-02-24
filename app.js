var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var apiRouter = require('./routes/api');

var app = express();

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  return res.status(err.status || 500).json({ message: 'error' });
});

module.exports = app;
