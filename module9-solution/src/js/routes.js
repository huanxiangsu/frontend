(function() {
    'use strict';

    angular.module("MenuApp")
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'src/templates/home-main.template.html'
            })

            .state('categories', {
                url: '/categories',
                templateUrl: 'src/templates/categories-main.template.html',
                controller: 'CategoriesController as myCategories',
                resolve: {
                    categories: ['MenuDataService',
                        function(MenuDataService) {
                            return MenuDataService.getAllCategories();
                        }
                    ]
                }
            })

            .state('items', {
                url: '/items/{category}',
                templateUrl: 'src/templates/items-main.template.html',
                controller: 'ItemsController as myItems',
                resolve: {
                    items: ['$stateParams', 'MenuDataService',
                        function($stateParams, MenuDataService) {
                            return MenuDataService.getItemsForCategory($stateParams.category);
                        }
                    ]
                }
            });
    }

})();