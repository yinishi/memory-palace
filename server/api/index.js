'use strict';
var router = require('express').Router();
var db = require('../db');
var User = db.model('user');
var Item = db.model('item');


//get all saved items for a user
router.get('/items', function(req, res, next){
	Item.findAll({
				where: {
					userId: req.user.id
				}
			})
		.then(function(items){
				res.send(items)
			})
})

//save an item to a user
router.post('/items', function(req, res, next){
	User.findOne({where: {
		email: req.body.email
	}})
		.then(function(user){
			req.body.userId = req.user.id;
			return Item.create(req.body)
			})
		.then(function(item){
			res.send(item)
		})

})
module.exports = router;