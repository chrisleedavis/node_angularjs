/*
	Create a basic system to highlight how dependency injection could work using
	angularJS as a guide

    http://merrickchristensen.com/articles/javascript-dependency-injection.html

    - create an injector
        - through the injector, create a controller expecting a *service* to be injected
        - dynamically inject the service to test different behavior
 */
(function() {
     "use strict";

     var injector = {

             dependencies: {},

             //map the controller's dependencies to the dependency cache
             getDependencies: function(arr) {
                var self = this;
                return arr.map(function(value) {
                    return self.dependencies[value];
                });
             },

             //name here will be KEY used with controller/services for injection
             // e.g. function foo(BAR){}, BAR will be name registered here, dependency will be the concrete type of BAR
             register: function(name, dependency) {
                this.dependencies[name] = dependency;
             },

             process: function(target) {

                var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, //injector.js from angular
                    text = target.toString(),
                    args = text.match(FN_ARGS)[1].split(',');

                target.apply(target, this.getDependencies(args));
             }

         };

     CPTS.di = {};
     CPTS.di.injector = injector;

}());