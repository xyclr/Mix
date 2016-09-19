var gulp = require( 'gulp' );
var uglify = require('gulp-uglify');
var seajsCombo = require( 'gulp-seajs-combo' );
gulp.task( 'seajscombo-map', function(){
    return gulp.src( './main.js' )
        .pipe(seajsCombo({
        }))
        //.pipe(uglify())
        .pipe(gulp.dest('./build') );
});