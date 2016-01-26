var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var db = MongoClient.connect('mongodb://localhost/test');
/* GET home page. */
router.get('/user', function(req, res, next) {
   	db.then(function(db){
		return db.collection('customer').find().toArray()
	}).then(res.json.bind(res)).catch(function(err){
		console.log(err);
		next(err);
	})
});
router.post('/user', function(req, res, next) {
	var user = req.body;
   	db.then(function(db){
		return db.collection('customer').insert(user)
	})
	.then(function(){
		//if(req.xhr)
		//console.log(req);
		res.json({
			user: user
		});
		//else 
		//res.redirect('/');
	})
	.catch(function(err){
		console.log(err);
		next(err);
	})
});
router.delete('/user/:userid', function(req, res, next) {
	var userid = ObjectId(req.params.userid);
   	db.then(function(db){
		return db.collection('customer').remove({_id:userid})
	})
	.then(res.json.bind(res))
	.catch(function(err){
		console.log(err);
		next(err);
	})
});

router.put('/user', function(req, res, next) {
	var user = req.body;
	var uid = user._id
	delete user._id;
   	db.then(function(db){
		return db.collection('customer').update({_id:ObjectId(uid)},user)
	})
	.then(function(){
		user._id = uid;
		res.json({
			user: user
		});
	})
	.catch(function(err){
		console.log(err);
		next(err);
	})
});


module.exports = router;



