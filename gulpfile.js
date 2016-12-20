var      gulp = require('gulp'),
        gutil = require('gulp-util'),
    webserver = require('gulp-webserver');

gulp.task('js',   function() {
    gulp.src('src/js/*');
});

gulp.task('css',  function() {
    gulp.src('src/css/*');
});

gulp.task('html', function() {
    gulp.src('*.html');
});

gulp.task('watch', function() {
    gulp.watch( 'src/js/*',    ['js']   );
    gulp.watch( 'src/css/*',   ['css']  );
    gulp.watch( '*.html',      ['html'] );
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
                  open: true
        }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
