/**
 * Handle all http requests for the server
 * - apply appropriate mime type for response
 * - make sure (if file), path exists
 */
(function() {
	"use strict";

	var path = require("path"),
		fs = require("fs"),

		mimeTypes = {
			plain: "text/plain",
			html: "text/html",
			jpeg: "image/jpeg",
			jpg: "image/jpeg",
			png: "image/png",
			js: "text/javascript",
			css: "text/css"
		},

		httpResponses = {
			SUCCESS: {
				code: 200,
				message: "Success"
			},
			NOT_FOUND: {
				code: 404,
				message: "404 - Not Found"
			},
			INTERNAL_SERVER_ERROR: {
				code: 500,
				message: "500 - Internal Server Error"
			}
		},

		getContentType = function(mimeType) {
			return { "Content-Type": mimeType };
		},

		//TODO: handle web api traffic???
		processValidRoute = function(filename, fsResult, response) {

			var mimeType, fileStream;

			//static content
			if (fsResult.isFile()) {

				mimeType = mimeTypes[path.extname(filename).split(".")[1]];
				response.writeHead(httpResponses.SUCCESS.code, getContentType(mimeType));
				fileStream = fs.createReadStream(filename);
				fileStream.pipe(response);
			}

			//regular site navigation, proceed
			else if (fsResult.isDirectory()) {

				response.writeHead(httpResponses.SUCCESS.code, getContentType(mimeTypes.plain));
				response.end();
			}

			//catch-all error
			else {
				response.writeHead(httpResponses.INTERNAL_SERVER_ERROR.code, getContentType(mimeTypes.plain));
				response.write(httpResponses.INTERNAL_SERVER_ERROR.message);
				response.end();
			}

		},

	    route = function(pathname, response) {
			
	    	var filename, fsResult;

	    	try {
	    		filename = path.join(process.cwd(), pathname);
    			fsResult = fs.lstatSync(filename);
	    	} catch (e) {
	    		response.writeHead(httpResponses.NOT_FOUND.code, getContentType(mimeTypes.plain));
	    		response.write(httpResponses.NOT_FOUND.message);
	    		response.end();
	    		return;
	    	}

	    	processValidRoute(filename, fsResult, response);

		};

	exports.route = route;

}());