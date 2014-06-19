/**
 * Create http server for web content and api
 *
 */
(function() {
	"use strict";

	var http = require("http"),
		url = require("url"),

		start = function(route) {

			var onRequest = function(request, response) {

				var pathname = url.parse(request.url).pathname;
				route(pathname, response);
			};

			http.createServer(onRequest).listen(8888);
			console.log("Acme server has started");
		};

	exports.start = start;
	

}());