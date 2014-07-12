/*
	Raising custom events from scratch, this will use some older functionality because of PhantomJS
	    - the idea is to create a custom event
	    - add a listener for the event
	    - trigger the event

	    https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
 */
(function() {
	"use strict";

	var eventsRaised = [],
	    event,
	    eventType = "FOO";

	function registerEventAndListener() {

        event = document.createEvent("Event");
        event.initEvent(eventType, true, true);

        document.addEventListener(eventType, function (e) {
           eventsRaised.push("BAR");
        }, false);
	}

	function triggerEvent() {

		document.dispatchEvent(event);
	}

    registerEventAndListener();
	CPTS.event = {};
	CPTS.event.triggerEvent = triggerEvent;
	CPTS.event.eventsRaised = eventsRaised;

}());