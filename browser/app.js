'use strict';

var angular = require('angular');
require('angular-ui-router');

var app = angular.module('memoryPalace', ["ui.router"]);

require('./js/controllers');
require('./js/directives');
require('./js/states');
require('./js/factories');