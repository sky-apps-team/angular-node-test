/* global alert */

module.exports = function ($scope, $location, AuthService) {
  $scope.authToken = null
  $scope.loginForm = {}

  $scope.onLoginSubmit = function () {
    AuthService.doLogin($scope.loginForm.username, $scope.loginForm.password)
      .then(function (data) {
        // Success
        // $scope.authToken = data.authToken
        var args = $location.search()
        if (args.r) {
          $location.path(args.r)
        } else {
          $location.path('/')
        }
      },

      function (response) {
        // Fail
        if (response.status === 403) {
          alert('Authentication failed')
        }
        // Not finished
      })
  }
}
