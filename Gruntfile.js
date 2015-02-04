module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        typescript: {
            gembly: {
                src: [
                    'src/**/*.ts'
                ],
                dest: 'bin/GaJavaScriptSdk.min.js',
                options: {
                    module: 'amd',
                    target: 'es5',
                    basePath: 'src',
                    sourceMap: false,
                    declaration: true
                }
            }
        },
        uglify: {
            options: {
                compress: true,
                mangle: true,
                beautify: false
            },
            gembly: {
                files: {
                    'bin/GaJavaScriptSdk.min.js': [
                        'vendor/md5.js',
                        'bin/GaJavaScriptSdk.min.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['typescript', 'uglify']);
};
