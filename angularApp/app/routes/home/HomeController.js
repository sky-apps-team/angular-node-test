(function () {

    'use strict';

    angular
        .module('skyApp')
        .controller('HomeController', homeCtrl);

    homeCtrl.$inject = [
        '$state',
        'loginService',
        'dataService'
    ];

    function homeCtrl($state, loginService, dataService) {

        var self = this;

        self.logout = function () {
            loginService.logout().then(function () {
                $state.go('login');
            }).catch(function () {
                $state.go('login');
            });
        };

        dataService.getAuthAttempts()
            .then(function (authAttempts) {
                self.authAttempts = authAttempts;
                self.isAdmin = true;
            }).catch(function () {
            self.isAdmin = false;
        });
    }

})();
