import gulp from 'gulp'
import browserSync from 'browser-sync'
import util from 'gulp-util'

// HTML/Nunjucks dependencies
import versionNumber from 'gulp-version-number'
import htmlmin from 'gulp-htmlmin'
import nunjucksRender from 'gulp-nunjucks-render'

// Config
import {development, production, cms} from '../config'
import paths from '../path.config'

// Versioning config
const versionConfig = {
    'value': '%MDS%',
    'append': {
        'key': 'v',
        'to': ['css', 'js'],
    },
}

// Process Nunjucks files and output
gulp.task('nunjucks', function() {
    return gulp.src(paths.njks.src)
        .pipe(nunjucksRender({
            path: '_assets/html',
            ext: '.html'
        }))
        .on('error', function(err) {
            var displayErr = util.colors.red(err)
            util.log(displayErr)
            util.beep()
            this.emit('end')
        })
        .pipe(versionNumber(versionConfig))
        .pipe(production(htmlmin({collapseWhitespace: true})))
        .pipe(development(gulp.dest(paths.njks.dest)))
        .pipe(production(gulp.dest(paths.njks.dest)))
        .pipe(cms(gulp.dest(paths.njks.cmsDest)))
})

gulp.task('nunjucks-watch', gulp.series('nunjucks', function (done) {
    browserSync.reload()
    done()
}))

// Process Twig files
gulp.task('twig', function() {
    return gulp.src(paths.twig.src)
        .pipe(versionNumber(versionConfig))
        .pipe(production(htmlmin({collapseWhitespace: true})))

        // Save twig file out in same location
        .pipe(cms(gulp.dest(function(file) {return file.base;})))
})

gulp.task('twig-watch', gulp.series('twig', function (done) {
    browserSync.reload()
    done()
}))