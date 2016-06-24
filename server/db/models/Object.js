'use strict';

var Sequelize = require('sequelize');

var db = require('.././_db.js');

var Object = db.define('object', {
  name: Sequelize.STRING,
  positionX: Sequelize.INTEGER,
  positionY: Sequelize.INTEGER,
  positionZ: Sequelize.INTEGER,
});


module.exports = Object;