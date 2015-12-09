var app = angular.module("testApp", []);


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

app.controller("loginController", function($scope, auth) {

    $scope.userLogged = false;
    $scope.submit = function(){
        auth.login($scope.username,$scope.password).then(function(response){
            if (response && response.data) {
                $scope.userLogged = response.data.auth;
            }
        });
    }
});