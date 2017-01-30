var mongoose = require('mongoose');

// mongoose.createConnection('mongodb://localhost/recipe-box');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/recipe-box');


module.exports.User = require('./user');
module.exports.Search = require('./search');
module.exports.MyRecipeBox = require('./myRecipeBox');