var http = require('http');
var Express = require('express')
var app = Express();
var path = require('path');
var db = require('./db/index.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var User = require('./db/models/User');

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

app.use(passport.initialize());

app.use(passport.session());

app.use('/auth', require('./auth/auth.router'));


app.use('/browser', Express.static(path.join(__dirname, '../browser')));
app.use('/minjs', Express.static(path.join(__dirname, '../minjs')));


app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../index.html'));
    });
