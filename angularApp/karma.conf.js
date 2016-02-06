'use strict';

var SRC = 'app';
var LIB = 'dist';

module.exports = function (config) {
    config.set({
        basePath: './',
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['mocha', 'coverage'],
        singleRun: true,
        preprocessors: {
            '{app/!(*spec)*.js,app/!(bower)/**/!(*spec)*.js}': ['coverage'],
            'dist/**/*.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: LIB + '/',
            moduleName: 'ngHtmlFiles'
        },
        coverageReporter: {
            type: 'html',
            dir: 'coverage'
        },
        files: [
            LIB + '/bower/angular/angular.min.js',
            LIB + '/bower/angular-ui-router/release/angular-ui-router.min.js',
            SRC + '/bower/angular-mocks/angular-mocks.js',
            SRC + '/app.js',
            SRC + '/routes/**/*.js',
            SRC + '/services/**/*.js',
            LIB + '/**/*.html'
        ]
    });
};
