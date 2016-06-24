'use strict';

var angular = require('angular');
require('angular-ui-router');

var app = angular.module('memoryPalace', ["ui.router"]);

// console.log("here", require('./js/factories'));

require('./js/controllers');
require('./js/factories');
require('./js/directives');
require('./js/states');