var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bourbon = require('bourbon').includePaths,
    neat = require('node-neat').includePaths

var paths = {
  scss: './assets/sass/*.scss'
}

gulp.task('styles', function () {
  return gulp.src(paths.scss)
    .pipe(sass({
      includePaths: [bourbon, neat]
    }))
    .pipe(gulp.dest('./public/css'))
})

gulp.task('default',function(){
  gulp.start('styles')
})
