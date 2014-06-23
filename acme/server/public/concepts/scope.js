/**
 *	Global - can be referenced anywhere, placed on root object (browser = window)
 * 	Local - scopes at a function level
 *
 * 	!!! if you forget var, it will be placed on global scope
 * 
 */
var scopeTest = "foo"; //global, should be placed on window obj

(function() {
	"use strict";

	var test = "hello"; //should be local within current function

	//should be placed on global window object and generate error with strict mode
	//foo = "bar" 

}());