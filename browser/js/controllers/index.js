var app = require('angular').module('memoryPalace');

app.controller('menuCtrl', ["modalFactory", "$scope", "objectFactory", "$window",require("./menuCtrl.js")]);
app.controller('roomCtrl', ["$scope", "modalFactory", "objectFactory", "textFactory", "messageFactory", "storingFactory", require("./roomCtrl.js")]);
