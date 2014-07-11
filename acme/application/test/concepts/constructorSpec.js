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

		it("should set the private member nickname appropriately, complete with audit logs", function() {

			var user = new CPTS.User(),
				foo = "foo",
				bar = "bar";

			user.nickname = foo;

			expect(user.nickname).toEqual(foo);
			expect(user._nickname).toBeUndefined(); //make sure private member is not accessible
			expect(user.audit_nickname.length).toEqual(1);
			expect(user.audit_nickname[0].oldValue).toBeUndefined();
			expect(user.audit_nickname[0].newValue).toEqual(foo);
			expect(user.isNicknameDirty).toBeTruthy();

			//make no change, verify logs
			user.nickname = foo;
			expect(user.audit_nickname.length).toEqual(1);
			expect(user.messages.length).toEqual(1);
			expect(user.messages[0]).toEqual("No change to nickname has been made");
			expect(user.isNicknameDirty).not.toBeTruthy();

			//make another change
			user.nickname = bar;
			expect(user.audit_nickname.length).toEqual(2);
			expect(user.audit_nickname[1].oldValue).toEqual(foo);
			expect(user.audit_nickname[1].newValue).toEqual(bar);
			expect(user.messages.length).toEqual(1);
			expect(user.isNicknameDirty).toBeTruthy();
		});

	});

}());