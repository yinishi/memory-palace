'use strict';

var angular = require('angular');
require('angular-ui-router');

var app = angular.module('memoryPalace', ["ui.router"]);

app.config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    $urlRouterProvider.when('/', '/room');
    // Trigger page refresh when accessing an OAuth route
    // $urlRouterProvider.when('/auth/:provider', function () {
    //     window.location.reload();
    // });)
}]);

require('./js/controllers');
require('./js/factories');
require('./js/directives');
require('./js/states');