module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
        // doesnt need to be called build, we can call it whatever we want 
        build: {
            src: ['js/plugins.js', 'js/main.js'],
            dest: 'dist/script.min.js',
        },

        dev: {
            options: {
                beautify: true,
                mangle: false,
                compress: false,
                preserveComments: 'all'
            },
            src: ['js/plugins.js', 'js/main.js'],
            dest: 'dist/script.min.js',
        }
    },


    sass: {
      dev: {
        options: {
          outputStyle: 'expanded',
          sourceMap: true
        },
        files: {
          'dist/application.css': 'scss/application.scss'
        }
      },
      build: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'dist/application.css': 'scss/application.scss'
        }
      }
    },


    postcss: {
        options: {
          map: true, // inline sourcemaps
          processors: [
            require('pixrem')(), // add fallbacks for rem units
            require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
          ]
        },
        dist: {
            src: 'dist/*.css',
        },
    },

    watch: {
        options: {
            livereload: true,
        },
        js: {
            files: ['js/**/*.js'],
            tasks: ['uglify:dev']
        },
        css: {
            files: ['scss/**/*.scss'], // <-- when these files change
            tasks: ['sass:dev'] // <-- run this task
        },
        html: {
            files: ['*.html']
        }
    },
    
    connect: {
        server: {
          options: {
            port: 9000,
            base: '.',
            hostname: '0.0.0.0',
            protocol: 'http',
            livereload: true,
            open: true,
          }
        }
    },


  });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Register tasks(s)
    grunt.registerTask('default', ['connect','watch']);
    grunt.registerTask('build', ['uglify:build', 'sass:build']);

};