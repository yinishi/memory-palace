var app = require('angular').module('memoryPalace');

app.directive('navbar', ["$state",  "authFactory", require("./navbar")]);
app.directive('threeModel', ['$window', 'roomFactory', "tableFactory", '$document', require("./threeModel")]);