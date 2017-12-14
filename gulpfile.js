const gulp                  = require('gulp');
const watch                 = require('gulp-watch');
const postcss               = require('gulp-postcss');
const prefixer              = require('autoprefixer');
const position              = require('postcss-short-position');
const flexibility           = require('postcss-flexibility');
const mediaQuery            = require('css-mqpacker');
const rename                = require('gulp-rename');
const pixrem                = require('pixrem');
const precss                = require('precss');
const csscomb               = require('gulp-csscomb');
const cssmin                = require('gulp-cssmin');
const livereload            = require('gulp-livereload');
const styleDown             = require('gulp-styledown');
const colorFunction         = require('postcss-color-function');
const at2x                  = require('postcss-at2x');
const uglify                = require('gulp-uglify');
const concat                = require('gulp-concat');
const plumber               = require('gulp-plumber');
const postcssResponsiveFont = require('postcss-responsive-font');

const procs = [
  prefixer({ browsers: ['last 6 versions'] }),
  precss,
  position,
  pixrem,
  at2x,
  postcssResponsiveFont,
  colorFunction,
  mediaQuery
];



gulp.task('cssPublic', () => {

  gulp.src(['resources/style/style.css'])
    .pipe( plumber())
    .pipe( postcss(procs))
    .pipe( csscomb())
    .pipe( cssmin())
    .pipe( rename('styles.css'))
    .pipe( gulp.dest('dist/'))
    .pipe( livereload());

});

gulp.task('watch', () => {

  gulp.watch(['resources/style/**/*.css'], ['cssPublic']);
  livereload.listen();

});


gulp.task('default', ['cssPublic', 'watch']);
