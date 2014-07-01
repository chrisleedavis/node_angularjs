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
		bodyParser = require('body-parser'),
		API_ROOT = "/api/products",
		API_ROOT_SKU = API_ROOT + "/:sku",
		app = express();

		//index.html, js, css
		app.use(express.static("public"));
		app.use(express.static("concepts")); //for source map help
		app.use(express.static("lib")); //for source map help

		// parse application/json
		app.use(bodyParser.json());

		// parse application/vnd.api+json as json
		app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

		//web api routing
		app.get(API_ROOT, products.findAllProducts);
		app.get(API_ROOT_SKU, products.findProduct);
		app.post(API_ROOT, products.addProduct);
		app.put(API_ROOT_SKU, products.updateProduct);
		app["delete"](API_ROOT_SKU, products.deleteProduct);

		console.log("Acme server has started...");

		app.listen(8888);
}());