// authController.js

(function () {

    "use strict";

    angular.module("app")
        .controller("authController", ["$q", "$timeout", "$location", "$firebase", "$firebaseAuth", authController]);

    function authController($q, $timeout, $location, $firebase, $firebaseAuth) {

        var vm = this;
        var auth = $firebaseAuth();
        vm.errorMessage = "";
        vm.alreadySigned;
        
        vm.signIn = function () {
            // User stays logged in until window/tab is closed
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then(function () {
                    return (auth.$signInWithEmailAndPassword(vm.authEmail, vm.authPass)
                        .then(function () {
                            $location.path("/edit");
                        })
                        .catch(function (error) {
                            vm.errorMessage = "Email or Password is incorrect.";
                            $timeout(function () { vm.errorMessage = ""; }, 4000);
                            
                        })
                    );
                })
                .catch(function (error) {
                    vm.errorMessage = "Email or Password is incorrect.";
                    $timeout(function () { vm.errorMessage = ""; }, 4000);
                });
            vm.getAuth();
        };

        vm.getAuth = function () {
            auth.$onAuthStateChanged(function (firebaseUser) {
                if (firebaseUser) {
                    vm.alreadySigned = true;
                } else {
                    vm.alreadySigned = false;
                }
            });
        };

        vm.signOut = function () {
            auth.$signOut();
            vm.alreadySigned = false;
        }

        vm.verifyEmail = function () {
            if (firebase.auth().currentUser) {
                var user = firebase.auth().currentUser;
                user.sendEmailVerification().then(function () {
                    console.log("email sent");
                }).catch(function (error) {
                    // An error happened.
                    console.log("email not sent");
                });
            }
            else {
                console.log("either not signed in or log in still processing");
            }
        }

        vm.getAuth();

    }

})();
