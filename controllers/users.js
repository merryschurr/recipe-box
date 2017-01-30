var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');

var apiKey = process.env.apiKey || require('../config/env').key;


var db = require('../models');

function api_index(req, res) {
	res.json({
		message: "Welcome to Recipe Box!",
		documentation_url: "",
		base_url: "",
		endpoints: [
		{method: "GET", path: "/api", description: "You are here"},
		{method: "GET", path: "/api/user", description: "What's for dinner"},
		{method: "POST", path: "/api/user", description: "We did not want these new users to be out on the streets, so we directed them here"},
		{method: "GET", path: "/api/user/:id", description: "If you want to find one user, now you know where to go"},
		{method: "GET", path: "/api/search", description: "If you're looking for a great search, look no further"},
		{method: "POST", path: "/api/search", description: "These new stories were homeless until they followed this path"},
		{method: "GET", path: "/api/search/:id", description: "Some stories like attention and some do not; this path, however, leaves them no choice"}
		]
	})
}

//Controllers for signing up and loggin in/out
function getSignup(req, res) {
	res.render('signup.ejs', { message: req.flash('signupMessage') });
};

function postSignup(req, res) {
	var signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	});
	return signupStrategy(req, res);
};

function getLogin(req, res) {
	res.render('login.ejs', { message: req.flash('loginMessage') });
};

function postLogin(req, res) {
	var loginStrategy = passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});
	return loginStrategy(req, res);
};

function getLogout(req, res) {
	req.logout();
	res.redirect('/');
};

function secret(req, res) {
	res.render('secret.ejs', { secretMessage: "Hey" });
	res.send( {secretMessage: "Hey" });

	var secretStrategy = passport.authenticate('local-secret', {
		successRedirect: '/secret',
		failureRedirect: '/',
		failureFlash: true
	});
	return secretStrategy(req, res);
};

//Controllers that allow users to be indexed, shown, created, updated, and deleted
function user_index(req, res) {
	db.User.find({}, function(err, users) {
		if (err) return "user index error: " + err;
		res.json(users);
	});
};

function user_create(req, res) {
	db.User.create(req.body, function(err, user) {
		if (err) return "user create error: " + err;
		res.json(user);
	});
};

function user_show(req, res) {
	db.User.findById(req.params.id, function(err, user) {
		if (err) return "user show error: " + err;
		res.json(user);
	})
};

function user_update(req, res) {
	db.User.findById(req.params.id, function(err, user) {
		if (err) return "user update error: " + err;
		if (req.params.id == user._id) {
			user.local.email = req.body.email;
			user.local.password = req.body.password;
			user.local.username = req.body.username;
			user.save();
		}
		res.json(user);
	})
};

function user_delete(req, res) {
	db.User.remove({'_id' : req.params.id}, function(err, user) {
		if (err) return "user delete error: " + err;
		res.json(user);
	})
};

//Controllers that allow stories to be indexed, shown, created, updated, and deleted
function search_index(req, res) {
	db.Search.find({}, function(err, search) {
		if (err) return "searcg index error: " + err;
		res.json(search);
	});
};

function search_create(req, res) {
	var user = req.user._id;
	db.User.findById(user, function(err, user) {
		db.Search.create(req.body, function(err, search) {
		if (err) return "searcg create error: " + err;
		user.searches.push(search);
		user.save();
		res.json(search);
		})	
	});
};

function search_show(req, res) {
	db.Search.findById(req.params.id, function(err, search) {
		if (err) return "search show error: " + err;
		res.json(search);
	})
};

function search_update(req, res) {
	db.Search.findById(req.params.id, function(err, search) {
		if (err) return "search update error: " + err;
		if (req.params.id == search._id) {
			search.street = req.body.street;
			search.city = req.body.city;
			search.monthStart = req.body.monthStart;
			search.yearStart = req.body.yearStart;
			search.monthEnd = req.body.monthEnd;
			search.yearEnd = req.body.yearEnd;
			search.searchBody = req.body.searchBody;
			search.save();
		}
		res.json(search);
	})
};

function search_delete(req, res) {
	db.Search.remove({'_id' : req.params.id}, function(err, search) {
		if (err) return "search delete error: " + err;
		res.json(search);
	})
};

//Controller that takes the API key variable and builds the url for the initial map
function get_map(req, res) {
	res.json('http://food2fork.com/api/search?key=' + apiKey + '')
}

function test(req, res) {
	res.render('test.ejs', { message: req.flash('loginMessage') });
};

module.exports = {
	getLogin: getLogin,
	postLogin: postLogin,
	getSignup: getSignup,
	postSignup: postSignup,
	getLogout: getLogout,
	secret: secret,
	api_index: api_index,
	user_index: user_index,
	user_show: user_show,
	user_create: user_create,
	user_update: user_update,
	user_delete: user_delete,
	search_index: search_index,
	search: search_show,
	search_create: search_create,
	search_update: search_update,
	search_delete: search_delete,
	get_map: get_map,
	test: test
}