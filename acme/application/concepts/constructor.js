/*
	Create User object using a closure to show how private 'members' can be created
	within JavaScript

	todo: add custom dirty flag
	
 */
(function() {
	"use strict";

	var nickname, user;

	//constructor
	function User(options) {

		if (this instanceof User === false) {

			if (!options) {
				options = {};
			}
			options.messages = ["hey, you're not instantiating User correctly!, will fix it for you..."];
			return new User(options);
		}

		if (options) {
			for (var prop in options) {
				this[prop] = options[prop];
			}
		}

		return this;
	}

	User.prototype = {
		saySomething: function(message) {

			if (!this.messages) {
				this.messages = [];
			}

			if (this.name) {
				this.messages.push(this.name + " says: " + message);
			} else {
				this.messages.push(message);	
			}
		},

		getNickname: function() {
			return nickname;
		},

		setNickname: function(nn) {
			nickname = nn;
		}	
	};

	CPTS.User = User;

}());