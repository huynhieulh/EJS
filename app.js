var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var apiServer = require('./routes/apiServer');
var auth = require('./middleware/authenticate')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Set session expiration time to 1 hour (in milliseconds)
const sessionOptions = {
  secret: '$3022TZjslo24671$%^&&11KKzgwt@BH1%&',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 24000 } // 60 * 60 * 24000 =  24 hour
};

app.use(session(sessionOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(auth.authenticate)

app.use('/', auth.sessionAuth, indexRouter);
app.use('/api', auth.actionAth, apiServer);
app.use('/login', loginRouter);
app.get('/logout', (req, res) =>{
  req.session.destroy(err => {
    if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('Internal Server Error');
    }
    // Redirect to login page or any other page after logout
    console.log("Redirect to login");
    res.redirect('/login');
  });
})

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
