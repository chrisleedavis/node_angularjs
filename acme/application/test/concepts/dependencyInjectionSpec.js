(function() {
     "use strict";

     var injector = CPTS.di.injector,
         messages,
         petController = function(pet) {
            messages.push(pet.run());
         };

     beforeEach(function() {

        messages = [];

     });

     describe("Dependency Injection Tests", function() {

        it("should be able to inject the pet controller with a dog service to get the appropriate messages", function() {

            var message = "I run with 4 legs",
                dogService = {
                    run: function() {
                        return message;
                    }
                };

            injector.register("pet", dogService);
            injector.process(petController);

            expect(messages.length).toEqual(1);
            expect(messages[0]).toEqual(message);
        });

        it("should be able to inject the pet controller with a snake service to get the appropriate messages", function() {

            var message = "I don't have any legs so I slither",
                snakeService = {
                    run: function() {
                        return message;
                    }
                };

            injector.register("pet", snakeService);
            injector.process(petController);

            expect(messages.length).toEqual(1);
            expect(messages[0]).toEqual(message);
        });

        it("should be able to inject the pet controller with a child service to get the appropriate messages", function() {

            var message = "Wait a second, I'm not a pet",
                childService = {
                    run: function() {
                        return message;
                    }
                };

            injector.register("pet", childService);
            injector.process(petController);

            expect(messages.length).toEqual(1);
            expect(messages[0]).toEqual(message);
        });

     });

}());