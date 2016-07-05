var app = require('angular').module('memoryPalace');

// app.controller('login', ["$scope", "$state", "$http", "authFactory", '$rootScope', 'modalFactory', require("./loginCtrl.js")]);
app.controller('menuCtrl', ["modalFactory", "$scope", "objectFactory", "$window",require("./menuCtrl.js")]);
app.controller('roomCtrl', ["$scope", "modalFactory", "objectFactory", "textFactory", "messageFactory", "storingFactory", require("./roomCtrl.js")]);
