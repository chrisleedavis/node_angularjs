(function() {
	"use strict";

	var totalAmount;

	beforeEach(function() {
		totalAmount = 0;
	});

	describe("Memoization Tests", function() {

		it("successfully use memoization with value of 2", function() {

			totalAmount = CPTS.memoization.overlyComplexFunction(2);

			expect(totalAmount).toEqual(1);
			expect(CPTS.memoization.wasCacheUsed()).not.toBeTruthy();

			//let memoization kick in after using same parameter
			totalAmount = CPTS.memoization.overlyComplexFunction(2);

			expect(totalAmount).toEqual(1);
			expect(CPTS.memoization.wasCacheUsed).toBeTruthy();
		});

		it("successfully use memoization with value of 10", function() {

			totalAmount = CPTS.memoization.overlyComplexFunction(10);

			expect(totalAmount).toEqual(45);
			expect(CPTS.memoization.wasCacheUsed()).not.toBeTruthy();
		});

		it("successfully use memoization with value of 15", function() {

			totalAmount = CPTS.memoization.overlyComplexFunction(15);

			expect(totalAmount).toEqual(105);
			expect(CPTS.memoization.wasCacheUsed()).not.toBeTruthy();

			//let memoization kick in after using same parameter
			totalAmount = CPTS.memoization.overlyComplexFunction(15);

			expect(totalAmount).toEqual(105);
			expect(CPTS.memoization.wasCacheUsed()).toBeTruthy();
		});

	});

}());