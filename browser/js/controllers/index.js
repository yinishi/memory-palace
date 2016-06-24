var app = require('angular').module('memoryPalace');

app.controller('test', ["$scope", require("./test.js")]);
app.controller('room', ["$scope", require("./room_cntrl.js")]);
app.controller('login', ["$scope", "$http", require("./loginCtrl.js")]);