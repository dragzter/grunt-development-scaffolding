# Grunt/Express-Development-Scaffolding

A basic scaffolding for front-end development using Grunt.js.

Gruntfile.js contains tasks for minifying JS and CSS.  It also starts an express server with livereload.  Note that the grunt-contrib-watch plugin has livereload built into it.  Livereload is triggered at task level.  The app folder contains the basic file structure being watched in Gruntfile.js.

To start the watch task, type "grunt" into your terminal.  Livereload tracks any changes being made in all .scss, .css and .js files and displays the changes automatically to your browser.  Note that all sass files are being combined and minified to style.min.css, and all .js files minified to js.min.js.
