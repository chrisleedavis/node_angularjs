/**
 * main entry point into front-end application
 */
(function(angular) {
    "use strict";

    angular.module("acmeApp", ["ngSanitize", "ui.bootstrap", "acmeModule", "acmeTemplates"])
        .config(["acmeRouterProvider", function(router) {

            //start up the client-side router
            router.init({
               application: "acme",
               otherwiseRoute: "error"
            });

        }]);

}(angular));