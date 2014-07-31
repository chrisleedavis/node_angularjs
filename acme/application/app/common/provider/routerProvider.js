/**
 * 	Global router for application, can be used when route/views are simple:
 * 		1. route is basic /application/controller?blah
 *      2. there's only 1 dynamic view (ui-view) per application
 *      3. template to display equals route
 *      4. template name will be [application].[template] (i.e. acme.productCtrl)
 *
 */
(function(angular) {
	"use strict";

	angular.module("acmeProvider")
	.provider("acmeRouter", ["$stateProvider", "$urlRouterProvider",
	    function($stateProvider, $urlRouterProvider) {

			return {
				init: function(options) {

					var otherwiseRoute = options.otherwiseRoute || "/",
					    currentRoute,
					    getRoute = function($stateParams) {

					        if ($stateParams.subdirectory) {
                                return "/templates/" + options.application + "/" + $stateParams.subdirectory + "/_" + $stateParams.template + ".html";
					        } else {
					            return "/templates/" + options.application + "/_" + $stateParams.template + ".html";
					        }
					    },
                        checkOtherwiseNeeded = function($stateParams) {

                            //if state invalid, redirect to otherwise route
                            if (!options.application || !$stateParams.template) {
                                window.location = otherwiseRoute;
                            }
                        },
                        // inject appropriate services into resolver, make sure promise is returned so route can be stopped if validation fails (reject)
                        routeValidationResolver = {
                            validateRoute: ["$q", "$stateParams", "$templateCache", function($q, $stateParams, $templateCache) {

                                var defer = $q.defer(),
                                    isRouteInTemplateCache;

                                //check if template/route exists within template cache and if it doesn't fail the route
                                if ($stateParams.template) {

                                    currentRoute = getRoute($stateParams);
                                    isRouteInTemplateCache = $templateCache.get(currentRoute);

                                    if (isRouteInTemplateCache) {
                                        defer.resolve();
                                    } else {
                                        defer.reject(); //stop the route from continuing
                                    }

                                } else {
                                    defer.resolve(); //no template provided, should use default state route below OR home
                                }

                                return defer.promise;
                            }]
                        },
                        routeResolver = function($stateParams) {

                            checkOtherwiseNeeded($stateParams);
                            return currentRoute || getRoute($stateParams);
                        };

					$stateProvider
				        .state("Default", {
				            url: "",
				            views: {
				                "defaultView": {
				                    templateUrl: function($stateParams) {

				                    	return "/templates/" + options.application + "/_home.html";
				                    }
				                }
				            },
                            resolve: routeValidationResolver
				        })
				        .state("RouteKey", {
				            url: "/:template",
				            views: {
				                "defaultView": {
				                    templateUrl: routeResolver
				                }
				            },
                            resolve: routeValidationResolver
				        })
				        .state("RouteKeyWithSubdirectory", {
				            url: "/:subdirectory/:template?sku",
				            views: {
				                "defaultView": {
				                    templateUrl: routeResolver
				                }
				            },
                            resolve: routeValidationResolver
				        });

					$urlRouterProvider.otherwise(otherwiseRoute);
				},

				$get: function() {

					return "router";
				}
			};

		}]);

}(angular));