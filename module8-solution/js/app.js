(function() {
    'use strict';

    angular.module("NarrowItDownApp", [])
        .controller("NarrowItDownController", NarrowItDownController)
        .service("MenuSearchService", MenuSearchService)
        .directive("foundItems", FoundItems)
        .directive("loader", Loader)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");


    /**
     * NarrowItDownController: handle main functionality of the narrowItDown app.
     */
    NarrowItDownController.$inject = ["MenuSearchService"];
    function NarrowItDownController(MenuSearchService) {
        let narrowItDown = this;
        narrowItDown.found = [];         // matched menu items array after searched
        narrowItDown.searchVal = "";     // the input text box value
        narrowItDown.empty = false;      // indicating if nothing found or empty input box
        narrowItDown.isLoading = false;  // indicating loading status

        // a method to search items based on the search value
        narrowItDown.searchItems = function() {
            narrowItDown.empty = false;
            narrowItDown.found = [];

            // display nothing found if text box is empty
            if(!narrowItDown.searchVal) {
                narrowItDown.empty = true;
                return;
            }

            // start retriving data from the server
            narrowItDown.isLoading = true;
            MenuSearchService.getMatchedMenuItems(narrowItDown.searchVal)
                .then(function(result) {
                    narrowItDown.isLoading = false;
                    narrowItDown.found = result;

                    if(result.length === 0) {
                        narrowItDown.empty = true;
                    }
                })
                .catch(function(error) {
                    console.error(error);
                    narrowItDown.isLoading = false;
                    narrowItDown.empty = true;
                });

        }

        // a method to remove an item based on the index in the found array
        narrowItDown.removeItem = function(index) {
            this.found.splice(index, 1);
        }
    }

    /**
     * MenuSearchService: handle searching menu items from the database
     */
    MenuSearchService.$inject = ["$http", "ApiBasePath"];
    function MenuSearchService($http, ApiBasePath) {
        let service = this;

        // a method to get all menu items from the database, and then filter items based on the search term.
        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: `${ApiBasePath}/menu_items.json`,
            }).then(function(result) {
                var foundItems = [];  // the array to store items that match

                if(result && result.data) {
                    // loop each category
                    for(let c in result.data) {
                        let category = result.data[c];
                        let menuItems = category.menu_items;

                        // loop each menu item in a category to find match item
                        for(let item of menuItems) {
                            if(item.description.indexOf(searchTerm) >= 0) {
                                foundItems.push(item);  // add match item to the array
                            }
                        }
                    }
                }

                // return processed items
                return foundItems;
            });
        }
    }

    /**
     * FoundItems: A Directive to handle a list of found items in the UI
     */
    function FoundItems() {
        let ddo = {
            restrict: 'E',
            templateUrl: `foundItems.html`,
            scope: {
                foundItems: '<',
                removeItem: '& onRemove',
            },
            transclude: true,
        };

        return ddo;
    }

    /**
     * Loader: A Directive to display/hide loader during the searching
     */
    function Loader() {
        let ddo = {
            templateUrl: `loader/itemsloaderindicator.template.html`,
            controller: NarrowItDownController,
            controllerAs: 'narrowItDown',
            bindToController: true,
            link: LoaderDirectiveLink,
        };

        return ddo;
    }

    function LoaderDirectiveLink(scope, element, attrs, controller) {
        // console.log(scope, element, attrs, controller);

        scope.$watch('narrowItDown.isLoading', function(newValue, oldValue) {
            if(newValue === true) {
                showLoader();
            } else {
                hideLoader();
            }
        });

        function showLoader() {
            element.find('div').css('display', 'block');
        }

        function hideLoader() {
            element.find('div').css('display', 'none');
        }
    }

})();