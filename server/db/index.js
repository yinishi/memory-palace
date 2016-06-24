var Sequelize = require('sequelize');

var db = require('./_db.js');

var User = require('./models/User.js');
var Object = require('./models/Object.js');

Object.belongsTo(User);
module.exports = db;