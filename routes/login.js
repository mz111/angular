var express = require('express');
var router = express.Router();
var db = require('mongodb').MongoClient.connect('mongodb://localhost/test');
var Q = require('q');
var passport = require('passport');
var Account = require('../models/account');

router.post('/', function(req, res, next) {
// for login and register
var user = req.body;
console.log('post user', user);
Account.register(
    new Account({
        username: user.username
    }),
    user.password,
    function(err, account) {
    	console.log('after save', err, account);
        if (err) {
            res.json({});
        } else {
            passport.authenticate('local')(req, res, function() {
                res.json({
                    username: account.username
                })
            });
        }
    });
});

/*var user = req.body;
	var isLogin = user.isLogin || false;
	delete user.isLogin;
	// TODO, separate login and signup
	db.then(function(db){
		// check
		if(isLogin){
			return db.collection('users').find(user).toArray();
		} else
			return db.collection('users').insert(user)
	}).then(function(users){
		//return
		if( !isLogin || users.length > 0){
			var defer = Q.defer();
			req.session.user = user;
			req.session.save(function(err){
				if(err){
					defer.reject(err);
				} else {
					var result = isLogin ? {status: users.length > 0 } : user;
					defer.resolve(result);	
				}
			});
			return defer.promise;
		} else {
			return {}
		}
	})
	.then(res.json.bind(res))
	.catch(function(err){
		console.log('insert user fail', err);
		next(err);
	});*/

router.get('/', function(req, res, next) {
    //    var username;
    //    if (req.session.user) username = req.session.user.name;
    //    res.json({
    //        username: username
    //    });
    //    //res.redirect('/');

    if (req.user) {
        res.json({
            username: req.user.username
        });
    } else {
        res.json({});
    }

});

router.get('/logout', function(req, res, next) {
    req.session.destroy(function() {
        res.json({});
    })
});
module.exports = router;
