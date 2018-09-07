import gulp from 'gulp'
import browserSync from 'browser-sync'

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "build",
            index: "index.html"
        }
    })
})