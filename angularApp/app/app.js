(function () {
    'use strict';
    angular.module('skyApp', [
        'ui.router'
    ]);

    angular.module('skyApp').config(
        ['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider) {

                $locationProvider.html5Mode(true);

                $stateProvider
                    .state('home', {
                        url: '/home',
                        templateUrl: 'routes/home/home.html',
                        controller: 'HomeController',
                        controllerAs: 'homeCtrl',
                        authenticate: true
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: 'routes/login/login.html',
                        controller: 'LoginController',
                        controllerAs: 'loginCtrl',
                        authenticate: false
                    });

                $urlRouterProvider
                    .otherwise('/login');
            }]);

    angular.module('skyApp').run(
        ['$rootScope', '$state', 'loginService',
            function ($rootScope, $state, loginService) {
                $rootScope.$on('$stateChangeStart', function (event, toState) {
                    if (toState.authenticate) {
                        loginService.authenticated().then(function () {
                        }).catch(function () {
                            $state.transitionTo("login");
                            event.preventDefault();
                        });
                    }
                });
            }]);
})();
