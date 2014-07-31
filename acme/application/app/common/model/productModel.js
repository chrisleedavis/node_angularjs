/**
 *  Model serving as a liaison between the application controllers and the API services (product specifically)
 */
(function(angular) {
    "use strict";

    angular.module("acmeModel").factory("acmeProductModel", ["acmeProductService", "$q",
        function(productService, $q) {

            var Model = function() {

                if (this instanceof Model === false) {
                    return new Model();
                }

                return this;
            };

            Model.prototype.loadProducts = function() {

                var self = this,
                    defer = $q.defer();

                productService.get({}, function(products) {

                    self.products = products.d;
                    defer.resolve(self.products);
                },
                function(errorResponse) {

                    console.log(errorResponse); //todo: real error handling

                });

                return defer.promise;
            };

            return new Model();

        }]);

}(angular));