/**
 * Created by developer on 16-7-12.
 */

var Home = angular.module('Home', ['ngSanitize']);

Home.service('HomeService', ['$http', function ($http) {

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



    _homeService = {
        getPostData: _getData,
    }
    return _homeService;

}])


Home.controller('HomeCtrl', ['$scope', 'HomeService', function ($scope, HomeService) {

    console.log('----------->');
    $scope.loadPage = function (page, count) {

        console.log('init------>');
        HomeService.getPostData(page, count)
            .then(function (res) {
                console.log('res--------->', res);
                $scope.PostList = res.data;
            })
        

    }

}])