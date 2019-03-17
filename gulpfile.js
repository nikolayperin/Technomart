const gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
csso = require('gulp-csso'),
concat = require('gulp-concat'),
imagemin = require('gulp-imagemin'),
uglifyJs = require('gulp-uglifyjs'),
rename = require('gulp-rename'),
del = require('del'),
server = require('browser-sync').create(),
ghPages = require('gulp-gh-pages');

const dirs = {
  src: 'source',
  dest: 'build'
}

const paths = {
  html: {
    src: `${dirs.src}/*.html`,
    dest: dirs.dest
  },
  css: {
    src: `${dirs.src}/css/*.css`,
    dest: `${dirs.dest}/css`
  },
  js: {
    src: `${dirs.src}/js/*.js`,
    dest: `${dirs.dest}/js`
  },
  img: {
    src: `${dirs.src}/img/*.{jpg,jpeg,png,svg}`,
    dest: `${dirs.dest}/img`
  },
  fonts: {
    src: `${dirs.src}/fonts/*.{woff,woff2}`,
    dest: `${dirs.dest}/fonts`
  }
};

function html() {
  return gulp.src(paths.html.src, {since: gulp.lastRun(html)})
    .pipe(gulp.dest(paths.html.dest));
 }

function css() {
  return gulp.src(paths.css.src, {since: gulp.lastRun(css)})
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(csso())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.css.dest));
}

function js() {
  return gulp.src(paths.js.src, {since: gulp.lastRun(js)})
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(uglifyJs())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.js.dest));
}

function img() {
  return gulp.src(paths.img.src, {since: gulp.lastRun(img)})
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(paths.img.dest));
}

function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
 }

function clean() {
  return del(dirs.dest);
}

const build = gulp.series(
  clean,
  gulp.parallel(html, css, js, img, fonts)
);

function serve(done) {
  server.init({
    watch: true,
    server: dirs.dest
  });
  done();
}

function watch() {
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.css.src, css);
  gulp.watch(paths.js.src, js);
  gulp.watch(paths.img.src, img);
};

const dev = gulp.series(build, serve, watch);

function deploy() {
  return gulp.src(`${dirs.dest}/**/*`)
    .pipe(ghPages({
      force: true,
      remoteUrl: 'https://github.com/m1k0lay/Technomart.git'
    }));
}

exports.build = build;
exports.default = dev;
exports.deploy = deploy;
