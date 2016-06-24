var app = require('angular').module('memoryPalace');

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state("about", {
    	url: "/about",
        templateUrl: '/browser/js/templates/about.html',
    })
    .state("room", {
    	url: "/room",
        templateUrl: '/browser/js/templates/room.html',
    })
    .state("login", {
    	url: "/login",
        templateUrl: '/browser/js/templates/login.html',
        controller: 'login'
    });
}]);