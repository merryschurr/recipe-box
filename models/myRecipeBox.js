var mongoose = require('mongoose');

// My Recipe Box Schema
var myRecipeBoxSchema = mongoose.Schema({
	myRecipeBox: {
		type: String,
		index:true
	},
	myRecipes: {
		type: String
	}
});

var myRecipeBox = module.exports = mongoose.model('myRecipeBox', UserSchema);
