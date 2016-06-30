var app = require('angular').module('memoryPalace');

app.factory('modalFactory', require("./modalFactory"));
app.factory('wallFactory', require("./wallFactory"));
app.factory('roomFactory', ["wallFactory", require("./room_factory")]);
app.factory('tableFactory', require("./table_factory"));
app.factory('authFactory', ['$http', '$rootScope', require("./authFactory")]);
app.factory('objectFactory', require("./objectFactory"));
app.factory('shelfFactory', require("./shelf_Factory"));
app.factory('storingFactory', ['$http', require("./storing_Factory")]);
app.factory('palacesFactory', ['roomFactory', 'objectFactory', 'tableFactory', 'wallFactory', require("./palacesFactory")]);

