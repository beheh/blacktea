var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('compile', ['compile:scripts']);
gulp.task('watch', ['compile:scripts:watch']);

gulp.task('compile:scripts', function () {
	return gulp.src('src/**/*.{js,jsx}')
		.pipe($.react())
		.pipe($.uglify())
		.pipe(gulp.dest('web/js'))
		;
});

gulp.task('compile:scripts:watch', function (done) {
	gulp.src('src/**/*.{js,jsx}')
		.pipe($.watch('src/**/*.{js,jsx}', {verbose: true}))
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.react())
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('web/js'))
	;
	done();
});