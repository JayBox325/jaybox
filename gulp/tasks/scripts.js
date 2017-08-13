import gulp from 'gulp'
import browserSync from 'browser-sync'
import environments from 'gulp-environments'

// Scripts dependencies
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import sourcemaps from 'gulp-sourcemaps'
import buffer from 'vinyl-buffer'

// Config
import {development, production} from '../config'
import paths from '../path.config'

// JS
gulp.task('js', function () {
    return browserify(paths.js.src, {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
        .pipe(development(sourcemaps.init({loadMaps: true})))
        .pipe(development(sourcemaps.write()))
        .pipe(production(uglify()))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.reload({stream: true}));
});

// Reload the browser once the transpiler has finished
gulp.task('scripts-watch', ['js'], function (done) {
	browserSync.reload()
	done()
})


// Move other script files such as jQuery
gulp.task('move-scripts', function() {
	return gulp.src(paths.js.libs.jquery)
        .pipe(gulp.dest(paths.js.dest))
})




