    module.exports = function (grunt) {

      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: { // Task 
          dist: { // Target        
            files: { // Dictionary of files 
              'app/assets/css/style.css': 'app/assets/scss/style.scss'
              // 'destination': 'source' 
            }
          }
        },
        cssmin: {
          options: {
            banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
          },
          build: {
            files: {
              'app/assets/min/style.min.css': 'app/assets/css/*.css'
            }
          }
        },
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          build: {
            src: 'app/assets/js/*.js',
            dest: 'app/assets/min/js.min.js'
          }
        },
        watch: {
          options: {
            livereload: true
          },
          files: ['app/assets/**/*.js'],
          tasks: ['uglify'],
          css: {
            files: ['app/assets/**/*.scss', 'app/assets/css/*.css'],
            tasks: ['sass', 'cssmin'],
          },
        },
        express: {
          all: {
            options: {
              port: 3000,
              hostname: 'localhost',
              bases: ['./app'],
              livereload: true,
              open: 'http://localhost:3000'
            }
          }
        }
      });


      // Default tasks
      //grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      //grunt.loadNpmTasks('grunt-concurrent');
      //grunt.loadNpmTasks('grunt-contrib-less');
      //grunt.loadNpmTasks('grunt-parallel');
      grunt.loadNpmTasks('grunt-express');
      grunt.loadNpmTasks('grunt-contrib-sass');
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-contrib-watch');
      //grunt.loadNpmTasks('grunt-contrib-connect');
      //grunt.registerTask('default', [ 'uglify', 'cssmin', 'sass']);
      grunt.registerTask('default', ['express', 'watch']);
    };