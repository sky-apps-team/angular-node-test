exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*.spec.js'],
    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': require('phantomjs').path,
        proxy: {
            proxyType: 'manual',
            httpProxy: '10.9.1.80:8080',
            sslProxy: '10.9.1.80:8080',
            noProxy: 'localhost,127.0.0.1,10.20.2.139'
        }
    }
};
