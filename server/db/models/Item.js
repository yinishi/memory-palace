'use strict';

var Sequelize = require('sequelize');

var db = require('.././_db.js');

var Item = db.define('item', {
  name: Sequelize.STRING,
  positionX: Sequelize.INTEGER,
  positionY: Sequelize.INTEGER,
  positionZ: Sequelize.INTEGER,
  scaleX: Sequelize.INTEGER,
  scaleY: Sequelize.INTEGER,
  scaleZ: Sequelize.INTEGER,
  message: Sequelize.TEXT,
  scale: Sequelize.DECIMAL
});


module.exports = Item;