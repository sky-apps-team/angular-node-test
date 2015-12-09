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
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    auth.login("username","password").then(function(response){
        console.log(response);
    });
});