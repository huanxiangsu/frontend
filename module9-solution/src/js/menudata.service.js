
(function() {
    'use strict';

    angular.module("data")
        .service("MenuDataService", MenuDataService)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

    /**
     * MenuDataService: handle retriving menu data from the database
     */
    MenuDataService.$inject = ["$http", "ApiBasePath"];
    function MenuDataService($http, ApiBasePath) {
        let service = this;

        service.getAllCategories = function() {
            return $http({
                method: "GET",
                url: `${ApiBasePath}/categories.json`,
            }).then(function(result) {
                if(result && result.data) {
                    return result.data;
                }
            }).catch(function(error) {
                console.error(error);
                return;
            });
        }

        service.getItemsForCategory = function(categoryShortName) {
            if(!categoryShortName) {
                return;
            }

            return $http({
                method: "GET",
                url: `${ApiBasePath}/menu_items/${categoryShortName}.json`,
            }).then(function(result) {
                if(result && result.data) {
                    return result.data;
                }
            }).catch(function(error) {
                console.error(error);
                return;
            });
        }
    }
})();