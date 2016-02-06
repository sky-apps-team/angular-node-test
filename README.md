JWT Authentication
------------------
This is a demo project to illustrate JSON Web Token authentication.

### Front End Description

An Angular front end is served by NodeJS using a simple gulp workflow. Gulp is 100% groomed for the dev environment. It has live reload on HTML and JS and live streaming for CSS. JavaScript Bower dependencies are injected using wiredep.

Angular delivers a single page application (SPA), utilising angular-ui-router. The app consists solely of two views, a login page and a "logged in" page. 

Logged in users are recognised as either admin users or standard users. A logged in admin user is able to view a list of login attempts, where those attempts originated from and whether they were successful.

### Back End Description

At the back end an NPM module, namely restify, is used to deliver four RESTful API's as follows:

* Login API (POST)

This API checks credentials and if valid will create a JSON web token for the user.

* Auth API (HEAD)

Checks if the user has valid credentials.

* Logout API (POST)

Deletes the users auth cookie.

* Login Attempts (GET)

Checks that the user is admin and if so returns a list of login attempts.

Other NPM modules used are restify-validation to ensure data integrity, mongodb and mongoose to persist login attempts.

### Coverage

The back end has 100% coverage using mocha, chai, sinon, supertest and istanbul.

The front end is covered by karma, jasmine, $httpBackend and istanbul.

End to end to end testing (E2E) is provided for using Protactor.

TODO: Finish Protactor testing 