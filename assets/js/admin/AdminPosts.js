/**
 * Created by docker on 7/8/16.
 */

/**
 * Created by docker on 7/4/16.
 */
/**
 * Created by docker on 7/2/16.
 */

var Posts = angular.module('Posts', ["ngTable"]);

/**PostService**/
Posts.service('PostService', ['$http','$q', function ($http, $q) {

    _getData = function (page, count) {
        var message = {
            page: page,
            count: count
        }
        _getDataPromise =
            $http.post('/posts.json', message).then(function (data) {
                    if (data)
                        return data;
                },
                function (err) {
                    return $q.reject(err);
                });
        return _getDataPromise;
    }

    // _deletePost = function (id) {
    //     var message = {
    //         postid: id
    //     };
    //     _deletePostPromise =
    //         $http.post('/delete_post.json', message).then(function (data) {
    //                 if (data)
    //                     return data;
    //             },
    //             function (err) {
    //                 return $q.reject(err);
    //             });
    //     return _deletePostPromise;
    //
    // }


    // _loadUpdatePage = function (id) {
    //     var message = {
    //         postid: id
    //     };
    //     _updateViewPromise =
    //         $http.post('/update_view.json', message).then(function (data) {
    //                 if (data)
    //                     return data;
    //             },
    //             function (err) {
    //                 return $q.reject(err);
    //             });
    //     return _updateViewPromise;
    //
    //
    // }


    _updatePost = function (id) {
        var message = {
            postid: id
        };

        _updatePostPromise =
            $http.post('/update_post.json', message).then(function (data) {
                    if (data)
                        return data;
                },
                function (err) {
                    return $q.reject(err);
                });
        return _updatePostPromise;

    }




    _PostService = {
        _getData: _getData,
        // deletePost: _deletePost,
        updatePost: _updatePost,
        // loadUpdatePage: _loadUpdatePage
    }
    return _PostService;
}
]);


Posts.controller('PostCtrl', ['$scope','$window', 'NgTableParams','PostService',
    function($scope, $window, NgTableParams, PostService) {

        console.log('------------------->');
        var page = 1;
        var  count = 3;
        PostService._getData(page, count)
            .then(function (posts) {
                console.log('---------------->data', posts.data.length);
                $scope.totalPost = posts.data.length;
                $scope.tableParams = new NgTableParams({page: 1, count: 10},
                    {
                        dataset: posts.data
                    });
            });

        // $scope.deletePost = function (id) {
        //     console.log('--------------->', id);
        //     PostService.deletePost(id)
        //         .then(function (res) {
        //             //reload
        //             console.log('--------------->', res);
        //             $scope.tableParams.reload();
        //
        //         });
        // }

        // $scope.updateView = function (id) {
        //     console.log('------------>', id);
        //     PostService.loadUpdatePage(id)
        //         .then(function (res) {
        //             console.log('-------------->', res);
        //             // $scope.title_up = res.data.title;
        //             // $scope.author_up = res.data.author;
        //             // $scope.imagePath_up = res.data.imagePath;
        //             // $scope.detail_up = res.data.detail;
        //             // $scope.Content_up = res.data.Content;
        //             // $scope.createtime_up = res.data.createtime;
        //         })
        //
        // }


        $scope.updatePost = function(id){
            console.log('------------->', id);
            PostService.updatePost(id)
                .then(function (res) {
                    console.log('------------->', res);
                })


        }
    }
]);



