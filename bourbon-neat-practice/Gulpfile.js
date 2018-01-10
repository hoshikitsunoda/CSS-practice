var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bourbon = require('node-bourbon').includePaths,
    neat = require('node-neat').includePaths,
    browserSync = require('browser-sync').create()

var paths = {
  scss: './assets/sass/*.scss'
}

gulp.task('sass', function() {
  return gulp.src(paths.scss)
    .pipe(sass({
      includePaths: [bourbon, neat]
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
})

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('./assets/sass/*.scss', ['sass'])
  gulp.watch('public/*.html', browserSync.reload)
})

gulp.task('default',function(callback){
  gulp.start(['sass', 'browserSync', 'watch'])
})
