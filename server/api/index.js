'use strict';
var router = require('express').Router();
var db = require('../db');
var User = db.model('user');
var Item = db.model('item');


//get all saved items for a user
router.get('/items', function(req, res, next){
	if(req.user){
		Item.findAll({
					where: {
						userId: req.user.id
					}
				})
			.then(function(items){
					res.send(items)
				})
	}
	else res.sendStatus(200);
})

//save an item
router.post('/items', function(req, res, next){
	if(req.user){
		req.body.userId = req.user.id;
		return Item.create(req.body)
			.then(function(item){
				res.send(item)
			})
	}
	else res.sendStatus(200);

})

//delete an item
router.delete('/items/:id', function(req, res, next){
	if(req.user){
		req.body.userId = req.user.id;
		Item.destroy({where:{
			userId: req.user.id,
			id: req.params.id
		}})
	}
	else res.sendStatus(200);
})

module.exports = router;