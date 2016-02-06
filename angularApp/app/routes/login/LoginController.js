(function () {

    'use strict';

    angular
        .module('skyApp')
        .controller('LoginController', loginCtrl);

    loginCtrl.$inject = [
        '$state', '$timeout', 'loginService'
    ];

    function loginCtrl($state, $timeout, loginService) {

        var self = this;
        self.username = '';
        self.password = '';
        self.error = false;
        self.inProgress = false;

        self.welcome = function () {
            return 'Welcome to Login';
        };

        self.onSubmit = function () {
            self.inProgress = true;
            loginService.login(self.username, self.password)
                .then(function () {
                    $state.go('home');
                }).catch(function () {
                $timeout(function () {
                    self.inProgress = false;
                }, 1000);
                self.error = true;
            });
        };
    }
})();
