/* jshint node:true */
/* global describe, it, beforeEach */
(function() {
	"use strict";

	var should = require("should"),
		Product = require("../productModel");

	describe("product model", function() {

	    it("should set isValid to true with valid sku and description", function() {

		    var product = new Product({ sku: "foo", description: "bar" });

		    product.isValid.should.equal(true); //not using .true for jshint
	    });

	    it("should set isValid to false with invalid sku", function() {

		    var product = new Product({ sku: null, description: "bar" });
		    product.isValid.should.equal(false);
		    product.errors[0].should.equal("Sku is required");

			product = new Product({ sku: undefined, description: "bar" });
		    product.isValid.should.equal(false);
		    product.errors[0].should.equal("Sku is required");

			product = new Product({ sku: " ", description: "bar" });
		    product.isValid.should.equal(false);
		    product.errors[0].should.equal("Sku is required");
	    });

	    it("should set isValid to false with invalid description", function() {

		    var product = new Product({ sku: "foo", description: null });
		    product.isValid.should.equal(false);
		    product.errors[0].should.equal("Description is required");

			product = new Product({ sku: "foo", description: undefined });
		    product.isValid.should.equal(false);
		    product.errors[0].should.equal("Description is required");

			product = new Product({ sku: "foo", description: "  " });
		    product.isValid.should.equal(false);
		    product.errors[0].should.equal("Description is required");
	    });

	    it("should set isValid to false with invalid sku & description", function() {

		    var product = new Product();
		    product.isValid.should.equal(false);
		    product.errors[0].should.equal("Sku is required");
		    product.errors[1].should.equal("Description is required");
	    });

	});
}());