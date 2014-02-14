module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			scripts: {
				files: ['.js'],
				tasks: ['concat', 'uglify', 'jshint'],
				options: {
					spawn: false,
					//livereload: true
				},
			},
			css: {
				files: ['less/*.less'],
				tasks: ['less'],
				options: {
					spawn: false,
				}
			}
		},
		concat: {
			dist: {
				src: [
					'scripts/*.js',
					'!scripts/main.js',
					'!scripts/main.full.js',
					'!scripts/html5shiv.js',
					'!scripts/jquery*'
				],
				dest: 'scripts/main.js'

			}
		},
		uglify: {
			build: {
				src: 'scripts/main.full.js',
				dest: 'scripts/main.js'
			}
		},
		less: {
			min: {
				options: {
					compress: true,
					cleancss: true
				},
				files: {
					'styles/style.css': 'less/style.less',  // destination: source
					'styles/print.css': 'less/print.less'
				}
			},
			full: {
				options: {
				},
				files: {
					'styles/style.full.css': 'less/style.less',  // destination: source
					'styles/print.full.css': 'less/print.less'
				}
			}
		},

		autoprefixer: {
			options: {
			  // Task-specific options go here.
			},
			your_target: {
			  // Target-specific file lists and/or options go here.
			},
		},

		jshint: {
			files: ['scripts/main.full.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					document: true,
					module: true
				}
			}
		}
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less', 'autoprefixer']);

};

