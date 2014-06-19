/**
 * Web API for User Resource
 * - Will return MOCK data for now
 */
(function() {
	"use strict";

	exports.findById = function(req, res) {

		var id = req.params.id;
		console.log("Retrieving user: " + id);
		res.send({ id: id, name: "foo", description: "bar"});

	};

	exports.findAll = function(req, res) {
		console.log("Retrieving all users");
		res.send([{ id: 1, name: "foo", description: "bar"},
			{ id: 2, name: "jane", description: "doe"},
			{ id: 3, name: "ted", description: "smith"}]);
	};

	exports.addUser = function(req, res) {

		console.log("future home of addUser");
	}

	exports.updateUser = function(req, res) {

		console.log("future home of updateUser");
	}

	exports.deleteUser = function(req, res) {

		console.log("future home of deleteUser");
	}
}());