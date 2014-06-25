/* jshint node:true */
/* global describe, it, beforeEach */
(function() {
	"use strict";

	var should = require("should"),
		products = require("../productController"),
		productList,
    	request,
    	response,
    	productNotFound = "Product not found";

    beforeEach(function() {
    	request = {};
    	response = { data: {}, send: function(data) { this.data = data; }};
    	productList = products.initProducts();
    });

	describe("products api", function() {

	    it("should provide a lists of products successfully", function() {

		    products.findAllProducts(request, response);

		    response.data.should.eql([
				{ sku: "12GBE445", description: "computer", errors: [], isValid: true },
				{ sku: "JHL34HHB", description: "monitor", errors: [], isValid: true },
				{ sku: "IDSK2323", description: "keyboard", errors: [], isValid: true },
				{ sku: "MML8989D", description: "phone", errors: [], isValid: true },
				{ sku: "AAKKLD32", description: "chair", errors: [], isValid: true }
			]);
	    });

	    it("should return a product successfully", function() {

	    	var sku = "IDSK2323",
	    		product;

	    	request.params = { sku: sku };
		    products.findProduct(request, response);

		    response.data.should.eql({ sku: "IDSK2323", description: "keyboard", 
		    	errors: [], isValid: true });
	    });

	    it("should return an error when a sku is not found", function() {

	    	var sku = "~~~~~~~~",
	    		product;

	    	request.params = { sku: sku };
		    products.findProduct(request, response);

		    response.data.should.eql({ 
		    	sku: sku,
		    	description: productNotFound,
		    	isValid: false,
		    	errors: [productNotFound]
		     });
	    });

	    it("should add a product successfully", function() {

	    	var newProduct = { sku: "foo", description: "bar", errors: [], isValid: true };
	    	request.body = newProduct;

	    	products.addProduct(request, response);

	    	response.data.should.eql(newProduct);
	    	productList.length.should.equal(6);
	    });

	    it("should not add a product if sku is missing", function() {

	    	var newProduct = { sku: null, description: "bar" };
	    	request.body = newProduct;

	    	products.addProduct(request, response);

	    	response.data.should.eql({description: "bar", 
	    						errors: ["Sku is required"], isValid: false});
	    	productList.length.should.equal(5);
	    });

	    it("should not add a product if description is missing", function() {

	    	var newProduct = { sku: "foo", description: null };
	    	request.body = newProduct;

	    	products.addProduct(request, response);

	    	response.data.should.eql({sku: "foo", 
	    						errors: ["Description is required"], isValid: false});
	    	productList.length.should.equal(5);
	    });

	    it("should not add a product if sku is not unique", function() {

	    	var newProduct = { sku: "12GBE445", description: "bar",
	    						errors: ["Sku not unique"], isValid: false };
	    	request.body = newProduct;

	    	products.addProduct(request, response);

	    	response.data.should.eql(newProduct);
	    	productList.length.should.equal(5);
	    });

	    it("should update a product successfully", function() {

	    	var product = { sku: "12GBE445", description: "bar",
	    						errors: [], isValid: true };

	        request.params = { sku: product.sku };
	    	request.body = product;
	    	products.updateProduct(request, response);

	    	response.data.should.eql(product);
	    	productList.length.should.equal(5);
	    	productList[0].description.should.equal(product.description);
	    });

	    it("should not update a product if product not found", function() {

	    	var product = { sku: "foo", description: "bar",
	    						errors: [], isValid: true };

	        request.params = { sku: product.sku };
	    	request.body = product;
	    	products.updateProduct(request, response);

	    	response.data.should.eql({ 
		    	sku: product.sku,
		    	description: productNotFound,
		    	isValid: false,
		    	errors: [productNotFound]
		     });
	    	productList.length.should.equal(5);
	    	productList[0].description.should.equal("computer");
	    });

	    it("should not update a product if product is not valid", function() {

	    	var product = { sku: "12GBE445", description: null,
	    						errors: ["Description is required"], isValid: false };

	        request.params = { sku: product.sku };
	    	request.body = product;
	    	products.updateProduct(request, response);

	    	response.data.should.eql({ sku: "12GBE445", errors: ["Description is required"], 
	    		isValid: false });
	    	productList.length.should.equal(5);
	    	productList[0].description.should.equal("computer");
	    });

	    it("should delete a product successfully", function() {
	    	var sku = "12GBE445";

	        request.params = { sku: sku };
	    	products.deleteProduct(request, response);

	    	productList.length.should.equal(4);
	    	productList[0].sku.should.not.equal(sku);
	    });

	    it("should not delete the product if product not found", function() {
	    	var sku = "foo";

	        request.params = { sku: sku };
	    	products.deleteProduct(request, response);

	    	response.data.should.eql({ 
		    	sku: sku,
		    	description: productNotFound,
		    	isValid: false,
		    	errors: [productNotFound]
		     });
	    	productList.length.should.equal(5);
	    	productList[0].sku.should.not.equal("computer");
	    });

	});
}());