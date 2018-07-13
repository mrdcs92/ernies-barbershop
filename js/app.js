// app.js

(function () {

    "use strict";

    var app = angular.module("app", ["ngRoute", "firebase"]);

    app.config(function ($routeProvider) {

        $routeProvider.when("/", {
            controller: "homeController",
            controllerAs: "vm",
            templateUrl: "./views/homeView.html"
        });

        $routeProvider.when("/about", {
            controller: "homeController",
            controllerAs: "vm",
            templateUrl: "./views/aboutView.html"
        });

        $routeProvider.when("/bookings", {
            controller: "homeController",
            controllerAs: "vm",
            templateUrl: "./views/bookView.html"
        });

        $routeProvider.when("/blog", {
            controller: "blogController",
            controllerAs: "vm",
            templateUrl: "./views/blogView.html"
        });

        $routeProvider.when("/login", {
            controller: "authController",
            controllerAs: "vm",
            templateUrl: "./views/authView.html"
        });

        $routeProvider.when("/edit", {
            controller: "editController",
            controllerAs: "vm",
            templateUrl: "./views/editView.html",
            authenticated: true
        });

        $routeProvider.when("/hours", {
            controller: "hoursController",
            controllerAs: "vm",
            templateUrl: "./views/hoursView.html",
            authenticated: true
        });

        $routeProvider.otherwise({ redirectTo: "/" });

    });

    app.run(["$rootScope", "$location", "$firebase", "$firebaseAuth", function ($rootScope, $location, $firebase, $firebaseAuth, ) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            // If route is authenticated, check if user is authenticated
            if (next.$$route.authenticated) {
                var auth = $firebaseAuth();
                auth.$onAuthStateChanged(function (firebaseUser) {
                    if (!firebaseUser) {
                        $location.path("/");
                    }
                });
            }
        });
    }])


})();
