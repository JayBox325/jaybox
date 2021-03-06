import gulp from 'gulp'
import browserSync from 'browser-sync'

// Config
import {development, production, cms} from '../config'
import paths from '../path.config'

// SVG Symbols dependencies
import svgmin from 'gulp-svgmin'
import gulpif from 'gulp-if'
import path from 'path'
import svgSymbols from 'gulp-svg-symbols'
import rename from 'gulp-rename'

// Symbols task
gulp.task('symbols', () => {
    return gulp.src(paths.svgs.src)
        .pipe(svgmin())
        .pipe(svgSymbols({
            className: '.icon--%f',
        }))
        .pipe(gulpif( /[.]svg$/, rename(function (path) {
            path.basename = 'svg-symbols'
        })))
        
        // Save Nunjucks symbols file
        .pipe(production(gulpif( /[.]svg$/, rename(function (path) {
            path.basename = 'svg-symbols',
            path.extname = '.njk'
        }))))
        .pipe(development(gulpif( /[.]svg$/, rename(function (path) {
            path.basename = 'svg-symbols',
            path.extname = '.njk'
        }))))

        // Save twig symbols file
        .pipe(cms(gulpif( /[.]svg$/, rename(function (path) {
            path.basename = 'svg-symbols',
            path.extname = '.twig'
        }))))

        // Save symbols CSS file
        .pipe(gulpif( /[.]css$/, rename(function (path) {
            path.basename = 'svg-symbols',
            path.extname = '.scss'
        })))
        .pipe(development(gulpif( /[.]njk$/, gulp.dest(paths.svgs.dest))))
        .pipe(production(gulpif( /[.]njk$/, gulp.dest(paths.svgs.dest))))
        .pipe(cms(gulpif( /[.]twig$/, gulp.dest(paths.svgs.cmsDest))))
        .pipe(gulpif( /[.]scss$/, gulp.dest(paths.svgs.scssOutput)))
        .pipe(development(browserSync.reload({ stream: true })))
})