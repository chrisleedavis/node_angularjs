/* jshint node:true */
/* global describe, it, beforeEach */
(function() {
	"use strict";

	var should = require("should"),
		users = require("../users"),
    	request,
    	response;

    beforeEach(function() {
    	request = {};
    	response = { data: {}, send: function(data) { this.data = data; }};
    });

	describe("users api", function() {

	    it("should provide a lists of users successfully", function() {

		    users.findAll(request, response);

		    response.data.should.eql([{ id: 1, name: "foo", description: "bar"},
			{ id: 2, name: "jane", description: "doe"},
			{ id: 3, name: "ted", description: "smith"}]);
	    });

	    it("should provide a user successfully", function() {

	    	var id = 23;
	    	request.params = { id: id };
		    users.findById(request, response);

		    response.data.should.eql({ id: id, name: "foo", description: "bar"});
	    });

	    it("should add a user successfully", function() {

	    	users.addUser(request, response);

	    	response.data.should.equal("future home of addUser");
	    });

	    it("should update a user successfully", function() {

	    	users.updateUser(request, response);

	    	response.data.should.equal("future home of updateUser");
	    });

	    it("should delete a user successfully", function() {

	    	users.deleteUser(request, response);

	    	response.data.should.equal("future home of deleteUser");
	    });

	});
}());