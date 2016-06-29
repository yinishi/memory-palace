'use strict';

var Sequelize = require('sequelize');

var db = require('.././_db.js');

var Item = db.define('item', {
  name: Sequelize.STRING,
  positionX: Sequelize.DECIMAL,
  positionY: Sequelize.DECIMAL,
  positionZ: Sequelize.DECIMAL,
  scaleX: Sequelize.DECIMAL,
  scaleY: Sequelize.DECIMAL,
  scaleZ: Sequelize.DECIMAL,
  message: Sequelize.TEXT
});


module.exports = Item;