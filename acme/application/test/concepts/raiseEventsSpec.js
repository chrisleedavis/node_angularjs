(function() {
     "use strict";

     describe("Raise Event Tests", function() {

        it("should be able to trigger custom events successfully", function() {

            var eventsRaised = CPTS.event.eventsRaised;

            expect(eventsRaised.length).toEqual(0);

            CPTS.event.triggerEvent();

            expect(eventsRaised.length).toEqual(1);
            expect(eventsRaised[0]).toEqual("BAR");

            CPTS.event.triggerEvent();

            expect(eventsRaised.length).toEqual(2);
            expect(eventsRaised[1]).toEqual("BAR");

        });

     });

}());