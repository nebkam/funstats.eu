var express    = require('express'),
	app        = express(),
	bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8888;

//Routes
var router = express.Router();

router
	.route('/scores')
	.get(function(req,res) {
		res.json([]);
	})
	.post(function(req,res) {
		res.json([]);
	});
app.use('/api', router);
app.listen(port);