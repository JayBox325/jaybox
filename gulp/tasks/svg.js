import gulp from 'gulp'
import browserSync from 'browser-sync'
import environments from 'gulp-environments'

// Config
import {development, production} from '../config'
import paths from '../path.config'

// SVG Symbols dependencies
// import svgSprite from 'gulp-svg-sprite'
import svgmin from 'gulp-svgmin'
import gulpif from 'gulp-if'
import path from 'path'
import svgSymbols from 'gulp-svg-symbols'
import rename from 'gulp-rename'

// Symbols task
gulp.task('symbols', function () {
	gulp.src(paths.svgs.src)
		.pipe(svgmin())
		.pipe(svgSymbols({
			className: '.icon--%f',
		}))
		.pipe(gulpif( /[.]svg$/, rename(function (path) {
			path.basename = 'svg-symbols'
		})))
		.pipe(gulpif( /[.]css$/, rename(function (path) {
			path.basename = 'svg-symbols',
			path.extname = '.scss'
		})))
		.pipe(gulpif( /[.]svg$/, gulp.dest(paths.svgs.dest)))
		.pipe(gulpif( /[.]scss$/, gulp.dest(paths.svgs.scssOutput)))
		.pipe(browserSync.reload({ stream: true }));
})