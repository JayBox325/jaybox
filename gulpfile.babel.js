import gulp from 'gulp'
import requireDir from 'require-dir'

// Tasks
requireDir('./gulp/tasks', {recurse: true})

gulp.task('default', [
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
]);

gulp.task('cms', [
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
]);

gulp.task('build', [
	'styles',
	'symbols',
	'move-scripts',
	'move-fonts',
	'move-favicons',
	'images',
	'nunjucks',
	'js'
]);

gulp.task('build-cms', [
	'styles',
	'move-scripts',
	'move-favicons',
	'move-fonts',
	'images',
	'symbols',
	'twig',
	'js'
]);