// hoursController.js

(function () {

    "use strict";

    angular.module("app")
        .controller("hoursController", ["$timeout", "$firebase", "$firebaseArray", hoursController]);

    function hoursController($timeout, $firebase, $firebaseArray) {

        var vm = this;
        vm.errorMessage = "";
        vm.successMessage = "";
    }

})();