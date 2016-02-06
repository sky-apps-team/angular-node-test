'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var rewrite = require('connect-modrewrite');
var plugins = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var karmaServer = require('karma').Server;
var Orchestrator = require('orchestrator');
var orchestrator = new Orchestrator();
var notify = require('./notify')(browserSync);
var nib = require('nib');
var plumber = require('gulp-plumber');
var sendNotification;

var SRC = "./app";
var LIB = "./dist";
var PATHS = Object.freeze({
    "BOWER_SRC": [SRC + '/bower'],
    "IMAGES_SRC": [SRC + '/**/*.jpg', SRC + '/**/*.png', "!" + SRC + "/bower/**/*.jpg", "!" + SRC + "/bower/**/*.png"],
    "HTML_SRC": [SRC + '/**/*.html', "!" + SRC + "/index.html"],
    "JS_SRC": [SRC + "/**/*.js", "!" + SRC + "/bower/**/*.js", "!" + SRC + "/**/*.spec.js"],
    "STYLES_SRC": [SRC + '/**/*.styl']
});

// delete everything in lib
gulp.task('clean', function (done) {
    rimraf(LIB, done);
});

// bower install
gulp.task('bower', function () {
    plugins.bower(PATHS.BOWER_SRC);
});

// insert script tags into index.html based on .bowerrc
gulp.task('wiredep', function () {
    gulp.src(SRC + '/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest(LIB));
});

// copy certain bower files to lib
var BOWER_MAIN_FILES = [
    PATHS.BOWER_SRC + '/**/*.min.js',
    PATHS.BOWER_SRC + '/**/*.min.css',
    PATHS.BOWER_SRC + '/**/*.eot',
    PATHS.BOWER_SRC + '/**/*.svg',
    PATHS.BOWER_SRC + '/**/*.ttf',
    PATHS.BOWER_SRC + '/**/*.woff',
    PATHS.BOWER_SRC + '/**/*.woff2'
];
gulp.task('bower-copy', function () {
    gulp.src(BOWER_MAIN_FILES)
        .pipe(gulp.dest(LIB + '/bower'));
});

// copy images to lib
gulp.task('images', function () {
    return gulp.src(PATHS.IMAGES_SRC)
        .pipe(gulp.dest(LIB));
});

// copy html to lib
gulp.task('html', function () {
    return gulp.src(PATHS.HTML_SRC)
        .pipe(gulp.dest(LIB));
});

// uglify js and pipe to lib
gulp.task('js', function () {
    return gulp.src(PATHS.JS_SRC)
        .pipe(plugins.uglify())
        .pipe(gulp.dest(LIB));
});

// preprocess stylus files to CSS and pipe to lib
gulp.task('styles', function () {
    return gulp.src(PATHS.STYLES_SRC)
        .pipe(plumber())
        .pipe(plugins.stylus({
            use: nib()
        }))
        .pipe(gulp.dest(LIB))
        .pipe(browserSync.stream());
});

// run unit tests
function startKarma(done) {
    new karmaServer({
            configFile: __dirname + '/karma.conf.js'
        },
        function (err) {
            if (err) {
                sendNotification = function () {
                    notify.failure("unit tests");
                };
            } else {
                sendNotification = function () {
                };
            }
            done();
        }).start();
}
gulp.task('karma', startKarma);
orchestrator.add('oKarma', startKarma);

// start the server
gulp.task('serve', function () {

    browserSync.init({
        server: {
            baseDir: LIB,
            index: 'index.html',
            middleware: [
                rewrite([
                    '^/api/(.*)$ http://localhost:9999/$1 [P]',
                    '^[^\\.]*$ /index.html [L]'
                ])
            ]
        },
        port: 9090,
        ui: {
            port: 9091, // browser sync console
            weinre: {
                port: 9092 // web inspector remote - debugging
            }
        }
    });

    // watch html files for change and copy across
    gulp.watch(PATHS.HTML_SRC, ['html']).on("change", browserSync.reload);

    // watch js for change and copy across, reload the browser and send a notification to the browser if any unit tests failed
    gulp.watch(PATHS.JS_SRC, ['js']).on("change", function () {
        orchestrator.start('oKarma', function () {
            browserSync.reload();
            sendNotification();
        });
    });

    // preprocess on the fly and stream to browser for instant updates to styles
    gulp.watch(PATHS.STYLES_SRC, ['styles']);

    // when js or spec.js files change then re-run unit tests on the fly
    gulp.watch(SRC + "/**/*.spec.js", ['js']).on("change", function () {
        orchestrator.start('oKarma', function () {
            sendNotification();
        });
    });
});

gulp.task('test', function (done) {
    runSequence(
        'clean',
        'bower',
        'wiredep',
        ['bower-copy', 'images', 'html', 'js', 'styles'],
        'karma',
        done);
});

gulp.task('default', function (done) {
    runSequence(
        'test',
        'serve',
        done);
});
