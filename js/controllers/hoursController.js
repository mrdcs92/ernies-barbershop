// hoursController.js

(function () {

    "use strict";

    angular.module("app")
        .controller("hoursController", ["$timeout", "$firebase", "$firebaseArray", hoursContoller]);

    function hoursController($timeout, $firebase, $firebaseArray) {

        var vm = this;
        vm.errorMessage = "";
        vm.successMessage = "";
    }

})();