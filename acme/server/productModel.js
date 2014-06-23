/**
 * Products will be used by all clients including (but not limited to):
 *  sku, description, isValid, validate, etc.
 */
/* jshint node:true */
(function() {
	"use strict";

	var _ = require("lodash-node");
	
	function Product(options) {

	    if (this instanceof Product === false) {
	        return new Product(options);
	    }

	    if (options && options.sku) {
	    	this.sku = options.sku;
	    }

	    if (options && options.description) {
	    	this.description = options.description;
	    }

	    this.errors = [];
	    this.isValid = true;
	    this.validate();

	    return this;
	}

	Product.prototype = {

		validate: function() {

			this.errors = [];

			if (!this.sku || _.isEmpty(this.sku.trim())) {
				this.errors.push("Sku is required");
			}

			if (!this.description || _.isEmpty(this.description.trim())) {
				this.errors.push("Description is required");
			}

			this.isValid = this.errors.length < 1;
		}
	};

	module.exports = Product;
}());