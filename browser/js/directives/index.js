var app = require('angular').module('memoryPalace');
 
app.directive('navbar', ["$state",  "authFactory", "$rootScope", require("./navbar")]);
app.directive('threeModel', ['$window', 'roomFactory', 'tableFactory', 'objectFactory', 'shelfFactory', '$document', 'storingFactory', require("./threeModel")]);