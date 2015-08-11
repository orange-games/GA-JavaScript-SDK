module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            build: {
                src: [
                    'src/**/*.ts'
                ],
                dest: 'bin/GaJavaScriptSdk-<%= pkg.version %>.min.js',
                options: {
                    module: 'amd',
                    target: 'es5',
                    basePath: 'src',
                    sourceMap: true,
                    declaration: true
                }
            }
        },
        clean: {
            build: ["bin"]
        },
        uglify: {
            options: {
                compress: {},
                mangle: true,
                beautify: false
            },
            typescript: {
                files: {
                    'bin/GaJavaScriptSdk-<%= pkg.version %>.min.js': [
                        'vendor/hmac-sha256.js',
                        'vendor/enc-base64-min.js',
                        'bin/GaJavaScriptSdk-<%= pkg.version %>.min.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['clean', 'typescript', 'uglify']);
};
