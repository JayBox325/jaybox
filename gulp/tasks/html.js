import gulp from 'gulp'
import browserSync from 'browser-sync'
import environments from 'gulp-environments'

// HTML/Nunjucks dependencies
import data from 'gulp-data'
import htmlmin from 'gulp-htmlmin'
import nunjucksRender from 'gulp-nunjucks-render'

// Config
import {development, production} from '../config'
import paths from '../path.config'

// Process Nunjucks files and output
gulp.task('nunjucks', function() {
	return gulp.src(paths.njks.src)
		.pipe(nunjucksRender({
			path: '_assets/html',
			ext: '.html'
		}))
		.pipe(production(htmlmin({collapseWhitespace: true})))
		.pipe(gulp.dest(paths.njks.dest))
})

gulp.task('nunjucks-watch', ['nunjucks'], function (done) {
    browserSync.reload();
    done();
});


// Process Twig files

gulp.task('twig', function() {
	return gulp.src(paths.twig.src)
		.pipe(browserSync.stream())
})