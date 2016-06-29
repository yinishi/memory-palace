var app = require('angular').module('memoryPalace');

app.controller('login', ["$scope", "$state", "$http", "authFactory", '$rootScope', require("./loginCtrl.js")]);
app.controller('menuCtrl', ["$scope","objectFactory", require("./menuCtrl.js")]);