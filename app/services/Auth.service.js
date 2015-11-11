
module.exports = function ($http) {
  /*
   *  Angular Service to deal with authentification.
   */

  var API_URL = 'http://localhost:9000/'

  function doLogin (user, passwd) {
    var data = {
      username: user,
      password: passwd
    }
    return $http.post(API_URL + 'login', data)
      .then(function (response) {
        return response
      })
  }

  function doLogout () {
    return $http.post(API_URL + 'logout')
      .then(function (response) {
        return response
      })
  }

  function getFeed () {
    return $http.get(API_URL + 'feed')
      .then(function (response) {
        return response
      })
  }

  return {
    doLogin: doLogin,
    doLogout: doLogout,
    getFeed: getFeed
  }
}
