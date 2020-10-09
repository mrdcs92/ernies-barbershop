// editController.js

(function () {

    "use strict";

    angular.module("app")
        .controller("editController", ["$timeout", "$firebase", "$firebaseArray", editController]);

    function editController($timeout, $firebase, $firebaseArray) {

        var vm = this;
        vm.errorMessage = "";
        vm.successMessage = "";
        vm.newPost = {};
        vm.currentPage = 1;
        vm.pageSize = 6;

        var postsRef = firebase.database().ref().child("posts");
        postsRef = postsRef.orderByChild("timestamp");
        vm.blogPosts = $firebaseArray(postsRef);

        vm.addPost = function () {
            vm.newPost.postDate = formatDate();
            vm.newPost.shortMsg = formatMessage(vm.newPost.postMessage);
            vm.newPost.$id = "";
            vm.newPost.postTitle = vm.tempTitle;
            vm.newPost.timestamp = firebase.database.ServerValue.TIMESTAMP;

            vm.blogPosts.$add(vm.newPost).then(function (ref) {
                var id = ref.key;
                vm.blogPosts[vm.blogPosts.$indexFor(id)].timestamp *= -1;
                vm.blogPosts.$save(vm.blogPosts.$indexFor(id)).then(function (newRef) {
                    vm.successMessage = "Blog post added!";
                    $timeout(function () { vm.successMessage = ""; }, 4000);
                }).catch(function (error) {
                    vm.errorMessage = "Error saving blog post.";
                    console.log(error);
                    $timeout(function () { vm.errorMessage = ""; }, 4000);
                });
                vm.clearPost();
            }).catch(function (error) {
                vm.errorMessage = "Error saving blog post.";
                console.log(error);
                $timeout(function () { vm.errorMessage = ""; }, 4000);
            });
        }

        vm.updatePost = function () {
            vm.newPost.postTitle = vm.tempTitle;
            vm.newPost.shortMsg = formatMessage(vm.newPost.postMessage);

            vm.blogPosts.$save(vm.blogPosts.$indexFor(vm.newPost.$id)).then(function (newRef) {
                vm.successMessage = "Blog post updated!";
                $timeout(function () { vm.successMessage = ""; }, 4000);
            }).catch(function (error) {
                vm.errorMessage = "Error updating blog post.";
                $timeout(function () { vm.errorMessage = ""; }, 4000);
            });
            vm.clearPost();
        }

        vm.deletePost = function () {
            vm.blogPosts.$remove(vm.blogPosts.$indexFor(vm.newPost.$id)).then(function (newRef) {
                vm.successMessage = "Blog post deleted!";
                $timeout(function () { vm.successMessage = ""; }, 4000);
                //console.log(newRef);
            }).catch(function (error) {
                vm.errorMessage = "Error deleting blog post.";
                timeout(function () { vm.errorMessage = ""; }, 4000);
            });
            vm.clearPost();
        }

        vm.clearPost = function () {
            vm.newPost = {};
            vm.tempTitle = "";
        }

        vm.getPost = function (post) {
            var tempPost = post.postTitle.toString();
            vm.newPost = post;
            vm.tempTitle = tempPost;
        }

        vm.pageChangeHandler = function(num) {
        };

        function formatDate() {
            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];
            var date = new Date();
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + ' ' + monthNames[monthIndex] + ' ' + year;
        }

        function formatMessage(message) {
            if (message.length >= 70) {
                var newMsg = message.slice(0, 67);
                message = newMsg + "...";
            }
            return message;
        }

    }

    // Applied globally on all textareas with the "autoExpand" class
    $(document)
        .one('focus.autoExpand', 'textarea.autoExpand', function () {
            var savedValue = this.value;
            this.value = '';
            this.baseScrollHeight = this.scrollHeight;
            this.value = savedValue;
        })
        .on('input.autoExpand', 'textarea.autoExpand', function () {
            var minRows = this.getAttribute('data-min-rows') | 0, rows;
            this.rows = minRows;
            rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
            this.rows = minRows + rows;
        });

})();
