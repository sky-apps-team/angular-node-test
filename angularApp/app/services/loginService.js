(function () {

    'use strict';

    angular
        .module('skyApp')
        .service('loginService', loginService);

    loginService.$inject = [
        '$http'
    ];

    function loginService($http) {
        this.login = function (username, password) {
            return $http.post('/api/login', {
                username: username, password: password
            });
        };

        this.logout = function () {
            return $http.post('/api/logout');
        };

        this.authenticated = function () {
            return $http.head('/api/authenticated');
        };
    }

}());
