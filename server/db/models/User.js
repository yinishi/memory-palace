'use strict';

var Sequelize = require('sequelize');
var crypto = require('crypto');

var db = require('.././_db.js');

var User = db.define('user', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    // allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
        },
  googleId: Sequelize.STRING,
  twitterId: Sequelize.STRING,
  githubId: Sequelize.STRING
}, {
        instanceMethods: {
            sanitize: function () {
                return _.omit(this.toJSON(), ['password', 'salt']);
                //what exactly does sanitize mean
            },
            correctPassword: function (candidatePassword) {
                return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
                //candidate? what do they mean by this. unclear var name
            }
        },
        classMethods: {
            generateSalt: function () {
                return crypto.randomBytes(16).toString('base64');
            },
            encryptPassword: function (plainText, salt) {
                    var hash = crypto.createHash('sha1');
                    hash.update(plainText);
                    hash.update(salt);
                    return hash.digest('hex');
                }
                //should we encrypt the email? we don't want that to be publicly accessible in case of server invasion . . .
        },
        hooks: {
            beforeValidate: function (user) {
                if (user.changed('password')) {
                    user.salt = user.Model.generateSalt();
                    user.password = user.Model.encryptPassword(user.password, user.salt);
                }
            }
        }
    });


module.exports = User;