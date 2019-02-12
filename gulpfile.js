'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rigger = require('gulp-rigger');

gulp.task('scss', function () {
    gulp.src(['scss/*.scss', 'scss/*/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'ie 8', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(minifyCSS({
            keepBreaks: false
        }))
        .pipe(gulp.dest('build/css/'));
});
gulp.task('scss:watch', function () {
    gulp.watch(['scss/*.scss', 'scss/*/*.scss'], ['scss']);
});

gulp.task('js', function () {
    gulp.src([
        'js/libs/*/*.js',
        'js/*.js',
    ])
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('build/js/'));

});
gulp.task('js:watch', function () {
    gulp.watch('js/*.js', ['js']);
});

gulp.task('html', function(){
    gulp.src('html/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('build/html'));
});
gulp.task('html:watch', function () {
    gulp.watch(['html/*.html', 'html/*/*.html'], ['html']);
});

gulp.task('clean', function() {
    return gulp.src(['build'], {read: false})
        .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    gulp.start('scss', 'js', 'html', 'scss:watch', 'js:watch', 'html:watch');
});