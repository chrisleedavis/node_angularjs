(function() {
	"use strict";

	describe("Constructor Tests", function() {

		it("should instantiate user correctly without the 'new' keyword", function() {

			var user = CPTS.User();

			expect(user instanceof CPTS.User).toBeTruthy();
			expect(user.messages.length).toEqual(1);
			expect(user.messages[0]).toEqual("hey, you're not instantiating User correctly!, will fix it for you...");

		});


		it("should instantiate user correctly applying options to the new user", function() {

			var options = { foo: "bar", test: "me" },
				user = new CPTS.User(options);

			expect(user instanceof CPTS.User).toBeTruthy();
			expect(user.foo).toEqual("bar");
			expect(user.test).toEqual("me");
		});

		it("should say something appropriate when no name is provided", function() {

			var user = new CPTS.User(),
				message = "fooBar";

			user.saySomething(message);
			expect(user.messages.length).toEqual(1);
			expect(user.messages[0]).toEqual(message);
		});

		it("should say something appropriate WHEN NAME IS provided", function() {
			
			var user = new CPTS.User({name: "Chris"}),
				message = "fooBar";

			user.saySomething(message);
			expect(user.messages.length).toEqual(1);
			expect(user.messages[0]).toEqual("Chris says: " + message);
		});

		it("should set the private member nickname appropriately", function() {

			var user = new CPTS.User(),
				nickname = "foo";

			user.setNickname(nickname);

			expect(user.getNickname()).toEqual(nickname);
			expect(user.nickname).toBeUndefined();
		});

	});

}());