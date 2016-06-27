var app = require('angular').module('memoryPalace');

app.directive('navbar', require('./navbar'));
app.directive('threeModel', ['$window', 'roomFactory', 'tableFactory','$document', require("./threeModel")]);