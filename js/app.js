// app.js

(function () {

    "use strict";

    angular.module("app", ["ngRoute"])
        .config(function ($routeProvider) {

            $routeProvider.when("/", {
                controller: "homeController",
                controllerAs: "vm",
                templateUrl: "/views/homeView.html"
            });

        });

})();