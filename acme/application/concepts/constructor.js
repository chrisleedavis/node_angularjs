/*
	Create User object using a closure to show how private 'members' can be created
	within JavaScript, provide dirty checks with audit logs for nickname changes
	
 */
(function() {
	"use strict";

	var _nickname, user;

	//constructor
	function User(options) {

	    var initUser;

		if (this instanceof User === false) {

			if (!options) {
				options = {};
			}
			options.messages = ["hey, you're not instantiating User correctly!, will fix it for you..."];
			return new User(options);
		}

        this.init(options);

		return this;
	}

	User.prototype = {

	    init: function(options) {

            if (options) {
                for (var prop in options) {
                    this[prop] = options[prop];
                }
            }

            if (!this.messages) {
                this.messages = [];
            }

            if (!this.audit_nickname) {
                this.audit_nickname = [];
            }

            Object.defineProperty(this, "nickname", {

                get: function() {
                    return _nickname;
                },

                set: function(nickname) {

                    if (_nickname === nickname) {
                        this.isNicknameDirty = false;
                        this.messages.push("No change to nickname has been made");
                    } else {
                        this.isNicknameDirty = true;
                        this.audit_nickname.push({
                            changeDate: new Date(),
                            oldValue: _nickname,
                            newValue: nickname
                        });
                    }

                    _nickname = nickname;
                },

                enumerable: true,
                configurable: false
            });
	    },

		saySomething: function(message) {

			if (this.name) {
				this.messages.push(this.name + " says: " + message);
			} else {
				this.messages.push(message);	
			}
		}
	};

	CPTS.User = User;

}());