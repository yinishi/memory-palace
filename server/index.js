var http = require('http');
var Express = require('express')
var app = Express();
var path = require('path');
var db = require('./db/index.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var User = require('./db/models/User');
var favicon = require('serve-favicon');

var port = process.env.PORT || 8080;

var server = http.createServer(app).listen(port, function (err) {
  if (err) throw err;
  console.log('HTTP server patiently listening on port', port);
  db.sync()
  .then(function () {
    console.log('Oh and btw the postgres server is totally connected, too');
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: "happiness",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(function (user) {
    done(null, user);
  })
  .catch(done);
});

app.use('/auth', require('./auth/auth.router'));

app.use('/browser', Express.static(path.join(__dirname, '../browser')));

app.use(Express.static(path.join(__dirname, '../bower-components')));

app.use('/minjs', Express.static(path.join(__dirname, '../minjs')));

app.use(Express.static(path.join(__dirname, '../styles')));

app.use(favicon(__dirname + '/favicon.ico'));

app.use('/api', require('./api'));

app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../index.html'));
    });
