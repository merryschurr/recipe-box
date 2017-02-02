var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');

//home
router.route('/')
	.get(staticsController.home);

//show all endpoints
router.route('/api')
	.get(usersController.api_index);

//Routes for indexing, showing, and creating
router.route('/api/myRecipeBox')
	.get(usersController.search_index)
	.post(usersController.search_create)

router.route('/api/myRecipeBox/:id')
	.get(usersController.search_show)


module.exports = router;