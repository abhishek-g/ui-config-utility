/**
 * Created by abhishekgoray on 7/2/15.
 */

module.exports = function(grunt){


    var config = grunt.file.readJSON('tasks/bootstrap/resources/configs/config.json');

    function execute(){

        grunt.initConfig({
            writefile : {
                options:{
                    preserveExtension: false,
                    helpers: {                  // provide handlebars helper functions
                        classHelper: function (value) {
                            return  value ;
                        }
                    },
                    data:config
                },
                main:{
                    files :[
                        {
                            src: 'tasks/bootstrap/resources/source-templates/source.html.hbs',
                            dest: 'public/templates/views/source.html'
                        },
                        {

                        }
                    ]
                }
            },
            watch:{
                files:['<%= writefile.main.files %>']
            }
        });

        grunt.loadNpmTasks('grunt-writefile');
        grunt.registerTask('dev', ['writefile']);
    }



    return {
       execute : execute
    }

};