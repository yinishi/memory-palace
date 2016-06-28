var app = require('angular').module('memoryPalace');
 
app.directive('navbar', ["$state",  "authFactory", "$rootScope", require("./navbar")]);
app.directive('threeModel', ['$window', 'roomFactory', 'tableFactory', 'objectFactory', 'shelfFactory', '$document', require("./threeModel")]);
app.directive('carouselItem', require("./carouselItem"));
app.directive('carouselBtn', require("./carouselBtn"));
app.directive('carousel', ['$window', 'sliderFactory', require("./carousel")]);
