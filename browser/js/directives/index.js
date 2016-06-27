var app = require('angular').module('memoryPalace');
 
app.directive('navbar', ["$state",  "authFactory", "$rootScope", require("./navbar")]);
app.directive('threeModel', ['$window', 'roomFactory', 'tableFactory', 'objectFactory', '$document', require("./threeModel")]);
app.directive('menu', ['objectFactory', require('./menu')]);