module.exports = function(grunt) {

  grunt.initConfig({

    uglify: {
      dev: {
        options : {
          sourceMap: 'main.js.map',
          beautify: true,
          mangle: false
        },
        
        // what files to build. order is important so list all
        files: {
          'standard/scripts/main.js': [
            'standard/scripts/init.js',
            'standard/scripts/helpers.js',
            'standard/scripts/cr03.js',
            'standard/scripts/breadcrumb.js'
          ]
        }
      },
      
      prod: {
        files: {
          'standard/scripts/main.js': [
            'standard/scripts/init.js',
            'standard/scripts/helpers.js',
            'standard/scripts/cr03.js',
            'standard/scripts/breadcrumb.js'
          ]
        }
      }
    },

    // local and prod settings
    sass: {
    
      // local mode for debuging with sourcemaps and the like
      dev: {
        options: {
          style: "expanded",
          sourcemap: true
        },
        files : {
          "build/main.css" : "styles/main.scss"
        }
      },
      

      // production for "minified". NB: doesn't prduct a .min file, IMO not needed
      prod: {
        options: {
          style: "compressed"
        },
        files: {
          "build/main.css" : "styles/main.scss"

        }
      }
    },

    /*
    * watching for local changes
    * 
    */
    watch: {
      sass: {

        // update when these types are changed
        files: 'styles/*.scss',

        // and do what with said change?
        tasks: ['sass:dev']
      },

      js: {
        files: 'scripts/*.js',
        tasks: ['uglify:dev']
      },


      livereload: {
        files: ['*.html', 'build/*.css'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).

  grunt.registerTask('default', 'watch');

  grunt.registerTask('production', ['sass:prod', 'uglify:prod']);

  /*
  * go for launch
  */
};
