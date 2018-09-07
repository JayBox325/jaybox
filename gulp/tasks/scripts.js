import gulp from 'gulp'
import browserSync from 'browser-sync'
import util from 'gulp-util'

// Scripts dependencies
import uglify from 'gulp-uglify'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import sourcemaps from 'gulp-sourcemaps'
import buffer from 'vinyl-buffer'
import gzip from 'gulp-gzip'

// Config
import {development, production} from '../config'
import paths from '../path.config'

// JS
gulp.task('js', function () {
    return browserify(paths.js.src, {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["@babel/preset-env"]})
        .bundle()
        .on('error', function (err) {
            var displayErr = util.colors.red(err)
            util.log(displayErr)
            util.beep()
            this.emit('end')
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(development(sourcemaps.init({loadMaps: true})))
        .pipe(development(sourcemaps.write()))
        .pipe(production(uglify()))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.reload({stream: true}))
})

// Reload the browser once the transpiler has finished
gulp.task('scripts-watch', gulp.series('js', function (done) {
    browserSync.reload()
    done()
}))

// Move other script files such as jQuery
gulp.task('move-scripts', function() {
    return gulp.src(paths.js.libs.jquery)
        .pipe(gulp.dest(paths.js.dest))
})