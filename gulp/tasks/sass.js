import gulp from 'gulp'
import browserSync from 'browser-sync'

// Config
import {development, production} from '../config'
import paths from '../path.config'

// Sass dependencies
import sass from 'gulp-sass'
import autoprefixer from 'autoprefixer'
import sourcemaps from 'gulp-sourcemaps'
import cssnano from 'gulp-cssnano'
import postcss from 'gulp-postcss'

// Compile Sass
gulp.task('styles', () => {
    return gulp.src(paths.sass.src)
        .pipe(development(sourcemaps.init()))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 8 versions']
            })
        ]))
        .pipe(production(cssnano()))
        .pipe(development(sourcemaps.write('.')))
        .pipe(gulp.dest(paths.sass.dest))
        .pipe(development(browserSync.reload({ stream: true })))
})