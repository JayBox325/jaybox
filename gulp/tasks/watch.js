import gulp from 'gulp'
import path from 'path'
import watch from 'gulp-watch'
import paths from '../path.config'


gulp.task('watch', function() {
	gulp.watch(paths.sass.watch, ['styles'])
	gulp.watch(paths.images.watch, ['images'])
	gulp.watch(paths.svgs.watch, ['symbols'])
	gulp.watch(paths.js.watch, ['scripts-watch'])
	gulp.watch(paths.njks.watch, ['nunjucks-watch'])
})

gulp.task('watch-cms', function() {
	gulp.watch(paths.sass.watch, ['styles'])
	gulp.watch(paths.images.watch, ['images'])
	gulp.watch(paths.svgs.watch, ['symbols'])
	gulp.watch(paths.js.watch, ['scripts-watch'])
	gulp.watch(paths.twig.watch, ['twig-watch'])
})
