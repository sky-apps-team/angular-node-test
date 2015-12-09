var app = angular.module("testApp", ['ngCookies']);

app.factory('auth', function($http) {
    var factory = {};
    factory.login = function(username, password) {
        return $http({
            url: "/api/login",
            method: "GET",
            params: {u:username, p:password}
        });
    }
    return factory;
});

app.controller("loginController", function($scope, auth, $cookies) {

    var logged = $cookies.get('logged')
    if (logged && logged === true) {
        // User alread logged in
        console.log('logged', logged);
        $scope.userLogged = true;
    } else {
        $scope.userLogged = false;
    }
    $scope.submit = function(){
        auth.login($scope.username,$scope.password).then(function(response){
            if (response && response.data) {
                $scope.userLogged = response.data.auth;
                if ($scope.userLogged) {
                    $cookies.put('logged', 'true');
                }
            }
        });
    }
});