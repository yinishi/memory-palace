'use strict';

var angular = require('angular');
var Text2D = require('three-text2D').Text2D;
require('angular-ui-router');
require('jquery'); 
require('angular-slick-carousel');


var app = angular.module('memoryPalace', ["ui.router", "slickCarousel"]);

app.config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.when('/', '/room');
}]);

require('./js/controllers');
require('./js/factories');
require('./js/directives');
require('./js/states');


