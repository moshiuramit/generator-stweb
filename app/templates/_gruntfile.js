'use strict';

/**
 * Sourcetop GruntFile -- almost ripped from yeoman :)  *
 */

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      jade: {
        files: ['<%= yeoman.app %>/jade/**'],
        tasks: ['jade']
      },
      compass: {
        files: ['<%= yeoman.app %>/sass/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      rigger: {
        files: ['<%= yeoman.app %>/scripts/{,*/,*/*/}*.js',
                '<%= yeoman.app %>/scripts/{,*/,*/*/}*.coffee'],
        tasks: ['rig']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/css/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/js/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 9000,
        // Default is localhost
        // Change this to your desired local host setup.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '<%= yeoman.app %>/scripts/*.js',
        '<%= yeoman.app %>/scripts/includes/{,*/}*.js',
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    compass: {
      options: {
        config: 'config.rb'
      },
      dist: {},
      server: {
        options: {
        }
      }
    },
    concat: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= yeoman.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
        options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/css/app.css': [
            '<%= yeoman.app %>/css/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/js',
          src: '*.js',
          dest: '<%= yeoman.dist %>/js'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/js/main.js': [
            '<%= yeoman.dist %>/js/main.js'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    copy: {
      verizon: {
        files: [{
            expand: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              'images/**',
              'js/{,*/}*js',
              '*.html',
              'css/{,*/}*css',
              'css/fonts/*',
              'video/*'
            ]
        }]
      }
    },
    jade: {
      compile: {
        options: {
            pretty: true
        },
        files: grunt.file.expandMapping(['jade/*.jade'], 'app/', {
          cwd: 'app',
          rename: function(destBase, destPath) {
            var seg =  destPath.split('/');
            destPath = seg[1];
            return destBase + destPath.replace(/\.jade$/, '.html');
          }
        })
      }
    },
    htmllint: {
      all: [ "app/*.html" ]
    },
    rig: {
      compile: {
        options: {
        },
        files: {
          'app/js/main.js': ['app/scripts/app.js']
        }
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      all: {
        src: 'app/css/*.css'
      }

    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'clean:server',
    'coffee:dist',
    'jade',
    'compass:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('compile', [
    'compass:server',
    'jade',
    'rig'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'coffee',
    'compass',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jade',
    'compass:dist',
    'imagemin',
    'copy',
    'cssmin'
  ]);

  grunt.registerTask('default', ['build']);
};
