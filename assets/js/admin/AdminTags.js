/**
 * Created by docker on 7/4/16.
 */
/**
 * Created by docker on 7/2/16.
 */

var Tags = angular.module('Tags', ["ngTable"]);

/**tagService**/
Tags.service('tagService', ['$http','$q', function ($http, $q) {

    _getData = function (page, count) {
        var message = {
            page: page,
            count: count
        }
        _getDataPromise =
            $http.post('/tags.json', message).then(function (data) {
                    if (data)
                        return data;
                },
                function (err) {
                    return $q.reject(err);
                });
        return _getDataPromise;
    }
    
    //
    // _deleteTag = function (id) {
    //     var message = {
    //         tagid: id
    //     };
    //     _deleteTagPromise =
    //         $http.post('/delete_tag.json', message).then(function (data) {
    //                 if (data)
    //                     return data;
    //             },
    //             function (err) {
    //                 return $q.reject(err);
    //             });
    //     return _deleteTagPromise;
    //
    // }


    _tagService = {
        _getData: _getData,
        // deleteTag: _deleteTag
    }
    return _tagService;
}
]);


Tags.controller('tagCtrl', ['$scope','$window', 'NgTableParams','tagService',
    function($scope, $window, NgTableParams, tagService) {

        console.log('------------------->');
        var page = 1;
        var  count = 3;
        tagService._getData(page, count)
            .then(function (tags) {
                console.log('---------------->data', tags.data.length);
                $scope.totaltag = tags.data.length;
                $scope.tableParams = new NgTableParams({page: 1, count: 10},
                    {
                        dataset: tags.data
                    });
            });

        // $scope.deleteTag = function (id) {
        //     console.log('--------------->', id);
        //     tagService.deleteTag(id)
        //         .then(function (res) {
        //             //reload
        //             console.log('--------------->', res);
        //             $scope.tableParams.reload();
        //
        //         });
        // }
    }
]);



