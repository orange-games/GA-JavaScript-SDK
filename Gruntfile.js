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
        uglify: {
            options: {
                compress: {},
                mangle: true,
                beautify: false
            },
            typescript: {
                files: {
                    'bin/GaJavaScriptSdk-<%= pkg.version %>.min.js': [
                        'vendor/md5.js',
                        'bin/GaJavaScriptSdk-<%= pkg.version %>.min.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['typescript', 'uglify']);
};
