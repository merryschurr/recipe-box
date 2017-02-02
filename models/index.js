var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/myRecipeBox');

module.exports.MyRecipeBox = require('./myRecipeBox');