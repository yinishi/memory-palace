var app = require('angular').module('memoryPalace');

app.factory('roomFactory', require("./room_factory"));
app.factory('tableFactory', require("./table_factory"));
app.factory('authFactory', ['$http', '$rootScope', require("./authFactory")]);
