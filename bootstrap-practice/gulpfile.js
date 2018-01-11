var gulp = require('gulp'),
    sass = require('gulp-sass')
    browserSync = require('browser-sync').create()

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('dist/*.html', browserSync.reload)
  gulp.watch('dist/css/*.css', browserSync.reload)
})

gulp.task('default',function(callback){
  gulp.start(['browserSync', 'watch'])
})
