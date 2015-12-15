'use strict';

var HOME_PAGE = 'http://localhost:9090/home';

describe('login', function () {
    it('should have the correct title', function () {
        browser.get(HOME_PAGE);
        expect(browser.getTitle()).toEqual('Sky App - Dan Lewis');
    });
});
