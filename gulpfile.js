// ----- Imports and variables ------
const { src, dest, watch, series, parallel, lastRun } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();
const browserSync = require('browser-sync');
const server = browserSync.create();
const del = require('del');
const autoprefixer = require('autoprefixer');

const paths = {
  src: 'src',
  dest: 'docs',
  tmp: '.tmp'
};


// ----- Tasks ------
function styles() {
  return src(`${paths.src}/styles/*.scss`)
    .pipe($.plumber())
    // .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    })
    .on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer()
    ]))
    // .pipe($.sourcemaps.write())
    // .pipe(dest(`${paths.tmp}/styles`))
    .pipe(dest(`${paths.src}/styles`))
    .pipe(server.reload({stream: true}));
};

exports.styles = styles;


function scripts() {
  return src(`${paths.src}/scripts/direction-reveal.js`)
    .pipe($.plumber())
    .pipe($.babel({
      plugins: ['@babel/plugin-transform-modules-umd']
    }))
    .pipe($.rename('direction-reveal-umd.js'))
    .pipe(dest(`${paths.src}/scripts/`))
};

exports.scripts = scripts;


// ----- Serve tasks ------
function startAppServer() {
  server.init({
    port: 9000,
    notify: false,
    ghostMode: false,
    server: {
      // baseDir: [`${paths.tmp}`, `${paths.src}`],
      baseDir: [`${paths.src}`],
      routes: {
        '/node_modules': 'node_modules'
      },
      serveStaticOptions: {
        extensions: ['html']
      }
    }
  });

  watch([`${paths.src}/*.html`, `${paths.src}/**/*.js`]).on('change', server.reload);

  watch(`${paths.src}/**/*.scss`, styles);
}


const compile = series(clean, parallel(styles, scripts));
exports.compile = compile;

let serve = series(compile, startAppServer);
exports.serve = serve;



// ----- Build tasks ------
function moveFiles() {
  return src([`${paths.src}/**/*.{html,css,js,jpg,gif,png,webp,mp4,webm}`])
    .pipe(dest(`${paths.dest}`));
};
exports.moveFiles = moveFiles;


function clean() {
  return del([`${paths.tmp}`, `${paths.dest}`])
}
exports.clean = clean;


const build = series(compile, moveFiles);
exports.build = build;
exports.default = build;
