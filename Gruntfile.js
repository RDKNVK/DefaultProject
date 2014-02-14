module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		livereloadx: {
			static: true,
			dir: '.'
		},
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
					'!scripts/production.js',
					'!scripts/production.min.js',
					'!scripts/html5shiv.js',
					'!scripts/jquery*'
				],
				dest: 'scripts/production.js'

			}
		},
		uglify: {
			build: {
				src: 'scripts/production.js',
				dest: 'scripts/production.min.js'
			}
		},
		sass: {
			min: {
				options: {
					style: 'compressed'
				},
				files: {
					'styles/style.css': 'sass/style.scss',  // destination: source
					'styles/print.css': 'sass/print.scss'
				}
			},
			full: {
				options: {
				},
				files: {
					'styles/style.full.css': 'sass/style.scss',  // destination: source
					'styles/print.full.css': 'sass/print.scss'
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
			files: ['scripts/production.js'],
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
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('livereloadx');

	//grunt.loadNpmTasks('grunt-contrib-imagemin');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass', 'autoprefixer', 'livereloadx']);

};

