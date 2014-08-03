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
		app.use(express.static("app")); //for source map help
		app.use(express.static("concepts")); //for source map help
		app.use(express.static("lib")); //for source map help

		// parse application/json
		app.use(bodyParser.json());

		// parse application/vnd.api+json as json
		app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

		//web api routing
		app.get(API_ROOT, products.findAllProducts);
		app.get(API_ROOT_SKU, products.findProduct);
		app.put(API_ROOT_SKU, products.updateProduct);
		app["delete"](API_ROOT_SKU, products.deleteProduct);

		/*
		 * a bit non-standard here by not using API_ROOT with post...then why do it?
		 *  - normal posts generally should not have a anything but a payload but because 'sku' is used
		 *      within the angular service for updates/PUT, NG automatically adds it to the url
		 *
		 *      there were 2 options (1. create special NG service for this, 2. OR just add sku to post)
		 *      - option #2 was chosen for simplicity
		 */
		app.post(API_ROOT_SKU, products.addProduct);


		console.log("Acme server has started...");

		app.listen(8888);
}());