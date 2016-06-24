'use strict';

var router = require('express').Router();

var HttpError = require('../utils/HttpError');
var User = require('../db/models/User');

router.post('/login', function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    return next(HttpError(401));
  }
  req.body.email = req.body.email + '';
  req.body.password = req.body.password + '';
  User.findOne({
    where: {email: req.body.email},
    attributes: {include: ['password', 'salt']}
  })
  .then(function (user) {

    if (!user || !user.authenticate(req.body.password)) {
      throw HttpError(401);
    }
    req.login(user, function (err) {
      if (err) next(err);
      else res.json(user);
    });
  })
  .catch(next);
});

router.post('/signup', function (req, res, next) {
  console.log("in route", req.body)
  delete req.body.isAdmin;
  User.create(req.body)
  .then(function (user) {
    req.login(user, function (err) {
      console.log("user", req.user)
      console.log("session", req.session)
      if (err) next(err);
      else res.status(201).json(user);
    });
  })
  .catch(next);
});

router.get('/me', function (req, res, next) {
  res.json(req.user);
});

router.delete('/me', function (req, res, next) {
  req.logout();
  res.status(204).end();
});

// router.use('/google', require('./google.oauth'));

// router.use('/twitter', require('./twitter.oauth'));

// router.use('/github', require('./github.oauth'));

module.exports = router;