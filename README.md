## Grunt/Express-Development-Scaffolding

A basic scaffolding for front-end development using Grunt.js.

Gruntfile.js contains tasks for minifying JS and CSS.  It also starts an express server with livereload.  Note that the grunt-contrib-watch plugin has livereload built into it.  Livereload is triggered at task level.  The app folder contains the basic file structure being watched in Gruntfile.js.

To start the watch task, type "grunt" into your terminal.  Livereload tracks any changes being made in all .scss, .css and .js files and displays the changes automatically to your browser.  Note that all sass files are being combined and minified to style.min.css, and all .js files minified to js.min.js.

Tasks:

1. Compiling sass
```js
sass: { // Task 
          dist: { // Target        
            files: { // Dictionary of files 
              'app/assets/css/style.css': 'app/assets/scss/style.scss'
              // 'destination': 'source' 
            }
          }
        },
```


2. To minimize the compiled css into 
```js
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
```


3. Minify (uglify) js
```js
uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          build: {
            src: 'app/assets/js/*.js',
            dest: 'app/assets/min/js.min.js'
          }
        },
```

4. Using the watch task to automatically compile, and minify our code
```js
watch: {
          options: {
            livereload: true
          },
          files: ['app/assets/**/*.js'],
          tasks: ['uglify'],
          css: {
            files: ['app/assets/**/*.scss', 'app/assets/css/*.css'],
            tasks: ['sass', 'cssmin'], //compile and minify
          },
        },
```

5. Launching an express server at port 3000 on localhost
```js
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
```

---

Enabling the necessary plugins in the gruntfile

```js
      grunt.loadNpmTasks('grunt-contrib-uglify');         
      grunt.loadNpmTasks('grunt-express');
      grunt.loadNpmTasks('grunt-contrib-sass');
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-contrib-watch');
```

The complete file looks like this: 

```js

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
      grunt.loadNpmTasks('grunt-contrib-uglify');     
      grunt.loadNpmTasks('grunt-express');
      grunt.loadNpmTasks('grunt-contrib-sass');
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-contrib-watch');     
      grunt.registerTask('default', ['express', 'watch']);
    };
```