var gulp = require( 'gulp' )
seajsCombo = require( 'gulp-seajs-combo' );
gulp.task( 'seajscombo', function(){
    return gulp.src( './js/a.js' )
        .pipe(seajsCombo())
        .pipe(gulp.dest('./build') );
});
gulp.task( 'seajscombo-map', function(){
    return gulp.src( './js/main.js' )
        .pipe(seajsCombo({
            map : {
                '/js/a' : './a'
            }
        }))
        .pipe(gulp.dest('./build') );
});

gulp.task( 'seajscombo-map-mult-name', function(){
    return gulp.src( './js/index/main.js' )
        .pipe(seajsCombo({
            map : {
                '/js/index/a' : './a',
                '/js/b' : './b'
            }
        }))
        .pipe(gulp.dest('./build/index') );
});


gulp.task( 'seajscombo-map-mult-file', function(){
    return gulp.src( ['./js/*','./js/*/*'] )
        .pipe(seajsCombo({
            map : {
                '/js/index/a' : './a',
                '/js/b' : './b'
            }
        }))
        .pipe(gulp.dest('./build/') );
});
