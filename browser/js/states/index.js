var app = require('angular').module('memoryPalace');

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state("room", {
    	url: "/room",
        templateUrl: '/browser/js/templates/room.html',
    })
}]);

