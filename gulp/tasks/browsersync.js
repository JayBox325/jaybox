import gulp from 'gulp'
import browserSync from 'browser-sync'

gulp.task('serve', function() {
	// Initialise BrowserSync
	browserSync.init({
		server: {
			baseDir: "build",
			index: "index.html"
		}
	})

})
