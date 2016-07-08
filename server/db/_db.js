var Sequelize = require('sequelize');

var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/memory';

var db = new Sequelize(databaseUrl, {
	logging: false
});

module.exports = db;