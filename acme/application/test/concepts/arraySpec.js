(function() {
	"use strict";

	describe("Array tests", function() {

		it("should successfully test the filtering of arrays", function() {

			var filteredArray = CPTS.filterByChris();

			expect(filteredArray.length).toEqual(2);
			expect(filteredArray[0]).toEqual({ id: 1, firstName: "chris", lastName: "davis"});
			expect(filteredArray[1]).toEqual({ id: 5, firstName: "chris", lastName: "perkins"});
		});

		it("should successfully test if David Waters is present in the test array", function() {

			expect(CPTS.isDavidWatersPresent()).toBeTruthy();

			CPTS.testArray.pop(); //remove David Waters now

			expect(CPTS.isDavidWatersPresent()).not.toBeTruthy();
		});

	});

}());