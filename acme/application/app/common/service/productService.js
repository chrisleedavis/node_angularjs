/**
 *  Service used to communicate with the product api
 */
(function(angular) {
    "use strict";

    angular.module("acmeService").factory("acmeProductService", ["acmeResourceService",
        function(resourceService) {

            var productResource =  resourceService("api/products/:id",
                {
                    id: "@id"
                }, {});

            return productResource;
        }]);

}(angular));