var gulp = require('gulp')
var sass = require('gulp-sass')
var connect = require('gulp-connect')

gulp.task('hello-world', function() {
  console.log('hello world')
})

gulp.task('sass', function() {
  return gulp.src('app/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
})

gulp.task('connect', function() {
  connect.server({
    root: 'source',
    port: 8000,
    livereload: true
  })
})

gulp.task('default', ['connect'], function() {
  gulp.watch();
});
