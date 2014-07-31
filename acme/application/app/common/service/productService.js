/**
 *  Service used to communicate with the product api
 */
(function(angular) {
    "use strict";

    angular.module("acmeService").factory("acmeProductService", ["acmeResourceService",
        function(resourceService) {

            var productResource =  resourceService("api/products/:sku",
                {
                    sku: "@sku"
                }, {});

            return productResource;
        }]);

}(angular));