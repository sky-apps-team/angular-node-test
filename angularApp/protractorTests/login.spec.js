'use strict';

var LOGIN_PAGE = 'http://localhost:9090/login';

describe('login', function () {
    it('should have the correct title', function () {
        browser.get(LOGIN_PAGE);
        expect(browser.getTitle()).toEqual('Sky App - Dan Lewis');
    });
});
