'use strict';

var Sequelize = require('sequelize');

var db = require('.././_db.js');

// AK/EI: position not null?

var Item = db.define('item', {
  name: Sequelize.STRING,
  positionX: Sequelize.DECIMAL,
  positionY: Sequelize.DECIMAL,
  positionZ: Sequelize.DECIMAL,
  scaleX: Sequelize.DECIMAL,
  scaleY: Sequelize.DECIMAL,
  scaleZ: Sequelize.DECIMAL,
  rotationX: Sequelize.DECIMAL,
  rotationY: Sequelize.DECIMAL,
  rotationZ: Sequelize.DECIMAL,
  message: Sequelize.TEXT
});


module.exports = Item;