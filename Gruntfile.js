/**
 * Created by abhishekgoray on 7/2/15.
 */



module.exports = function (grunt) {

    var task = require('./tasks/bootstrap/server-side-templates')(grunt);
    task.execute();

//    grunt.registerTask('dev', ['writefile']);
    grunt.registerTask('default', ['dev']);
};