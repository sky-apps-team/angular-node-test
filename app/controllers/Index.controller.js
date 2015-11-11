module.exports = function ($scope, $location, AuthService) {
  console.log('INDEX CTRL')

  $scope.onReloadClicked = function () {
    console.log('reload clicked')
    AuthService.getFeed().then(function (data) {
      console.log(data)
    })
  }
}
