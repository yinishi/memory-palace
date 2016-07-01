'use strict';
var router = require('express').Router();
var db = require('../db');
var User = db.model('user');
var Item = db.model('item');

// EI: more RESTful to have /users/:id/items/
// EI: 401 instead of 200 status code?
// EI: looks like you want to make middleware to check if there's a req.user, otherwise send 401

router.use('/', function (req, res, next) {
	// check stuff here
});

//get all saved items for a user
router.get('/items', function(req, res, next){
	if(req.user){
		Item.findAll({
					where: {
						userId: req.user.id
					}
				})
			.then(function(items){
					res.send(items);
				});
	}
	else res.sendStatus(200);
});

//save an item
router.post('/items', function(req, res, next){
	if(req.user){
		req.body.userId = req.user.id;
		return Item.create(req.body)
			.then(function(item){
				res.send(item);
			});
	}
	else res.sendStatus(200);

});

//delete an item
router.delete('/items/:id', function(req, res, next){
	if(req.user){
		req.body.userId = req.user.id;
		Item.destroy({where:{
			userId: req.user.id,
			id: req.params.id
		}});
	}
	else res.sendStatus(200);
});

module.exports = router;