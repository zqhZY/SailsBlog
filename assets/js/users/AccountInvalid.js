var accountModule = angular.module('inputInvalid', []);

/**login Service**/
accountModule.service('accountService', ['$http', function ($http) {

    _login = function (account) {
        _loginPromise =
            $http.post('/login', account).then(function (data) {
                if (data)
                    return data;
            },
            function (err) {
                return $q.reject(err);
            });
        return _loginPromise;
    }

    _register = function (account) {
        _registerPromise =
            $http.post('/register', account).then(function (data) {
                    if (data)
                        return data;
                },
                function (err) {
                    return $q.reject(err);
                });
        return _registerPromise;

    }

    _accountService = {
        login: _login,
        register: _register
    }
    return _accountService;
}
]);


accountModule.controller('validateCtrl', ['$scope','$window', 'accountService', function($scope, $window, accountService) {

    /**
     * checkAccount when click login button
     *
     */
    $scope.checkAccount = function () {
        var curMail = $scope.email;
        var curPasswd = $scope.password;
        
        var account = {
            email: curMail,
            password: curPasswd
        }

        accountService.login(account).then(function (res) {
            var message = res.data.message;
            console.log('res------->', res);
            if (res.status == 200){
                if (message == 'Logged In Successfully')
                    $window.location.href = '/'
                else if(message == 'Incorrect email.')
                    $scope.invalid_email = true;
                else if(message == 'Invalid Password')
                    $scope.invalid_passwd = true;
            }
            else
                console.log('----------------->', res.data.message);
        })
    }

    $scope.registerCheck = function () {
        var curMail = $scope.email;
        var curPasswd = $scope.password;
        var curName = $scope.username;

        var account = {
            username: curName,
            email: curMail,
            password: curPasswd
        }

        accountService.register(account).then(function (res) {
            var message = res.data.error;
            console.log('error------->', message);
            if (message == undefined){
                $scope.regSuccess = true;
                $scope.invalid_account = false;
                // accountService.login({email: curMail, password: curPasswd}).then(function (res) {
                //
                //     if (res.status == 200)
                //         console.log('res______>', res)
                //         //$window.location.href = '/'
                // })
            }
            else{
                $scope.invalid_account = true;
            }
        })
    }
}]);



