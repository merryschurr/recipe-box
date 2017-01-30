var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myRecipeBoxSchema = new Schema ({
	author: String,
	backgroundColor: String,
	backgroundImage: String,
	fontColor: String,
	ingredients: String,
	instructions: String,
	mask: String,
	readyInMinutes: Number,
	servings: Number,
	source: String,
	title: String,

});

var myRecipeBox = module.exports = mongoose.model('myRecipeBox', UserSchema);
