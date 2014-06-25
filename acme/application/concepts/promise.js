/*
	Creating promises from scratch is really pointless with ES 6 coming soonishhhhh....

	The functionality below will show the ES 6 Promise at work...I'm using Chrome so it
	works but it's not ready for primetime in other browsers:
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

	Feels very similar to the evolution of source maps support...
 */
(function(){
	"use strict";

	var setTimeout = window.setTimeout,
		Promise = window.Promise, 
		promise = new Promise(function(resolve, reject) {

			setTimeout(function() {
				console.log("custom promise is resolving");
				resolve("custom promise has resolved!");
			}, 10000);

		});

	console.log("promise test #1...");
	Promise.all(["foo", promise]).then(function(values) {
		console.log("from #1: " + values.join(""));
	}, function(error) {
		console.error(error);
	});

	console.log("promise test #2...");
	promise.then(function(value) {
		console.log("from #2: " + value);
		setTimeout(function() {
			console.log("promise test #2 ended");
		}, 5000);
	});
	
}());