var app = require('angular').module('memoryPalace');

app.controller('menuCtrl', ["modalFactory", "$scope", "objectFactory", require("./menuCtrl.js")]);
app.controller('roomCtrl', ["$scope", "$window", "modalFactory", "objectFactory", "messageFactory", "storingFactory", "palacesFactory", require("./roomCtrl.js")]);
