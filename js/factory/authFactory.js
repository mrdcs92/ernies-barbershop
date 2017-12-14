(function () {

    "use strict";

    angular.module("app")
        .factory("authFactory", ["$q", "$location", "$firebase", "$firebaseAuth", authFactory]);

    function authFactory($q, $location, $firebase, $firebaseAuth) {

        var ref = firebase.database().ref();
        var auth = $firebaseAuth();

        var service = {
            signIn: signIn,
            getAuth: getAuth,
            signOut: signOut
        };

        return service;

        // TRY TO REMOVE PERSISTENCE & SEE WHAT HAPPENS, or set boolean outside and resolve in promise
        function signIn(email, password) {
            $q.all(firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION))
                .then(function () {
                    // Existing and future Auth states are now persisted in the current
                    // session only. Closing the window would clear any existing state even
                    // if a user forgets to sign out.
                    // ...
                    // New sign-in will be persisted with session persistence.
                    return (auth.$signInWithEmailAndPassword(email, password)
                        .then(function () {
                            $location.path("/edit");
                        })
                        .catch(function (error) {
                            console.log("therer is a booboo error");
                        })
                    );
                })
                .catch(function (error) {
                    // Handle Errors here.
                    console.log("major error");
                    $(".jumbotron").append("<p>email or password is wrong.<p>")
                });
        }

        function getAuth() {
            var result = false;
            var user = auth.$getAuth();
            if (user) {
                console.log("Signed in as: " + user.uid);
                result = true;
            }
            else {
                console.log("Signed out");
            }
            return result;
        }

        function signOut() {
            auth.$signOut();
            console.log("Just signed out.");
        }

    }

})();