var Sequelize = require('sequelize');

var db = require('./_db.js');

var User = require('./models/User.js');
var Item = require('./models/Item.js');

Item.belongsTo(User);
module.exports = db;
