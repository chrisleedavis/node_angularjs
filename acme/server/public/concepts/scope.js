/**
 *	Global - can be referenced anywhere, placed on root object (browser = window)
 * 	Local - scopes at a function level
 *
 * 	!!! if you forget var, it will be placed on global scope
 * 
 */
var scopeTest = "foo"; //global, should be placed on window obj

(function() {

	var test = "hello"; //should be local within current function

	foo = "bar" //should be placed on global window object


	//TEST variables
	console.log(window.scopeTest);
	console.log(window.test);
	console.log(test);
	console.log(window.foo);

}());