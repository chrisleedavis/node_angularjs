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

            /*
             * This will attempt to use cache (from existing products list).  If there is
             *  no product list to work from, then it will go back to the server to load
             *  the product
             */
            Model.prototype.loadProduct = function(sku) {

                var self = this,
                    defer = $q.defer();

                //get from cache
                if (self.products && self.products.length > 0) {

                    self.product = _.find(self.products, function(p) {
                                       return p.sku === sku;
                                   });
                    defer.resolve(self.product);

                } else { //pull from server if cache not available
                    productService.get({ sku: sku }, function(data) {

                        self.product = data.d;
                        defer.resolve(self.product);
                    },
                    function(errorResponse) {

                        console.log(errorResponse); //todo: real error handling

                    });
                }

                return defer.promise;
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

            Model.prototype.saveProduct = function() {

                var self = this,
                    defer = $q.defer(),
                    saveOperation = self.product.id && self.product.id > 0 ? "update" : "save";

                productService[saveOperation](self.product, function(data) {

                    self.product = data.d;
                    defer.resolve(self.product);
                },
                function(errorResponse) {

                    console.log(errorResponse); //todo: real error handling

                });

                return defer.promise;
            };

            Model.prototype.deleteProduct = function(sku) {

                var self = this,
                    defer = $q.defer();

                productService["delete"]({ sku: sku }, function(data) {

                    defer.resolve(data);
                },
                function(errorResponse) {

                    console.log(errorResponse); //todo: real error handling

                });

                return defer.promise;
            };

            return new Model();

        }]);

}(angular));