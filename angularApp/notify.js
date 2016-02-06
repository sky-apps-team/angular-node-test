'use strict';

/**
 * Send notifications to browser sync
 * This technology can be used to send any notifications to the browser
 * Herein, however, I am just notifying the browser when a unit test fails
 * @param browserSync
 * @constructor
 */
function Notify(browserSync) {
    var self = this;
    var RELOAD_DELAY = 2000;
    var NOTIFICATION_DISPLAY_TIME = 10000;

    this.browserSync = browserSync;

    function failureNotification(message) {
        self.browserSync.notify([
            '<span><span style="color:red">Failed</span> ',
            '<span>' + message + '</span>, ',
            'see server logs for details</span>'
        ].join('\n'), NOTIFICATION_DISPLAY_TIME);
        console.log("NOTIFICATION: Failed " + message);
    }

    this.failure = function (message) {
        setTimeout(function () {
            failureNotification(message);
        }, RELOAD_DELAY);
    };
}

module.exports = function (browserSync) {
    return new Notify(browserSync);
};
