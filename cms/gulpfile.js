/*!
 * gulp
 * $ npm install gulp-sass gulp-less gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache --save-dev
 */
// Load plugins
var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');
    del = require('del');
// Styles
gulp.task('styles', function() {
    return gulp.src(['css/*.less'])
        .pipe(less())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        //.pipe(rename({ suffix: '.min' }))
        //.pipe(minifycss())
        .pipe(gulp.dest('css/'))
        //.pipe(notify({ message: 'Styles task complete' }));
        .on('end',function () {
            del('css/base-conf.css');
        })
});
// Scripts
gulp.task('scripts', function() {
    //return gulp.src('js/*.js')
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        //.pipe(concat('all.js'))
        //.pipe(rename({ suffix: '.min' }))
        //.pipe(uglify())
        //.pipe(gulp.dest('js'))
        //.pipe(notify({ message: 'Scripts task complete' }));
});
// Images
gulp.task('images', function() {
    return gulp.src('css/i/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('css/i/'))
        //.pipe(notify({ message: 'Images task complete' }));
});
// Default task
gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'images');
});
// Watch
gulp.task('watch', function() {
    // Watch .less files
    gulp.watch('css/*.less', ['styles']);
    // Watch .js files
    gulp.watch('js/*.js', ['scripts']);
    // Watch image files
    gulp.watch('css/i/*', ['images']);
    //gulp.watch('js/', ['images']);
    // Create LiveReload server
    livereload.listen();
    // Watch any files in assets/, reload on change
    gulp.watch(['html/*','css/*']).on('change', function(file){
        livereload.changed(file.path);
    });
});
