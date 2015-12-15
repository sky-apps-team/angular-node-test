var secrets = require('./passwd.json')

var authenticate = function(username, password) {

    if (secrets[username.toLowerCase()] && secrets[username.toLowerCase()] === password){
        return true
    } else {
        return false
    }
}

module.exports = authenticate