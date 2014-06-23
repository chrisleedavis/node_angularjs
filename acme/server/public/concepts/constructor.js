/*
	Create User object using a closure to show how private 'members' can be created
	within JavaScript
	
 */
(function() {
	"use strict";

	var nickname, user;

	//constructor
	function User(options) {

		var keys;

		if (this instanceof User === false) {
			console.log("hey, you're not instantiating User correctly!, will fix it for you..."); 
			return new User(options);
		}

		if (options) {
			keys = Object.keys(options);
			for (var i = 0; i < keys.length; i++) {
				this[keys[i]] = options[keys[i]];
			}
		}

		return this;
	}

	User.prototype = {
		saySomething: function(message) {

			if (this.name) {
				console.log(this.name + " says: " + message);
			} else {
				console.log(message);	
			}
		},

		getNickname: function() {
			return nickname;
		},

		setNickname: function(nn) {
			nickname = nn;
		}	
	};

	user = new User({name: "Chris"});
	user.saySomething("is the bomb");
	console.log(user);

	//just for testing within console, add user to window
	window.user = user;

}());