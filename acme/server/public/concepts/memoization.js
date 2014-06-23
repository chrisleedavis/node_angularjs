/*
	Memoization: cache previous results to increase performance by not having to 
					run through the entire function
 */
(function() {
	"use strict";

	var valueCache = {},
		cacheUsed = false,
		totalAmount = 0;

	function overlyComplexFunction(peopleCount) {

		var amount = valueCache[peopleCount];

		if (typeof amount !== "undefined") {
			cacheUsed = true;
		} else {

			amount = 0;

			//normally wouldn't do this but nice to simulate inefficiency
			for (var i = 0; i < peopleCount; i++) {
				amount += i;
			}
			valueCache[peopleCount] = amount;
			cacheUsed = false;
		}

		return amount;
	}

	function outputResults() {
		console.log(totalAmount);
		console.log(cacheUsed);
	}

	totalAmount = overlyComplexFunction(2);
	outputResults();
	totalAmount = overlyComplexFunction(10);
	outputResults();
	totalAmount = overlyComplexFunction(15);
	outputResults();
	totalAmount = overlyComplexFunction(2);
	outputResults();
	totalAmount = overlyComplexFunction(15);
	outputResults();

}());