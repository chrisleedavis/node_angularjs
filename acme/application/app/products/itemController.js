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
                        product;

                    productModel.loadProduct(sku).then(function(product) {

                       $scope.product = product;
                    });

                    $scope.saveProduct = function() {

                        //todo: real implementation
                        console.log("saving Product real soon...");
                    };

                    $scope.cancelEdit = function() {

                        $state.transitionTo("RouteKeyWithSubdirectory", {template: "list", subdirectory: "products"});
                    };
                };

        init();

    }]);

}(angular));