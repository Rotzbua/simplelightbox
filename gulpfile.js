import gulp from 'gulp';
import babel from 'gulp-babel';
import header from 'gulp-header';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import terser from 'gulp-terser';
import dartSass from 'sass';
import fs from 'node:fs';

const sass = gulpSass(dartSass);
const license = fs.readFileSync('src/license-notice.txt', 'utf8')

// default standalone file
export const build_default = () => {
    return gulp.src("src/simple-lightbox.js",{ read: false})
        .pipe(babel({
            presets: [['@babel/preset-env', { modules: false }]]
        }))
        .pipe(header(license))
        .pipe(gulp.dest("dist"));
};

// legacy for IE11
export const build_legacy = () => {
    return gulp.src("src/legacy.js",{ read: false })
        .pipe(babel({
            presets: [['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3,
                targets: { ie: '11' }
            }]]
        }))
        .pipe(rename('simple-lightbox.legacy.js'))
        .pipe(header(license))
        .pipe(gulp.dest("dist"));
};

// use it with modules
export const build_modules = () => {
    return gulp.src("src/simple-lightbox.js")
        .pipe(babel())
        .pipe(rename('simple-lightbox.modules.js'))
        .pipe(header(license))
        .pipe(gulp.dest("dist"));
};

// pure file as ecmascript module
export const build_esm = () => {
    return gulp.src("src/simple-lightbox.js")
        .pipe(rename('simple-lightbox.esm.js'))
        .pipe(header(license))
        .pipe(gulp.dest("dist"));
};

// use it with jquery
export const build_jquery = () => {
    return gulp.src("src/jquery-plugin-wrap.js",{ read: false })
        .pipe(babel({
            presets: [['@babel/preset-env', { modules: false }]]
        }))
        .pipe(rename('simple-lightbox.jquery.js'))
        .pipe(header(license))
        .pipe(gulp.dest("dist"));
};

export const minify = () => {
    return gulp.src("dist/simple-lightbox.js")
        .pipe(terser())
        .pipe(rename('simple-lightbox.min.js'))
        .pipe(gulp.dest('dist/'));
};

export const minify_legacy = () => {
    return gulp.src("dist/simple-lightbox.legacy.js")
        .pipe(terser())
        .pipe(rename('simple-lightbox.legacy.min.js'))
        .pipe(gulp.dest('dist/'));
};

export const minifiy_jquery= () => {
    return gulp.src("dist/simple-lightbox.jquery.js")
        .pipe(terser())
        .pipe(rename('simple-lightbox.jquery.min.js'))
        .pipe(gulp.dest('dist/'));
};

export const style_sass = () => {
    return gulp.src('./src/*.scss')
        .pipe(sass({}))
        .pipe(header(license))
        .pipe(gulp.dest('./dist'));
};

export const style_sass_minify = () => {
    return gulp.src('./src/*.scss')
        .pipe(sass({style: 'compressed'}))
        .pipe(rename('simple-lightbox.min.css'))
        .pipe(header(license))
        .pipe(gulp.dest('./dist'));
};


export const build =
    gulp.series(
        build_default,
        build_legacy,
        build_modules,
        build_esm,
        build_jquery,
        minify,
        minify_legacy,
        minifiy_jquery,
        style_sass,
        style_sass_minify,
    );

export const watch = () => {
    gulp.watch('./src/*.js', gulp.series(build_default));
    gulp.watch('./src/*.scss', gulp.series(style_sass));
};
