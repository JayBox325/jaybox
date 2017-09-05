import gulp from 'gulp'
import browserSync from 'browser-sync'
import environments from 'gulp-environments'
import util from 'gulp-util'

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
		.on('error', util.log)
		.pipe(gulp.dest(paths.images.dest))
		.pipe(browserSync.reload({ stream: true }));
})

// Move videos
gulp.task('move-videos', function() {
	return gulp.src(paths.images.videos)
        .pipe(gulp.dest(paths.images.dest))
})