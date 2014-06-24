/*
	this should house the global error handler (client-side) for the application
 */
(function(){
	"use strict";

	var superErrorHandler = window.onerror;

	window.onerror = function(errorMessage, url, lineNumber) {

		console.log("this global error handler is really working!!!");

		if (superErrorHandler) {
			superErrorHandler(errorMessage, url, lineNumber);
		}
	};

	throw "dang, it happened again";

}());