/**
 * Controller for handling all product list events
 *
 */
(function(angular) {
    "use strict";

    angular.module("acmeApp").controller("listCtrl", ["$scope", "$state", "acmeProductModel",
        function($scope, $state, productModel) {

            var loadProducts = function() {

                    //load up products for view
                    productModel.loadProducts().then(function(products) {

                        $scope.products = products;

                    });
                },

                init = function() {

                    loadProducts();

                    $scope.createProduct = function() {

                        productModel.product = { id: -1, sku: null, description: null, isValid: true, errors: [] };
                        $state.transitionTo("RouteKeyWithSubdirectory",
                            { template: "item", subdirectory: "products" }); //sku will be null for new product

                    };

                    $scope.deleteProduct = function(sku) {

                        productModel.deleteProduct(sku).then(function(data) {

                             loadProducts();
                        });

                    };

                };

        init();

    }]);

}(angular));