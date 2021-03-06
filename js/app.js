// app.js

(function () {

    "use strict";

    var app = angular.module("app", ["ngRoute", "firebase", "angularUtils.directives.dirPagination"]);

    app.config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        
        $routeProvider.when("/", {
            controller: "homeController",
            controllerAs: "vm",
            templateUrl: "./views/homeView.html"
        });

        /*
        $routeProvider.when("/bookings", {
            controller: "homeController",
            controllerAs: "vm",
            templateUrl: "./views/bookView.html"
        });
        */

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

        /*
        $routeProvider.when("/bookings/zachlind", {
            controller: "homeController",
            controllerAs: "vm",
            templateUrl: "./views/zachlind.html"
        });

        $routeProvider.when("/bookings/gregcardona", {
            controller: "homeController",
            controllerAs: "vm",
            templateUrl: "./views/gregcardona.html"
        });
        */

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