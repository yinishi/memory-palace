var http = require('http');
var Express = require('express')
var app = Express();
var path = require('path');
var db = require('./db/index.js');

var port = process.env.PORT || 8080;

var server = http.createServer(app).listen(port, function (err) {
  if (err) throw err;
  console.log('HTTP server patiently listening on port', port);
  db.sync()
  .then(function () {
    console.log('Oh and btw the postgres server is totally connected, too');
  });
});

app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../index.html'));
    });

app.use('/js', Express.static(path.join(__dirname, '../js')));
app.use('/minjs', Express.static(path.join(__dirname, '../minjs')));