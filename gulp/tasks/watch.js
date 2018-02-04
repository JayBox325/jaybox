import gulp from 'gulp'
import path from 'path'
import watch from 'gulp-watch'


gulp.task('watch', function() {
	gulp.watch('_assets/css/**/*.scss', ['styles'])
	gulp.watch('_assets/images/base/*.*', ['images'])
	gulp.watch('_assets/images/svgs/*.svg', ['symbols'])
	gulp.watch('_assets/js/**/*.js', ['scripts-watch'])
	gulp.watch('_assets/html/**/*.njk', ['nunjucks-watch'])
})

gulp.task('watch-cms', function() {
	gulp.watch('_assets/css/**/*.scss', ['styles'])
	gulp.watch('_assets/images/base/*.*', ['images'])
	gulp.watch('_assets/images/svgs/*.svg', ['symbols'])
	gulp.watch('_assets/js/**/*.js', ['scripts-watch'])
	gulp.watch('build/*.twig', ['twig-watch'])
})
