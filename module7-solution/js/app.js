(function() {
    'use strict';

    angular.module("ShoppingListCheckOff", [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService)
        .filter('tripleSign', TripleSignFilter);


    /**
     * ToBuyController: handle to buy list
     */
    ToBuyController.$inject = ["ShoppingListCheckOffService"];
    function ToBuyController(ShoppingListCheckOffService) {
        let toBuyList = this;

        // get toBuyList reference
        toBuyList.items = ShoppingListCheckOffService.getToBuyList();

        // function to call the service to buy the item
        toBuyList.buyItem = function(index) {
            ShoppingListCheckOffService.buyItem(index);
        }

        // function to call the service to check if the toBuyList is empty
        toBuyList.isEmpty = function() {
            return ShoppingListCheckOffService.isEmptyToBuyList();
        }
    }

    /**
     * AlreadyBoughtController: handle already bought list
     */
    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        let boughtList = this;

        // get boughtList reference
        boughtList.items = ShoppingListCheckOffService.getBoughtList();

        // function to call the service to check if the boughtList is empty
        boughtList.isEmpty = function() {
            return ShoppingListCheckOffService.isEmptyBoughtList();
        }
    }

    /**
     * ShoppingListCheckOffService: handle data sharing between the two controllers.
     */
    function ShoppingListCheckOffService() {
        let service = this;

        // initialize both buy and bought list
        let boughtList = [];
        let toBuyList = [
            { name: "Cookies", quantity: 10, pricePerItem: 1 },
            { name: "Apple", quantity: 5, pricePerItem: 1.5 },
            { name: "Roasted Chicken", quantity: 2, pricePerItem: 4.99 },
            { name: "Orange", quantity: 22, pricePerItem: 0.98 },
            { name: "Smart Water", quantity: 55, pricePerItem: 1.1 },
            { name: "Chocolate Milk", quantity: 4, pricePerItem: 2.2 },
        ];

        // return the reference of toBuyList
        service.getToBuyList = function() {
            return toBuyList;
        }

        // return the reference of boughtList
        service.getBoughtList = function() {
            return boughtList;
        }

        // check if buy list is empty
        service.isEmptyToBuyList = function() {
            return toBuyList.length === 0;
        }

        // check if bought list is empty
        service.isEmptyBoughtList = function() {
            return boughtList.length === 0;
        }

        // A service to handle buy item logic
        // Remove the item from the buy list and then push it to bought list.
        service.buyItem = function(index) {
            let toBuyItemArr = toBuyList.splice(index, 1);
            if(toBuyItemArr.length === 1) {
                boughtList.push(toBuyItemArr[0]);
            }
        }
    }

    // The custom filter to expand the string's first letter 3 times and return the new string
    // For example: $12.36 = $$$12.36
    function TripleSignFilter() {
        return function(str) {
            str = str || "";
            str = String(str);

            if(str) {
                let firstLetter = str[0];
                let tripleFirstLetter = firstLetter + firstLetter + firstLetter;
                str = tripleFirstLetter + str.substr(1);
            }

            return str;
        }
    }

})();