var gulp = require('gulp')
var sass = require('gulp-sass')
var concatCss = require('gulp-concat-css')
var concat = require('gulp-concat')
var browserSync = require('browser-sync').create()
var useref = require('gulp-useref')
var uglify = require('gulp-uglify')
var gulpIf = require('gulp-if')
var cssnano = require('gulp-cssnano')
var imagemin = require('gulp-imagemin')
var cache = require('gulp-cache')
var del = require('del')
var runSequence = require('run-sequence')
var gls = require('gulp-live-server')

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('concat', function() {
    return gulp.src('app/css/**/*.css')
        .pipe(concatCss("bundle.min.css"))
        .pipe(gulp.dest('app/css/'))
})

gulp.task('script', function() {
  return gulp.src('app/js/**/*.js')
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest('app/js/'))
})

gulp.task('watch', ['browserSync', 'sass', 'concat', 'script'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass'])
  gulp.watch('app/css/**/*.css', ['concat'])
  gulp.watch('app/js/**/*.js', ['script'])
  gulp.watch('app/*.html', browserSync.reload)
  gulp.watch('app/js/**/*.js', browserSync.reload)
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
})

gulp.task('images', function(){
  return gulp.src('app/img/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
  })))
  .pipe(gulp.dest('dist/img'))
})

gulp.task('live', function() {
  var server = gls.new('./index.js');
  return server.start();
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
})

gulp.task('default', function (callback) {
  runSequence(['sass', 'concat', 'script', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'images'],
    callback
  )
})