/**
 * Controller for handling all product item events
 *
 */
(function(angular) {
    "use strict";

    angular.module("acmeApp").controller("itemCtrl", ["$scope", "$stateParams", "acmeProductModel", function($scope, $stateParams, productModel) {

            var init = function() {

                    var sku = $stateParams.sku,
                        product = _.find(productModel.products, function(p) {
                            return p.sku === sku;
                        });

                    $scope.product = product;
                };

        init();

    }]);

}(angular));