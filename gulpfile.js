// Include gulp and plugins
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    cache = require('gulp-cache'),
    rename = require('gulp-rename'),
    inject = require("gulp-inject");
// then come the individual functions

//using ruby sass because libsass can't update on time

//css
gulp.task('styles', function() {
  return gulp.src('dev/css/styles.css')
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'));
});

//we need to inline our css
gulp.task('injectcss', function() {
  return gulp.src('index.html')
    .pipe(inject(gulp.src(['assets/css/styles.min.css']), {
            starttag: '<!-- inject:head:{{ext}} -->',
            transform: function (filePath, file) {
            // return file contents as string and wrapped in style tags
            return '<style>' + file.contents.toString('utf8') + '</style>'
        }
    }))
    .pipe(gulp.dest(''));
});

//js
gulp.task('scripts', function() {
  return gulp.src('dev/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

//image compression
gulp.task('images', function() {
  return gulp.src('dev/img/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('assets/img'));
});

//browser-sync stuff
gulp.task('browserSync', function() {
    browserSync.init(null, {
      proxy: "tim.local/moodme",
      files: ["assets/js/main.min.js", "*.html"]
    });
});

//cleanup time
gulp.task('clean', function() {
  return gulp.src(['assets/css/*', 'assets/js/*', 'assets/img/*'], {read: false})
    .pipe(clean());
});

//watch all the things
gulp.task('watch', function () {
    // Watch the css folder for changes
    gulp.watch('dev/css/*.css', ['styles']);
    // Watch the js folder for changes
    gulp.watch('dev/js/*.js', ['scripts']);
    // Watch the img folder for changes
    gulp.watch('dev/img/*', ['images']);
    gulp.watch('assets/css/styles.min.css', ['injectcss']);
});

gulp.task('default', ['browserSync','watch','scripts','images','styles','injectcss']);