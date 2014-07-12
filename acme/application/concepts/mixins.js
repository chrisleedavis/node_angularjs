/*
	Should be able to add mixins to an existing object to extend the object's functionality

	- Object Foo will have default functionality
	- Including Object Bar as a mixin will extend Object Foo's functionality
 */
(function() {
	"use strict";

	function Foo() {

	    if (this instanceof Foo === false) {
	        return new Foo();
	    }

	    return this;
	}

	Foo.prototype = {
	    sayAnything: function() {},
	};

	var bar = {
          walkTheDog: function() {}
        };

	CPTS.mixins = {};
	CPTS.mixins.Foo = Foo;
	CPTS.mixins.bar = bar;

}());