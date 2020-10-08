// blogController.js

(function () {

    "use strict";

    angular.module("app")
        .controller("blogController", ["$firebase", "$firebaseArray", blogController]);

    function blogController($firebase, $firebaseArray) {

        var vm = this;
        vm.currentPage = 1;
        vm.pageSize = 5;

        var postsRef = firebase.database().ref().child("posts");
        postsRef = postsRef.orderByChild("timestamp");
        vm.blogPosts = $firebaseArray(postsRef);

        vm.pageChangeHandler = function(num) {
            console.log('meals page changed to ' + num);
        };

    }

})();