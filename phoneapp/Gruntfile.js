module.exports = function (grunt) {
    // 以下代码初始化Grunt任务
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 压缩css任务
        cssmin: {
            css: {
                files: [
                    {
                        src: [
                            './assets/styles/swiper.css',
                            './assets/styles/scrollbar.css',
                            './assets/styles/index.css'],

                        dest: './assets/styles/index.min.css'
                    }
                ]
            }
        },

        requirejs: {
            compile: {
                options: {
                    "baseUrl": "assets/src",
                    "paths": {
                        "jquery": "jquery/jquery",
                        "jquery.mobile": "mobile/jquery.mobile"
                    },
                    "shim": {
                        //"touchslider": ["jquery", "jquery.mobile"]
                    },
                    //"dir": "assets/dist",
                    "removeCombined": true,
                    "preserveLicenseComments": false,
                    "cssImportIgnore": null,
                    "optimizeCss": "standard",
                    "name": "index",
                    "out": "assets/dist/index.js"
                }
            }
        },

        // watch任务
        watch: {
            options: {
                livereload: true,
                interrupt: true,
                nospawn: true,
                atBegin: true
            },
            css: {
                files: [
                    './assets/styles/swiper.css',
                    './assets/styles/scrollbar.css',
                    './assets/styles/index.css'],
                tasks: ['cssmin']
            }
        }

    });

    // 加载package.json中的想用插件
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 注册一个任务，第二参数可以是数组或者字符串

    /**
     * 单个任务执行
     */

    grunt.registerTask('css', ['cssmin']); // 合并压缩css文件
    grunt.registerTask('build', ['requirejs']); // js合并压缩编译

    /**
     * 自动编译
     */

    grunt.registerTask('wcss', ['css', 'watch:css']); //　自动合并压缩css文件

    // 默认会执行default任务.
    grunt.registerTask('default', ['cssmin', 'build']);

};



