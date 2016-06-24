var http = require('http');
var Express = require('express')
var app = Express();
var path = require('path');

var port = process.env.PORT || 8080;

var server = http.createServer(app).listen(port, function (err) {
  if (err) throw err;
  console.log('HTTP server patiently listening on port', port);
});

app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../index.html'));
    });

app.use('/browser', Express.static(path.join(__dirname, '../browser')));
app.use('/minjs', Express.static(path.join(__dirname, '../minjs')));