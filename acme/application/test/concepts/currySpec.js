(function() {
	"use strict";

	describe("Curry Tests", function() {

		it("add1 should properly add 1 to the parameters passed into the curry function ", function() {

			expect(CPTS.add1(7)).toEqual(8);
			expect(CPTS.add1(10)).toEqual(11);
			expect(CPTS.add1(10, 5)).toEqual(16);

		});

	});

}());