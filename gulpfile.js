// run 'gulp' to compile css and js
// run 'gulp serve' to spin up server on localhost 3000

var gulp = require('gulp');
var sass = require('gulp-sass');
var include = require('@absolunet/gulp-include');
var minifyCSS = require('gulp-csso');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: './'
    });
    gulp.watch('scss/*.scss', ['bundle']);
    gulp.watch('src/**/*.js', ['bundle']);
    gulp.watch('dist/bundle.js').on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('views/**/*.html').on('change', browserSync.reload);
    gulp.watch('partials/*.html').on('change', browserSync.reload);
});

gulp.task('css', function() {
    return gulp.src('scss/import.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(rename('bundle.css'))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    gulp.src('src/core.js')
        .pipe( include() )
        .pipe(rename('bundle.js'))
        .pipe( gulp.dest('dist/'));
});

gulp.task('bundle', ['scripts', 'css']);
gulp.task('default', ['bundle']);
gulp.task('serve', ['browser-sync']);