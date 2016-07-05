var app = require('angular').module('memoryPalace');

app.factory('modalFactory', [require("./modalFactory")]);
app.factory('wallFactory', require("./wallFactory"));
app.factory('roomFactory', ["wallFactory", require("./room_factory")]);
app.factory('tableFactory', require("./table_factory"));
app.factory('authFactory', ['$http', '$rootScope', require("./authFactory")]);
app.factory('objectFactory', ['textFactory', 'modalFactory', require("./objectFactory")]);
app.factory('shelfFactory', require("./shelf_Factory"));
app.factory('storingFactory', ['$http', 'textFactory', 'objectFactory', require("./storing_Factory")]);
app.factory('palacesFactory', ['roomFactory', 'objectFactory', 'tableFactory', 'wallFactory', 'messageFactory', require("./palacesFactory")]);
app.factory('textFactory', require("./textFactory"));
app.factory('lightFactory', require('./lightFactory'));
app.factory('messageFactory', require('./messageFactory'));

