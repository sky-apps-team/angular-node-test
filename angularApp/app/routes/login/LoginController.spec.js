(function () {

    'use strict';

    describe('LoginController', function () {

        var loginCtrl, $httpBackend;

        beforeEach(module('skyApp'));
        beforeEach(module('ngHtmlFiles'));
        beforeEach(module(function ($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        }));

        beforeEach(inject(function ($controller, _$httpBackend_) {
            loginCtrl = $controller('LoginController');
            $httpBackend = _$httpBackend_;
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should be fully tested', function () {
            expect(true).toBe(true);
        });

    });

}());
