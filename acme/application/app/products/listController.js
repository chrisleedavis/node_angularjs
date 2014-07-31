/**
 * Controller for handling all product list events
 *
 */
(function(angular) {
    "use strict";

    angular.module("acmeApp").controller("listCtrl", ["$scope", "acmeProductModel", function($scope, productModel) {

        var init = function() {

            //load up products for view
            productModel.loadProducts().then(function(products) {

                $scope.products = products;

            });

        };

        init();

    }]);

}(angular));