// Karma configuration
// Generated on Mon Dec 07 2015 13:23:15 GMT+0100 (CET)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '..',


        // frameworks to use
        // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon'],


        // list of files / patterns to load in the browser
        files: [
            'dist/*.js',
            'tests/*.js'
        ],


        // list of files to exclude
        exclude: [
            'dist/*.min.js'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'dist/*.js': ['coverage']
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity,
        coverageReporter: {
            type: 'html',
            dir: 'coverage',
            subdir: '.'
        }
    })
};
