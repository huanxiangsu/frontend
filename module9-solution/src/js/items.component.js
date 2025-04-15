(function() {
    'use strict';

    angular.module("data")
        .component('items', {
            templateUrl: `src/templates/items.template.html`,
            // controller: ItemsController,
            bindings: {
                items: '<',
            },
        });

    // function ItemsController() {
    //     var $ctrl = this;
    //     console.log($ctrl);
    //     $ctrl.$onInit = function() {
    //         console.log('items init');
    //     }
    // }
})();