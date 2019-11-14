var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var using = require("./using");
var templateData = require("./src/data");
var gulpIgnore = require('gulp-ignore');


gulp.task("watch", function () {
	gulp.watch('./src/data.js', { cwd: './' }, gulp.series('handlebars'))
	gulp.watch('./src/**/*.hbs', { cwd: './' }, gulp.series('handlebars'))
	gulp.watch('./src/**/*.css', { cwd: './' }, gulp.series('styles'))
});

gulp.task('styles', function () {
	return new Promise(function (resolve) {
		gulp.src(['./src/**/*.css'])
			.pipe(using())
			.pipe(rename({ extname: ".css" }))
			.pipe(gulp.dest('build'));
		resolve()
	});
})

gulp.task('handlebars', function () {
	return new Promise(function (resolve) {
		options = {
			ignorePartials: true,
			batch: ['./src/partials'],
			helpers: {
				caps: function (str) {
					return str.toUpperCase();
				}
			}
		}

		gulp.src(['./src/**/*.hbs'])
			.pipe(gulpIgnore.exclude("partials/**"))
			.pipe(using())
			.pipe(handlebars(templateData, options))
			.pipe(rename({ extname: ".html" }))
			.pipe(gulp.dest('build'));
		resolve()
	});
});

gulp.task('default',
	gulp.parallel(['handlebars', 'styles', 'watch']),
	function (done) { done() });
