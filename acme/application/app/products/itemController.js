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
                        isNew = _.isNull(sku),
                        product,
                        redirectToList = function() {
                            $state.transitionTo("RouteKeyWithSubdirectory", {template: "list", subdirectory: "products"});
                        };

                    //is form for updating or creating new product?
                    if (!isNew) {
                        productModel.loadProduct(sku).then(function(product) {

                           $scope.product = product;
                        });
                    } else {
                        $scope.product = productModel.product; //should be new from listController
                    }

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