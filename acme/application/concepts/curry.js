/*
	Curry: product a new function by combining a function and an argument
	- 	create a closure that, when invoked, returns the result of calling that original
		function, passing it all of the arguments from the invocation of the curry
 */
(function(){
	"use strict";

	var add1;

	//add all arguments together
	function add() {

		var value = 0;

		for (var i = 0; i < arguments.length; i++) {
			value += arguments[i];
		}

		return value;
	}

	/*
		variables: slice, args, self will be referenced via closure
		- self will be function add from above (via add.curry(1))
		- take args which was initially set (via add.curry(1))
			and concat the incoming arguments with the original args
			then passing the new array into self (or add from above)
		- slice is used here to convert the arguments collection over to 
			a traditional array (so concat can be used)
	 */
	Function.prototype.curry = function() {

		//variables referenced with the function below via closure
		var slice = Array.prototype.slice,
			args = slice.apply(arguments), 
			self = this;

		return function() {
			return self.apply(null, args.concat(slice.apply(arguments)));
		};
	};

	add1 = add.curry(1);
	CPTS.add1 = add1;

}());