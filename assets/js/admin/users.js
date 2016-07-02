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


    _userService = {
        _getData: _getData
    }
    return _userService;
}
]);


Admin.controller('userCtrl', ['$scope','$window', 'NgTableParams','userService',
    function($scope, $window, NgTableParams, userService) {

    console.log('------------------->');
    var self = this;
    var _data = [{username: "Moroni", email: '56444', password: '1234'},
        {username: "Moroni", email: '56444', password: '1234'},
        {username: "Moroni", email: '56444', password: '1234'},
        {username: "Moroni", email: '56444', password: '1234'},
        {username: "Moroni", email: '56444', password: '1234'},
        /*,*/];
    $scope.tableParams = new NgTableParams({page: 1, count: 3},
        {
            // dataset: data

            getData: function ($defer, params) {
                console.log('---------------->in getDate');
                var page = 1;
                var  count = 3;
                userService._getData(page, count)
                    .then(function (users) {
                        console.log('---------------->data', users.data);
                        $defer.resolve(users.data);
                    });
            }
        });
    // $scope.tableParams = new ngTableParams({},{dataset: data});
}]);



