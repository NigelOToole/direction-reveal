const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

gulp.task('styles', () => {
  return gulp.src('styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('styles'))
    .pipe(reload({stream: true}));
});


// Compiles scripts for browser
gulp.task('scripts', () => {

  const browserifyBundle = browserify({
    entries: `scripts/main.js`,
    transform: babelify,
    debug: true
  });

  return browserifyBundle.bundle()
    .pipe(source('bundle.js'))
    .pipe($.plumber())
    .pipe(buffer())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(`scripts`))
    .pipe(reload({ stream: true }))

});


// Compiles scripts to UMD for NPM
gulp.task('scriptsNPM', () => {
  return gulp.src('scripts/direction-reveal.js')
    .pipe($.plumber())
    .pipe($.babel({
      plugins: ['transform-es2015-modules-umd']
    }))
    .pipe($.rename('index.js'))
    .pipe(gulp.dest('./'))
});


gulp.task('serve', ['styles', 'scripts', 'scriptsNPM'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['./']
    }
  });

  gulp.watch(['*.html']).on('change', reload);
  gulp.watch('styles/**/*.scss', ['styles']);
  gulp.watch('scripts/**/*.js', ['scripts', 'scriptsNPM']);
});

gulp.task('default', ['serve']);
