import gulp from 'gulp'
import requireDir from 'require-dir'

// Tasks
requireDir('./gulp/tasks', {recurse: true})

gulp.task('default', [
	'styles',
	'images',
	'symbols',
	'nunjucks',
	'js',
	'serve',
	'watch'
]);

gulp.task('cms', [
	'styles',
	'images',
	'symbols',
	'twig',
	'js',
	'serve',
	'watch'
]);

gulp.task('build', [
	'styles',
	'images',
	'symbols',
	'nunjucks',
	'js'
]);

gulp.task('build-cms', [
	'styles',
	'images',
	'symbols',
	'twig',
	'js'
]);