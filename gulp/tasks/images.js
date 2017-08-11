import gulp from 'gulp'
import browserSync from 'browser-sync'
import environments from 'gulp-environments'

// Config
import {development, production} from '../config'
import paths from '../path.config'

// Image dependencies
import imagemin from 'gulp-imagemin'
import changed from 'gulp-changed'

// minify and move images
gulp.task('images', () => {
	return gulp.src(paths.images.src)
		.pipe(changed(paths.images.src))
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images.dest))
		.pipe(browserSync.reload({ stream: true }));
})
