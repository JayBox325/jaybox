import gulp from 'gulp'
import requireDir from 'require-dir'

// Tasks
requireDir('./gulp/tasks', {recurse: true})

gulp.task('default', gulp.parallel(
	'styles',
	'move-scripts',
	'move-favicons',
	'move-fonts',
	'images',
	'symbols',
	'nunjucks',
	'js',
	'serve',
	'watch'
))

gulp.task('cms', gulp.parallel(
	'styles',
	'move-scripts',
	'move-fonts',
	'move-favicons',
	'images',
	'symbols',
	'nunjucks',
	'twig',
	'js',
	'serve',
	'watch-cms'
))

gulp.task('build', gulp.parallel(
	'styles',
	'symbols',
	'move-scripts',
	'move-fonts',
	'move-favicons',
	'images',
	'nunjucks',
	'js'
))

gulp.task('build-cms', gulp.parallel(
	'styles',
	'move-scripts',
	'move-favicons',
	'move-fonts',
	'images',
	'symbols',
	'twig',
	'js'
))