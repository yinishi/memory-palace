var app = require('angular').module('memoryPalace');

app.factory('modalFactory', [require("./modalFactory")]);
app.factory('wallFactory', require("./wallFactory"));
app.factory('tableFactory', require("./tableFactory"));
app.factory('authFactory', ['$http', require("./authFactory")]);
app.factory('objectFactory', ['modalFactory', require("./objectFactory")]);
app.factory('shelfFactory', ['constantsFactory', require("./shelfFactory")]);
app.factory('storingFactory', ['$http', require("./storingFactory")]);
app.factory('palacesFactory', ['objectFactory', 'tableFactory', 'wallFactory', 'messageFactory', 'constantsFactory', 'shelfFactory', require("./palacesFactory")]);
app.factory('lightFactory', require('./lightFactory'));
app.factory('messageFactory', require('./messageFactory'));
app.factory('constantsFactory', require('./constantsFactory'));

