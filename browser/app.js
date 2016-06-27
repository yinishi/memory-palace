'use strict';

var angular = require('angular');
require('angular-ui-router');

var app = angular.module('memoryPalace', ["ui.router"]);

app.config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.when('/', '/room');
}]);


require('./js/controllers');
require('./js/factories');
require('./js/directives');
require('./js/states');


