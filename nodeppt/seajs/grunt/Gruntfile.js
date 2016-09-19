module.exports = function(grunt) {

    grunt.initConfig({

        /**
         * step 1:
         * 将入口文件拷贝到 产出目录
         */
        copy: {
            hellosea:{
                files:{
                    "js/hellosea/dist/hellosea.js":["js/hellosea/src/hellosea.js"]
                }
                
            }
        },

        /**
         * step 2:
         * 创建 .build/js/common 临时目录
         * 将公用 common 目录下的 文件 转为 具名函数，并保存在 .build/js/common 目录下
         * 创建 .build/js/hellosea 临时目录 
         * 将需要合并的js文件转为具名函数，并保持独立地保存在 .build/js/hellosea 临时目录下
         */ 
        transport: {
            common:{
                options: {
                    relative: true,
                    format: '../js/common/{{filename}}' //生成的id的格式
                },
                files: [{
                    'cwd':'js/common/',
                    'src':['*.js'],
                    'dest':'.build/js/common/'
                }]
            },
            
            hellosea: {
                options: {
                    relative: true,
                    format: '../js/hellosea/{{filename}}' //生成的id的格式
                },
                files: [{
                    'cwd':'js/hellosea/',
                    'src':['dist/hellosea.js', 'src/util.js', '../../common/head.js'],
                    'dest':'.build/js/hellosea/'
                }]
            }
        },

        /**
         * step 3:
         * 将.build 目录下的具名函数 入口文件,根据id查找对应的文件，并且 合并为 1个 js 文件
         * 将这个合并的 js 文件 拷贝到 我们的输出目录
         */
        concat: {
            hellosea: {
                options: {
                    // relative: true
                },
                files: {
                    'js/hellosea/dist/hellosea.js': ['.build/js/hellosea/dist/hellosea.js']
                }
            }
        },

        /**
         * step 4:
         * 压缩 这个 合并后的 文件
         */
        uglify: {
            hellosea: {
                files: {
                    'js/hellosea/dist/hellosea.js': ['js/hellosea/dist/hellosea.js']
                }
            }
        },

        /**
         * step 5:
         * 将 .build 临时目录删除
         */
        clean: {
            build: ['.build']
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['transport', 'concat', 'uglify', 'clean']);
    grunt.registerTask('build', function(name,step){
        switch(step){
            case "1":
                grunt.task.run('copy:' + name);
                break;

            case "2":
                grunt.task.run('transport:common');
                grunt.task.run('transport:' + name);
                break;
            case "3":
                grunt.task.run('concat:' + name);
                break;
            case "4":
                grunt.task.run('uglify:' + name);
                break;
            case "5":
                grunt.task.run('clean');
                break;

            default:
                grunt.task.run(['copy:' + name,  'transport:common', 'transport:' + name, 'concat:' + name, 'uglify:' + name, 'clean'])
                break;
        }
    });
};