(function() {
    'use strict';

    angular.module('data')
        .controller('ItemsController', ItemsController);


    /**
     * ItemsController: used to retrieve items data from route resolve,
     * and pass data into the items component.
     */
    ItemsController.$inject = ['items'];
    function ItemsController(items) {
        // console.log(items);
        let myItems = this;

        if(items) {
            let category = items.category;
            myItems.categoryName = `(${category.short_name}) - ${category.name}`;
            myItems.items = items.menu_items;
        }
    }
})();
