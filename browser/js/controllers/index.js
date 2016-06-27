var app = require('angular').module('memoryPalace');

app.controller('room', ["$scope", require("./room_cntrl.js")]);
app.controller('login', ["$scope", "$state", "$http", "authFactory", require("./loginCtrl.js")]);
app.controller('menuCtrl', ["$scope","objectFactory", require("./menuCtrl.js")]);