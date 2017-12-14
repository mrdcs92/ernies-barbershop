// editController.js

(function () {

    "use strict";

    angular.module("app")
        .controller("editController", ["$firebase", "$firebaseArray", editController]);

    function editController($firebase, $firebaseArray) {

        var vm = this;
        vm.newPost = {};
        var postsRef = firebase.database().ref().child("posts");

        // FIX TO MAKE SURE IT SHOW MOST RECENT POST AT TOP.
        postsRef = postsRef.orderByChild("timestamp");
        //vm.blogPosts = postsRef;
        //console.log(postsRef);
        var notOrdered = $firebaseArray(postsRef);
        //var ordered = $firebaseArray(query);
        console.log(notOrdered);
        //console.log(ordered);
        //var testArray = vm.blogPosts.reverse();
        //console.log(testArray);
        vm.blogPosts = $firebaseArray(postsRef);
        vm.blogPosts = vm.blogPosts.reverse();


        vm.addPost = function () {
            console.log("this should only hit when the form is valid");
            vm.newPost.postDate = formatDate();
            

            vm.newPost.shortMsg = formatMessage(vm.newPost.postMessage);
            vm.newPost.timestamp = firebase.database.ServerValue.TIMESTAMP;
            console.log(vm.newPost);

            vm.blogPosts.$add(vm.newPost).then(function (ref) {
                var id = ref.key;
                //console.log("added record with id " + id);
                console.log("this is the index for that most recent one");
                console.log(vm.blogPosts.$indexFor(id));
                //console.log(vm.blogPosts[vm.blogPosts.$indexFor(id)]);
                console.log("This is just the timestamp:");
                console.log(vm.blogPosts[vm.blogPosts.$indexFor(id)].timestamp);
                vm.blogPosts[vm.blogPosts.$indexFor(id)].timestamp *= -1;
                vm.blogPosts.$save(vm.blogPosts.$indexFor(id)).then(function (newRef) {
                    console.log("did it work");
                });

                vm.newPost = {};
            });
        }

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
