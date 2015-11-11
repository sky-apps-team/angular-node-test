'use strict'

var Angular = require('angular')

var AuthInterceptor = require('./utils/Auth.interceptor')
var LoginController = require('./controllers/Login.controller')
var IndexController = require('./controllers/Index.controller')
var AuthService = require('./services/Auth.service.js')
var LoginTemplate = require('./views/Login.template.html')
var IndexTemplate = require('./views/Index.template.html')

var app = Angular.module('SkyApp', [
  require('angular-ui-router')
])

app.config(['$httpProvider', AuthInterceptor])
app.controller('LoginController', ['$scope', '$location', 'LoginService', LoginController])
app.service('AuthService', ['$http', AuthService])

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
      .state('index', {
        url: '/',
        templateUrl: IndexTemplate,
        controller: IndexController
      })
      .state('login', {
        url: '/login',
        templateUrl: LoginTemplate,
        controller: LoginController
      })
}])
