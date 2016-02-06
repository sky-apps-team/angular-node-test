(function () {

    'use strict';

    describe('HomeController', function () {

        var $controller, $httpBackend, $state;

        beforeEach(module('skyApp'));
        beforeEach(module('ngHtmlFiles'));
        beforeEach(module(function ($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        }));

        beforeEach(inject(function (_$controller_, _$httpBackend_, _$state_) {
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
            $state = _$state_;
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should provide attempt data when the attempts API responds 200', function () {

            var mockAttempt1 = {
                "_id": "xxx",
                "IP": "127.0.0.1",
                "Datetime": "2015-12-15T06:13:47.943Z",
                "Action": "AUTH_SUCCESS",
                "Username": "admin",
                "__v": 0
            };
            var mockAttempt2 = {
                "_id": "xxx",
                "IP": "127.0.0.1",
                "Datetime": "2015-12-15T06:13:47.943Z",
                "Action": "AUTH_FAILURE",
                "Username": "fred",
                "__v": 0
            };

            var mockAttempts = [mockAttempt1, mockAttempt2];

            $httpBackend.expectGET('/api/attempts').respond(200, mockAttempts);
            var homeCtrl = $controller('HomeController');
            $httpBackend.flush();
            expect(homeCtrl.isAdmin).toBe(true);
            expect(homeCtrl.authAttempts).toEqual(mockAttempts);
        });

        it('should not provide attempt data when the attempts API responds 403', function () {

            $httpBackend.expectGET('/api/attempts').respond(403);
            var homeCtrl = $controller('HomeController');
            $httpBackend.flush();
            expect(homeCtrl.isAdmin).toBe(false);
            expect(homeCtrl.authAttempts).toBe(undefined);
        });

        describe('logout', function () {

            var homeCtrl;

            beforeEach(function () {
                $httpBackend.expectGET('/api/attempts').respond(200, []);
                homeCtrl = $controller('HomeController');
                $httpBackend.flush();
            });

            it('should take the user to the logout page when the logout function is called and responds 200', function () {
                $httpBackend.expectPOST('/api/logout').respond(200);
                spyOn($state, 'go').and.callThrough();
                homeCtrl.logout();
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith('login');
            });

            it('should take the user to the logout page when the logout function is called and responds 401', function () {
                $httpBackend.expectPOST('/api/logout').respond(401);
                spyOn($state, 'go').and.callThrough();
                homeCtrl.logout();
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith('login');
            });
        });
    });
}());
