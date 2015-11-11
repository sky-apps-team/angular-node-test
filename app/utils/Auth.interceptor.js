/* global alert */

module.exports = function ($httpProvider) {
  $httpProvider.interceptors.push(function ($q, $location) {
    return {
      response: function (response) {
        return response
      },
      responseError: function (response) {
        if (response.status === 401) {
          alert('Permission denied')
          var current = $location.path()
          $location.path('/login').search({r: current})
          return $q.reject(response)
        }
      }
    }
  })
}
