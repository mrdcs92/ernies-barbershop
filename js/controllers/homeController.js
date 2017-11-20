// homeController.js

(function () {

    "use strict";

    angular.module("app")
        .controller("homeController", homeController);

    function homeController() {

        var vm = this;
        vm.testing = "aha";

    }

})();