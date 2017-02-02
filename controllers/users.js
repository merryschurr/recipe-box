// var express = require('express');
// var app = express();
// var passport = require('passport');
// var bodyParser = require('body-parser');

// var apiKey = process.env.apiKey || require('../config/env').key;


// var db = require('../models');

// function api_index(req, res) {
// 	res.json({
// 		message: "Welcome to Recipe Box!",
// 		documentation_url: "",
// 		base_url: "",
// 		endpoints: [
// 		{method: "GET", path: "/api", description: "You are here"},
// 		{method: "GET", path: "/api/myRecipeBox", description: "What's for dinner!"},
// 		{method: "POST", path: "/api/myRecipeBox", description: "Dinner options."},
// 		{method: "GET", path: "/api/myRecipeBox/:id", description: "Want to find a special recipe?"}
// 		]
// 	})
// }

// //Index, show, and create
// function myRecipeBox_index(req, res) {
// 	db.MyRecipeBox.find({}, function(err, myRecipeBoxs) {
// 		if (err) return "index error: " + err;
// 		res.json(myRecipeBoxs);
// 	});
// };

// function myRecipeBox_show(req, res) {
// 	db.MyRecipeBox.findById(req.params.id, function(err, myRecipeBox) {
// 		if (err) return "show error: " + err;
// 		res.json(myRecipeBox);
// 	})
// };

// function myRecipeBox_create(req, res) {
// 	db.MyRecipeBox.create(req.body, function(err, myRecipeBox) {
// 		if (err) return "create error: " + err;
// 		res.json(myRecipeBox);
// 	});
// };


// module.exports = {
// 	api_index: api_index,
// 	myRecipeBox_index: myRecipeBox_index,
// 	myRecipeBox_show: myRecipeBox_show,
// 	myRecipeBox_create: myRecipeBox_create,