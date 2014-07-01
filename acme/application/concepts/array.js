/*
	Underscore & Lodash are great utilities but it's really amazing to know
	how much of what I use from Lodash was really made available via ES5
 */
(function(){
	"use strict";

	var values = [
					{ id: 1, firstName: "chris", lastName: "davis"}, 
					{ id: 2, firstName: "bob", lastName: "smith"},
					{ id: 3, firstName: "foo", lastName: "bar"},
					{ id: 4, firstName: "bar", lastName: "foo"},
					{ id: 5, firstName: "chris", lastName: "perkins"},
					{ id: 6, firstName: "mike", lastName: "peters"},
					{ id: 7, firstName: "david", lastName: "waters"},
				],
		filterByChris = function() {
			return values.filter(function(users) {
				return users.firstName === "chris";
			});
		},
		isDavidWatersPresent = function() {
			return values.some(function(users) {
				return users.firstName === "david" && users.lastName === "waters";
			});
		};

    //provide namespace with items for testing
    CPTS.testArray = values;
	CPTS.filterByChris = filterByChris;
	CPTS.isDavidWatersPresent = isDavidWatersPresent;

}());