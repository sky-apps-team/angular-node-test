'use strict';

function User(username, password, admin) {
    this.username = username;
    this.password = password;
    this.admin = !!admin;
}

var users = [
    new User('user', 'password', false),
    new User('manager', 'password', true),
    new User('admin', 'password', true),
    new User('developer', 'password', false),
    new User('tester', 'password', false)
];

module.exports = users;
