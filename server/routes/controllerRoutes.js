// External dependencies
const path = require('path');
// Relative imports
const db = require(path.join(__dirname, '..', '/models/wrapper'));

var controller = {};

controller.GETindex = function(req, res, next) {
	res.sendFile(path.join(__dirname, '..', '/templates/controller.html'));
}

controller.POSTbob = function(req, res, next) {
	var bob = {
		data: req.body.data,
		flavor: req.body.flavor,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		tags: req.body.tags
	}

	console.log("Saving bob", bob);
	db.Bob.saveBob(bob);
	// // Will add to database later
	// res.send(data);
}

controller.GETflavors = function(req, res) {
  db.Flavors.getFlavors().then(function success(data) {
    res.send(data);
  }, function error(err) {
    res.status(500).send(err);
  })
}

controller.GETtags = function(req, res) {
  db.Tag.getTags().then(function success(data) {
    res.send(data);
  }, function error(err) {
    res.status(500).send(err);
  })
}

module.exports = controller;