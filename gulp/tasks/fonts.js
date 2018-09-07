import gulp from 'gulp'
import paths from '../path.config'

// Move font files to build directory
gulp.task('move-fonts', function() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
})