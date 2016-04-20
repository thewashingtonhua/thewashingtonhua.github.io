var      gulp = require('gulp'),
        gutil = require('gulp-util'),
    webserver = require('gulp-webserver');

gulp.task('js',   function() {
    gulp.src('js/*');
});

gulp.task('css',  function() {
    gulp.src('css/*');
});

gulp.task('html', function() {
    gulp.src('*.html');
});

gulp.task('watch', function() {
    gulp.watch( 'js/*',   ['js']   );
    gulp.watch( 'css/*',  ['css']  );
    gulp.watch( '*.html', ['html'] );
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
                  open: true
        }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
