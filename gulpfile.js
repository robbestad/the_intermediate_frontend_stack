var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var using = require("./using");
var templateData = require("./src/data");
var gulpIgnore = require('gulp-ignore');

gulp.task("watch", function () {
	gulp.watch('./assets/**/*', { cwd: './' }, gulp.series('assets'));
	gulp.watch('./src/data.js', { cwd: './' }, gulp.series('handlebars'));
	gulp.watch('./src/**/*.hbs', { cwd: './' }, gulp.series('handlebars'));
	gulp.watch('./src/styles/**/*.css', { cwd: './' }, gulp.series('styles'));
});

gulp.task('styles', function () {
	return new Promise(function (resolve) {
		gulp.src(['./src/styles/**/*.css'])
			.pipe(using())
			.pipe(gulp.dest('build/styles'));
		resolve()
	});
});


gulp.task('styles', function () {
	return new Promise(function (resolve) {
		gulp.src(['./src/styles/**/*.css'])
			.pipe(using())
			.pipe(gulp.dest('build/styles'));
		resolve()
	});
})
gulp.task('assets', function () {
	return new Promise(function (resolve) {
		gulp.src(['./assets/**/*'])
			.pipe(using())
			.pipe(gulp.dest('build/assets'));
		resolve()
	});
})



gulp.task('handlebars', function () {
	return new Promise(function (resolve) {


		gulp.src(['./src/**/*.hbs'])
			.pipe(gulpIgnore.exclude("partials/**"))
			.pipe(using())
			.pipe(handlebars(templateData, {
				batch: ['./src/partials'],
				helpers: {
					caps: function (str) {
						if(!str) return void 0;
						return str.toUpperCase();
					}
				}
			}))
			.pipe(rename({ extname: ".html" }))
			.pipe(gulp.dest('build'));
		resolve()
	});
});
gulp.task('build',
	gulp.parallel(['handlebars', 'styles', 'assets']),
	function (done) { done() });

gulp.task('default',
	gulp.parallel(['handlebars', 'styles', 'assets', 'watch']),
	function (done) { done() });
