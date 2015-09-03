module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
                ' * <%= pkg.name %> - version <%= pkg.version %> \n' +
                ' * <%= pkg.description %>\n' +
                ' *\n' +
                ' * <%= pkg.author %>\n' +
                ' * Build at <%= grunt.template.today("dd-mm-yyyy") %>\n' +
                ' * Released under GNUv3 License \n' +
                ' */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: [ 'dist/*.js' ]
                }
            }
        },
        typescript: {
            build: {
                src: [
                    'src/**/*.ts'
                ],
                dest: 'dist/GaJavaScriptSdk.js',
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
            build: ["dist"]
        },
        uglify: {
            options: {
                compress: {},
                mangle: true,
                beautify: false
            },
            dist: {
                files: {
                    'bin/GaJavaScriptSdk.min.js': [
                        'vendor/hmac-sha256.js',
                        'vendor/enc-base64-min.js',
                        'dist/GaJavaScriptSdk.js'
                    ]
                }
            }
        },
        watch: {
            files: ['src/**/*.ts'],
            tasks: ['typescript']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-banner');

    grunt.registerTask('dist', ['clean', 'typescript', 'uglify', 'usebanner']);
    grunt.registerTask('dev', ['typescript']);
};
