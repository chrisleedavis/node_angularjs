/**
 * Controller for handling all product item events
 *
 */
(function(angular) {
    "use strict";

    angular.module("acmeApp").controller("itemCtrl", ["$scope", "$stateParams", "$state", "acmeProductModel",
        function($scope, $stateParams, $state, productModel) {

            var init = function() {

                    var sku = $stateParams.sku,
                        product,
                        redirectToList = function() {
                            $state.transitionTo("RouteKeyWithSubdirectory", {template: "list", subdirectory: "products"});
                        };

                    productModel.loadProduct(sku).then(function(product) {

                       $scope.product = product;
                    });

                    $scope.saveProduct = function() {

                        productModel.saveProduct().then(function(product) {

                            $scope.product = product;
                            redirectToList();
                        });
                    };

                    $scope.cancelEdit = function() {

                         redirectToList();
                    };
                };

        init();

    }]);

}(angular));