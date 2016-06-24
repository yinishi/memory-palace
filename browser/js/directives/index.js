var app = require('angular').module('memoryPalace');

app.directive('navbar', require("./navbar"));
app.directive('threeModel', ['$window', require("./threeModel")]);