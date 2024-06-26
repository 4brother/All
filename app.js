var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var upLoadFile = require('./routes/upLoadFile');
var login = require('./routes/login');
var app = express();
var session = require('express-session');
app.use(session({
  secret: '12345',
  name: 'testapp',  
  cookie: {maxAge: 3600000 },  
  resave: false,
  saveUninitialized: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//使用ejs文件
app.set('view engine', 'ejs');
//使用html文件
// app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
// app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//允许访问公共文件
app.use('/public',express.static('public'));
app.use(function (req,res,next) {
  // console.log(req.session)
  // // 当前路径 没有参数
  // console.log(req.path)
  // // 当前路径 有参数
  // console.log(req.originalUrl)
  // // 当前路径有参数
  // console.log(req.url)
  if((!req.session.ID || !req.session.name)&&req.originalUrl!='/login'){
    return res.redirect('../login');
  }
  next();
})
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/file', upLoadFile);
app.use('/login', login);


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
  res.render('error',{ip: req.ip,url: req.protocol +'://'+ req.hostname + req.originalUrl});
});

module.exports = app;
