/**
 * Created by docker on 7/2/16.
 */

var Admin = angular.module('Admin', ["ngTable"]);

/**userService**/
Admin.service('userService', ['$http','$q', function ($http, $q) {

    _getData = function (page, count) {
        var message = {
            page: page,
            count: count
        }
        _getDataPromise =
            $http.post('/users.json', message).then(function (data) {
                if (data)
                    return data;
            },
            function (err) {
                return $q.reject(err);
            });
        return _getDataPromise;
    }

    _deleteUser = function (id) {
        var message = {
            userid: id
        };
        _deleteUserPromise =
            $http.post('/delete.json', message).then(function (data) {
                    if (data)
                        return data;
                },
                function (err) {
                    return $q.reject(err);
                });
        return _deleteUserPromise;

    }


    _userService = {
        _getData: _getData,
        deleteUser: _deleteUser
    }
    return _userService;
}
]);


Admin.controller('userCtrl', ['$scope','$window', 'NgTableParams','userService',
    function($scope, $window, NgTableParams, userService) {

        console.log('------------------->');
        var page = 1;
        var  count = 3;
        userService._getData(page, count)
            .then(function (users) {
                console.log('---------------->data', users.data.length);
                $scope.totaluser = users.data.length;
                $scope.tableParams = new NgTableParams({page: 1, count: 10},
                    {
                        dataset: users.data
                    });
            });

        // $scope.tableParams = new NgTableParams({page: 1, count: 3},
        //     {
        //          //dataset: data
        //         getData: function (params) {
        //             console.log('---------------->in getDate', params );
        //             var page = 1;
        //             var  count = 3;
        //             return userService._getData(page, count)
        //                 .then(function (users) {
        //                     console.log('---------------->data', users.data.length);
        //                     params.total(users.data.length);
        //                     return users.data;
        //                     // $defer.resolve(users.data);
        //                 });
        //         }
        //     });


        $scope.DeleteUser = function (id) {
            console.log('--------------->', id);
            userService.deleteUser(id)
                .then(function (res) {
                    //reload
                    console.log('--------------->', res);
                    $scope.tableParams.reload();

            });


        }

        // $scope.$watch($scope.tableParams, function () {
        //     console.log('--------------->');
        //     $scope.tableParams.reload();
        // })

    }
]);



