/**
 * wrapper around $resource to ensure all API services have PUT method available
 *
 */
(function(angular) {
	"use strict";

	angular.module("acmeService")
		.config(["$httpProvider", function($httpProvider){

			 //IE likes to cache everything, Trident was introduced for IE with IE 9, version comes from rv
			 if (window.navigator.userAgent.indexOf("Trident") >= 0) {
                 $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache, no-store, must-revalidate";
                 $httpProvider.defaults.headers.common.Pragma = "no-cache";
                 $httpProvider.defaults.headers.common.Expires = "-1";
			 }
		}])
		.factory("acmeResourceService", ["$resource", "$http", function($resource, $http) {

			  var resourceService = function (url, params, customizedActions) {

                 //provide ability to add custom actions for api
                 return $resource(url, params || {}, _.extend({}, customizedActions || {}, { "update": {method:"PUT"} }));

			  };

			  return resourceService;
		  }]);

}(angular));