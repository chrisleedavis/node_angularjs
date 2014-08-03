/**
 * Controller for handling active flag for main nav bar
 *
 */
(function(angular) {
    "use strict";

    angular.module("acmeApp").controller("navCtrl", ["$scope", "$stateParams",
        function($scope, $stateParams) {

            var init = function() {

                    $scope.isActive = function(subdirectory) {
                        return subdirectory === $stateParams.subdirectory;
                    };

                };

        init();

    }]);

}(angular));