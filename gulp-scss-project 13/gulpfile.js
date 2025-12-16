const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();

// Конфігурація шляхів
const paths = {
    scss: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },
    js: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'dist/images/'
    },
    html: {
        src: '*.html'
    }
};

// Завдання очищення - видалення папки dist
function clean() {
    return del(['dist']);
}

// Завдання компіляції SCSS
function styles() {
    return gulp.src(paths.scss.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(browserSync.stream());
}

// Завдання конкатенації та мініфікації JavaScript
function scripts() {
    return gulp.src(paths.js.src)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream());
}

// Завдання оптимізації зображень
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest(paths.images.dest));
}

// Завдання Browser Sync
function serve() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(paths.scss.src, styles);
    gulp.watch(paths.js.src, scripts);
    gulp.watch(paths.html.src).on('change', browserSync.reload);
}

// Завдання спостереження за файлами
function watchFiles() {
    gulp.watch(paths.scss.src, styles);
    gulp.watch(paths.js.src, scripts);
    gulp.watch(paths.images.src, images);
}

// Визначення складних завдань
const build = gulp.series(clean, gulp.parallel(styles, scripts, images));
const watch = gulp.series(build, gulp.parallel(serve, watchFiles));

// Експорт завдань
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.serve = serve;
exports.watch = watch;
exports.build = build;
exports.default = build;