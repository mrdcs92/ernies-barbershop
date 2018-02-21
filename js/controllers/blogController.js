// blogController.js

(function () {

    "use strict";

    angular.module("app")
        .controller("blogController", ["$firebase", "$firebaseArray", blogController]);

    function blogController($firebase, $firebaseArray) {

        var vm = this;

        var postsRef = firebase.database().ref().child("posts");
        postsRef = postsRef.orderByChild("timestamp");
        vm.blogPosts = $firebaseArray(postsRef);

    }

})();