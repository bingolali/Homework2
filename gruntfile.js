module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

    concat:{
       options:{
         seperator: ";",
         stripBanners: true,
         
       },
       dist: {
        files:{
          'dist/jscript/scr.js': [
            'Gruntt/**/*.js'
          ],
          'dist/css/style.css': [
            'Gruntt/**/*.css', 
            'css/*.css'
          ],
        }
    }
  },
  

    watch: {
       script:{
            files: ['Gruntt/**/*.js'], 
            tasks: ['scriptTasks'],
          },
          style:{
            files: ['Gruntt/**/*.css', 'Gruntt/**/*.less'], 
            tasks: ['styleTasks'],
          },
          html:{
            files: ['Gruntt/**/*.html'], 
            tasks: ['htmlTasks'],
          },

        },

        browserSync: {
          dev: {
              files: {
                  src : [
                      'Gruntt/**'
                  ]
              },
              options: {
                  watchTask: true,
                  server: './dist'
              }
          }
      },

      copy:{
        main:{
          expand:true,
          src:["Gruntt/*"],
          dest:"dest/",
        },
      },
      
     
     
        autoprefixer:{
        dist:{
          files:{
            'css/style.css':'less/styles.less'
          }
        }
      },
        
      cssmin:{
        my_target:{
          files:[{
            
            expand: true,
            cwd: 'css/',
            src:['*.css','!*.min.css'],
            dest:'css/',
            ext:'.min.css'


          }]
        }
      },


      processhtml: {
        options: {
          data: {
            message: 'This is development environment'
          }
        },
        dist: {
          files: {
            'dist/index.html': ['index.html']
          }
        }
      },

      clean: {
        css: ['less/*.css'],
        less:["css/style.css"],
        dist:["dist/*"]
      }, 
      
      less: {
          development: {
            options: {
              paths: ['Gruntt/css']
            },
            files: {
              'css/style.css': 'less/styles.less'
            }
          },
          production: {
            options: {
              paths: ['Gruntt/css'],
              plugins: [
                new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                
                
              ],
           
            },
            files: {
              'css/style.css': 'less/styles.less'
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch'); 
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    
  };