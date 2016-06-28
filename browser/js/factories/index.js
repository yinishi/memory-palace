var app = require('angular').module('memoryPalace');

app.factory('roomFactory', require("./room_factory"));
app.factory('tableFactory', require("./table_factory"));
app.factory('authFactory', ['$http', '$rootScope', require("./authFactory")]);
app.factory('objectFactory', require("./objectFactory"));
app.factory('shelfFactory', require("./shelf_Factory"));
app.factory('sliderFactory', require("./sliderFactory"));
