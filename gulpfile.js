var gulp = require('gulp');
var gulpStylus = require('gulp-stylus');
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var clean = require('gulp-clean-css');
var utils = require('./libs/utils.js');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/**
 * 构建命令，对应于生成相应的css文件
 */
gulp.task('build', function() {
    var precossers = [
        autoprefixer({browsers: ['last 3 version']})
    ];

    return gulp.src('./src/index.styl')
        .pipe(gulpStylus())
        .pipe(postCss(precossers))
        .pipe(rename('junglecss.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(clean())
        .pipe(rename('junglecss.min.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('stylus', function() {
    return gulp.src('./src/index.styl')
        .pipe(gulpStylus())
        .pipe(gulp.dest('./test/lib'))
        .pipe(reload({stream: true}));
});

/**
 * http服务器，热更新监听
 */
gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: './test'
        },
        open: false
    });
    gulp.watch('./src/**/*.styl', ['stylus']);
    gulp.watch(['**/*.html', 'lib/*.css'], {cwd: 'test'}, reload);
});

gulp.task('default', ['build']);