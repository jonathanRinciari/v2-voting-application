const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    index = require('./routes/index'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    authRoutes = require('./routes/auth-routes'),
    passportSetup = require('./config/passport-setup');

require('dotenv').config();

const app = express();

//set up session
app.use(session({
	secret: 'the world is strange',
	resave: false,
	saveUninitialized: true
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set up database
var mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, {
  useMongoClient: true
})

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.currentUserName = req.user;
  next();
})

app.use('/', index);
app.use('/auth', authRoutes)

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
