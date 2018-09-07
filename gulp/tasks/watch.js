import gulp from 'gulp'
import watch from 'gulp-watch'
import paths from '../path.config'


gulp.task('watch', function() {
	gulp.watch(paths.sass.watch, gulp.series('styles'))
	gulp.watch(paths.images.watch, gulp.series('images'))
	gulp.watch(paths.svgs.watch, gulp.series('symbols'))
	gulp.watch(paths.js.watch, gulp.series('scripts-watch'))
	gulp.watch(paths.njks.watch, gulp.series('nunjucks-watch'))
})

gulp.task('watch-cms', function() {
	gulp.watch(paths.sass.watch, gulp.series('styles'))
	gulp.watch(paths.images.watch, gulp.series('images'))
	gulp.watch(paths.svgs.watch, gulp.series('symbols'))
	gulp.watch(paths.js.watch, gulp.series('scripts-watch'))
	gulp.watch(paths.twig.watch, gulp.series('twig-watch'))
})
