(function() {
    'use strict';

    angular.module('data')
        .controller('CategoriesController', CategoriesController);


    /**
     * CategoriesController: used to retrieve categories data from route resolve,
     * and pass data into the categories component.
     */
    CategoriesController.$inject = ['categories'];
    function CategoriesController(categories) {
        // console.log(categories);
        var myCategories = this;
        myCategories.categories = categories;
    }

})();
