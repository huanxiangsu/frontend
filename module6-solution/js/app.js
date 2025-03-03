(function() {
    'use strict';

    angular.module("LunchCheck", []).controller("LunchCheckController", LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchNames = "";  // lunch input box value
        $scope.lunchMessage = "";  // resulting message for the lunch input

        // the check button onclick function
        $scope.checkLunchNames = function() {
            // split the lunch input and count the number of item
            // empty item like " " does not consider as a countable valid input
            let names = $scope.lunchNames.split(',');
            let nameCount = 0;
            for(let name of names) {
                if(name.trim()) {
                    ++nameCount;
                }
            }

            // handle empty input or no valid input like ", ,"
            if(nameCount === 0) {
                $scope.lunchMessage = "Please enter data first";
                // set input box border to red and set message color to red
                $scope.borderColor = "border-danger";
                $scope.textColor = "text-danger";
                return;
            }

            // handle resulting item count and display corresponding message
            if(nameCount <= 3) {
                $scope.lunchMessage = "Enjoy!";
            } else {
                $scope.lunchMessage = "Too much!";
            }
            // set input box border to green and set message color to green
            $scope.borderColor = "border-success";
            $scope.textColor = "text-success";
        }
    }
})();