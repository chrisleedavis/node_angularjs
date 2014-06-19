/**
 * Main js file for starting the application/server (acme)
 *  - main bootstrapping of server will be handled here
 */
(function() {
	"use strict";

	var server = require("./server"),
		router = require("./router");

	server.start(router.route);
	

}());