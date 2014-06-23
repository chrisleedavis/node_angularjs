/**
 * Main js file for starting the application/server (acme)
 *  - main bootstrapping of express server will be handled here
 *  - serving up both static content and web api
 */
/* jshint node:true */
(function() {
	"use strict";

	var express = require("express"),
		products = require("./productController"),
		API_ROOT = "/api/products",
		API_ROOT_SKU = API_ROOT + "/:sku",
		app = express();

		//index.html, js, css
		app.use(express.static("public"));

		//web api routing
		app.get(API_ROOT, products.findAllProducts);
		app.get(API_ROOT_SKU, products.findProduct);
		app.post(API_ROOT, products.addProduct);
		app.put(API_ROOT_SKU, products.updateProduct);
		app.delete(API_ROOT_SKU, products.deleteProduct);

		console.log("Acme server has started...");

		app.listen(8888);
}());