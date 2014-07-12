/**
 * Web API for Product Resource
 * - Will return MOCK data for now
 * - Never persist an invalid product
 */
/* jshint node:true */
(function() {
	"use strict";

	var _ = require("lodash-node"),
		Product = require("./productModel"),
		products = [],
		initProducts = function() {

			products = [];
			products.push(new Product({ sku: "12GBE445", description: "computer"}));
			products.push(new Product({ sku: "JHL34HHB", description: "monitor"}));
			products.push(new Product({ sku: "IDSK2323", description: "keyboard"}));
			products.push(new Product({ sku: "MML8989D", description: "phone"}));
			products.push(new Product({ sku: "AAKKLD32", description: "chair"}));

			return products;
		},
		findProduct = function(sku) {
			var product = _.find(products, { sku: sku }),
				productNotFound = "Product not found";

			console.log("Retrieving product: " + sku);

			if (!product) {
				product = new Product({sku: sku, description: productNotFound});
				product.isValid = false;
				product.errors.push(productNotFound);
			} else {
				product.validate();
			}

			return product;
		},
		//protect against JSON attacks
		wrapResult = function(data) {
		    return { d: data };
		};

	initProducts();

	exports.findAllProducts = function(req, res) {

		console.log("Retrieving all products");

		if (products.length > 0) {
			_.each(products, function(prod) {
				prod.validate();
			});
		}

		res.send(wrapResult(products));
	};

	exports.findProduct = function(req, res) {

		var product = findProduct(req.params.sku);

		res.send(wrapResult(product));
	};

	exports.addProduct = function(req, res) {

		var product = new Product(req.body);

		console.log("Adding product");

		//make sure sku is unique
		if (_.some(products, {sku: product.sku})) {
			product.isValid = false;
			product.errors.push("Sku not unique");
		} else if (product.isValid) {
			products.push(product);			
		}

		res.send(wrapResult(product));
	};

	exports.updateProduct = function(req, res) {

		var product = findProduct(req.params.sku),
			productToUpdate = req.body,
			index;

		//product was found
		if (product.isValid) {

			//create product from request
			product = new Product(productToUpdate);

			//only update collection if valid
			if (product.isValid) {

				console.log("Updating product: " + product.sku);
				index = _.findIndex(products, { sku: product.sku });
				products[index] = product;
			}
		}

		res.send(wrapResult(product));
	};

	exports.deleteProduct = function(req, res) {

		var product = findProduct(req.params.sku),
			index;

		//product was found
		if (product.isValid) {
			console.log("Deleting product: " + product.sku);
			index = _.findIndex(products, { sku: product.sku });
			products.splice(index, 1); //_.reject could not be used here
			res.send(wrapResult("product " + product.sku + " has been deleted"));
		} else {
			res.send(wrapResult(product)); //only send back product if invalid
		}
	};

	exports.initProducts = initProducts; //for testing
}());